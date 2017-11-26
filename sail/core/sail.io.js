;(function () {
	var utils = Sail.Utils;

	var IOPrimus = (function () {
		var IO_DATA = {
			_commKey : null,		//res加密公钥所用到的key
			token : null,			//玩家token，在连接初始化时用于res生成公钥
			jwtToken : null,		//res加密之后的玩家token，数据交互以此token为主
			publicKey : null,		//res公钥
			URL : null,	//连接url
			encryptedString : null,	//res加密后的验证字符串
		};
		var cmd = {
			CONN_INIT : "conn::init",			//连接初始化，用来更新jwt token
			CONN_ERROR : "conn::error",			//服务端异常

			TEST_PING : "test::ping",			//测试用命令
			TEST_PONG : "test::pong",			//测试用命令

			APIACTIVITY : "api::activity"		//不中险
		};

		function IOPrimus(config, callback) {
			this.primus = null;
			this.callback = callback;
			this.isOpened = false;//连接是否已经初始化过

			this.init(config);
		}
		var _proto = IOPrimus.prototype;

		_proto.init = function(config){
			utils.extend(true, IO_DATA, config);

			this.generateCommKey();
			this.generateEncryptedString();

			try{
				this.connect();
			}catch(e){
				console.error(e);
			}
		}
		//生成commkey
		_proto.generateCommKey = function(){
			try{
				//默认32位编码
				IO_DATA._commKey = Date.now().toString() + Date.now().toString() + Date.now().toString().substring(0,6);
			}catch(e){
				console.log("初始化commKey失败",e);
			}
		}
		//生成encryptedString
		_proto.generateEncryptedString = function(){
			try{
				var params = "jwt=" + IO_DATA.token + "&commKey=" + IO_DATA._commKey;
				var jsencrypt = new JSEncrypt();
				jsencrypt.setPublicKey(IO_DATA.publicKey);
				IO_DATA.encryptedString = jsencrypt.encrypt(params);
			}catch(e){
				console.log("初始化encryptedString失败", e);
			}
		}
		_proto.onOpen = function(){
			//防止reconnect之后重复触发open，以下事件只绑定一次
			if(this.isOpened){ return; }
			this.isOpened = true;
			//触发open
			this.callback("io.open");

			this.primus.on('data', this.onData.bind(this));
			this.primus.on('error', function (data) { this.callback("io.error", data); }.bind(this));
			this.primus.on('reconnect', function () { this.callback("io.reconnect"); }.bind(this));
			this.primus.on('end', function () { this.callback("io.close"); }.bind(this));
		}
		_proto.onData = function(data){
			//解密
			var decryptstr = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(IO_DATA._commKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});

			var dataString = decryptstr.toString(CryptoJS.enc.Utf8);
			var parsedData = JSON.parse(dataString);
			console.log(parsedData);

			//更新jwt token
			if(parsedData.cmd == cmd.CONN_INIT){
				IO_DATA.jwtToken = parsedData.res;
			}

			this.callback(parsedData.cmd, parsedData.data || parsedData.rep, parsedData.code, parsedData.error || parsedData.msg);
		}
		_proto.connect = function () {
			this.primus = Primus.connect(IO_DATA.URL);

			this.primus.on('outgoing::url', function(url){
				url.query = 'login=' + IO_DATA.encryptedString;
				console.log("outgoing::url", url.query);
			});

			this.primus.on('open', this.onOpen.bind(this));
		}

		_proto.emit = function(cmd, params){
			//为data增加token
			var DATA_TEMPLATE = {
				"cmd" : cmd,
				"params" : {
					"jwt" : IO_DATA.jwtToken,
				},
				"status" : {
					"time" : Date.now()
				}
			};
			
			utils.extend(true, DATA_TEMPLATE, {params : params});

			var data = JSON.stringify(DATA_TEMPLATE);

			console.log("<---发送命令：" + cmd + ", 时间:" + Date.now() + ", 命令类型：Primus\n数据：" + data);

			//加密
			var encryptData = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(IO_DATA._commKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			//发送加密数据
			this.primus.write(encryptData.toString());
		}
		//手动断开连接
		_proto.end = function(){
			this.primus && this.primus.end();
		}

		return IOPrimus;
	})();

	var IOSocket = (function () {
		var token = null;
		var DEFAULT_CONFIG = {
			"force new connection" : true
		};

		var cmd = {
			APIACTIVITY : "api::activity"		//不中险
		};

		function IOSocket(config, callback) {
			this.socket = null;
			this.callback = callback;
			this.isOpened = false;//连接是否已经初始化过

			this.init(config);
		}
		var _proto = IOSocket.prototype;

		_proto.init = function (config) {
			token = config.token;
			utils.extend(true, DEFAULT_CONFIG, config);
			
			try{
				this.connect();
			}catch(e){
				console.error(e);
			}
		}
		_proto.connect = function () {
			this.socket = io.connect(DEFAULT_CONFIG.URL, DEFAULT_CONFIG);

			this.socket.on("router", this.onData.bind(this));
			this.socket.on("connect", function(){ this.callback("io.open"); }.bind(this));
			this.socket.on('connect_error', function (data) { this.callback("io.error", data); }.bind(this));
			this.socket.on('reconnecting', function() { this.callback("io.reconnect"); }.bind(this));
			this.socket.on('disconnect', function() { this.callback("io.close"); }.bind(this));
		}
		_proto.onData = function (data) {
		
			var parsedData = JSON.parse(Base64.decode(data));
			 console.log('接收命令----' , parsedData);
			this.callback(parsedData.cmd, parsedData.data || parsedData.rep, parsedData.code, parsedData.error || parsedData.msg);
		}

		_proto.emit = function (cmd, params) {
			var DATA_TEMPLATE = {
				"cmd" : cmd,
				"params" : {
					"token" : token,
				},
				"status" : {
					"time" : Date.now()
				}
			};
			
			utils.extend(true, DATA_TEMPLATE, {params : params});

			var data = JSON.stringify(DATA_TEMPLATE);

			console.log("<---发送命令：" + cmd + ", 时间:" + Date.now() + ", 命令类型：Socket\n数据：" + data);
			this.socket.emit("router", Base64.encode(data));
		}
		_proto.end = function () {
			this.socket.close();
			this.socket.removeAllListeners();
		}

		return IOSocket;
	})();


	(function () {
		var ACTIONS = {
			"conn::init" : function () {console.log("成功初始化连接");},
			"io.error" : function (data) {console.log("连接出错");},
			"io.reconnect" : function () {console.log("重连中");},
			"io.close" : function () {console.log("连接已关闭");},
			"io.open" : function () {console.log("连接成功");}
		};
		var DEFAULT_CONFIG = {
			"type" : "ajax",
			"timeout" : 300000
		}

		function IO() {
			IO.super(this);

			this.type = null;
			this.socket = null;
			this.errorPlugin = null;
			this.isOpened = false;//连接是否已经初始化过

			this.register(ACTIONS, this);
		}
		Laya.class(IO, "Sail.IO", Sail.Viewer);
		var _proto = IO.prototype;

		_proto.dispatch = function (cmd, data, code, errormsg, type) {
			if(this.errorPlugin){
				var isError = this.errorPlugin.checkError(cmd, data, code, errormsg, type);

				//error
				if(isError){
					return;
				}
			}

			this.publish(cmd, data, cmd);
		}

		_proto.ajax = function (cmd, type, url, data) {
			data = data ? data : {};
			if(type){
				type = type.toUpperCase();
				type = type === "POST" || type === "GET" ? type : "GET";
			}else{
				type = "GET";
			}

			console.log("<---发送命令：" + cmd + ", 时间:" + Date.now() + ", 命令类型：Ajax-" + type + "\n数据：" + JSON.stringify(data));

			$.ajax({
				type     : type,
				url      : url || cmd,
				dataType : 'json',
				data     : data,
				timeout  : DEFAULT_CONFIG.timeout,
				success  : function (cmd, data) {
					console.log("命令：" + cmd + "\n接收到Ajax数据--->\n" + JSON.stringify(data));
				
					this.dispatch(cmd, data, null, null, "ajax");
				}.bind(this, cmd),
				error	 : function(e){
					console.log("命令：" + cmd + "\nAjax异常--->\n" + JSON.stringify(e));
					this.dispatch("xhr.error",{}, null, e,"ajax");
				}.bind(this)
			});
		}
		_proto.ajaxPost = function (cmd, url, data) {
			this.ajax(cmd, "POST", url, data);
		}
		_proto.ajaxGet = function (cmd, url, data) {
			this.ajax(cmd, "GET", url, data);
		}
		_proto.emit = function (cmd, params, ioType, ajaxType) {
			if(ioType === "ajax"){
				this.ajax(cmd, ajaxType, cmd, params);
			}else{
				if(!this.socket){
					console.error("没有可用的Socket连接");
					return;
				}
				this.socket.emit(cmd, params);
			}
		}
		_proto.end = function () {
			this.socket.end();
		}
		_proto.init = function (config, errorPlugin) {
			DEFAULT_CONFIG = utils.extend({}, DEFAULT_CONFIG, config);
			var type = DEFAULT_CONFIG.type;
			this.type = (type === "primus" || type === "socket" || type === "ajax") ? type : null;

			switch(this.type){
				case "socket":
					this.socket = new IOSocket(DEFAULT_CONFIG, this.dispatch.bind(this));
					break;
				case "primus":
					this.socket = new IOPrimus(DEFAULT_CONFIG, this.dispatch.bind(this));
					break;
				case "ajax":
					break;
				default:
					console.error("需要指定IO的类型为socket|primus");
			}

			if(typeof errorPlugin != "undefined"){
				this.errorPlugin = new errorPlugin;
			}
		}
	})();
})();