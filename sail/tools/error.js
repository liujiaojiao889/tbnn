;(function () {
    var io = Sail.io;
    // var tipCode = ['103','104','105','108','112','116','200','201','203','204','205','206','207','208','210','211','212','213','214',
    // '300','301','302','303','305','306','307','308','309','310','311','312','313','315','316','317','318','319','320','321','322','323','324',
    // '325','326','327','328','329','330','331','332','333','334','335','336','339','341',
    // ]
    var ignore = [1000];
    function ErrorManager() {
        this.init();
    }
    Laya.class(ErrorManager, "Sail.Error");
    var _proto = ErrorManager.prototype;
    _proto.init = function(){
        //输分提醒
        Sail.io.register(GAME_CMDS.LOSEREMIND,this,function(data){
            tbnn.data.firstbet = true;
            tbnn.dom.table.betInternal = false;
            if(window.GM && GM.loseRemind && GM.loseRemind.pop){
                GM.loseRemind.pop(data.level, data.endTime);
            }
        });
        // 输分禁用
        Sail.io.register(GAME_CMDS.CAUTION,this,function(data){
            if(data.code == "1000"){
                tbnn.data.firstbet = true;
                tbnn.dom.table.betInternal = false;
                GM.jumpToHomePage && GM.jumpToHomePage("blacklist_disable");
            }else if(data.code == "1001"){
                GM.accredit && GM.accredit();
            }
        });

        //不中险
        // Sail.io.register(GAME_CMDS.BUZHONGXIAN,this,function(data){
        //     if( data != null && data != undefined){
        //         if(window.GM && GM.socket_RJ && GM.socket_RJ.pop){
        //             // data.buzhongxian.prizePoint   data值
        //             GM.socket_RJ.pop('buzhongxian', data.rep.buzhongxian.prizePoint);
        //         }
        //         //需要更新余额
        //         Sail.io.emit(GAME_CMDS.USE_INFO);
        //     }
        // });
        Sail.io.register(GAME_CMDS.AUTOCHARGEIN,this,function(data){
            var message = "已为您带入:" + data.changeAmount;
            Sail.director.popScene(new Alert.Tip(message));
             if(data.promptMsg){
                 setTimeout(function() {
                    Sail.director.popScene(new Alert.propMsg(data.promptMsg.content));
                 }, 2000);
            }
        })
    }

    _proto.checkError = function(cmd, data, code, errormsg, type){
        if(type == "ajax"){
            //ajax网络异常，包含超时和所有异常
            if(cmd == "xhr.error"){
                this.dispathError("xhrError",cmd);
                return true;
            }

            //系统维护
            if(data.maintain_code == 1){
                this.dispathError("maintain",cmd);
                return true;
            }

            //防沉迷
            if(window.GM && GM.addict && GM.addict(data)){
                this.dispathError("addict",cmd);
                return true;
            }

            //根据不同的错误码处理不同的异常
            var statusCode = data.statusCode;
            if(statusCode && statusCode != "000"){
                //error
                this.dispathError(statusCode,cmd,errormsg,data);
                return true;
            }
        }
        //socket错误
        else{
            if(code && code != "000"){
                this.dispathError(code,cmd,errormsg,data);
                return true;
            }
        }

        return false;
    }
    _proto.dispathError = function(code,cmd,msg,data) {
        if(ignore.indexOf(code) != -1){
            return;
        }
        switch(code.toString()){
            //通比牛牛
            case "316"://成功进入操盘队列
                tbnn.dom.top.inBankerList();
                break;
            case "111"://长时间未操作
            case "110"://房间维护
                Sail.director.popScene(new Alert.Message(msg,function(){
                    Sail.director.runScene(new Scene.Start());
                }));

            //系统维护
            case "maintain" :
                // location.reload();
                Sail.Utils.set_param('t', new Date().getTime());
                break;
            //未登录或token丢失
            case "100" : 
            case "003" :
            case "121" : 
            case "101" : 
                // location.href = GM.userLoginUrl;
               console.log("用户未登录")
                break;
            //otp
            case "81" :
                location.href = "/?act=otp&st=otpPage";
                break;
            //防沉迷
            case "addict" : 
                //todo 清理游戏结果
                break;
            //黑名单输分禁用
            case "99999" :
                //todo 清理游戏结果
                GM.jumpToHomePage && GM.jumpToHomePage("blacklist_disable"); 
                break;            
            //异地登录
            case "1002" : 
                Sail.io.socket.end();
                Sail.director.popScene(new Alert.Message('异地登录，请刷新',function(){
                    // location.reload();
                    Sail.Utils.set_param('t', new Date().getTime());
                }));
                //todo 提示异地登录，并且关闭当前连接
                break;
            //余额不足
            case "109" : 
                //todo 提示余额不足，之后是否要弹出充值框请自行决定
                Sail.director.popScene(new Alert.Message('您的余额不足，请充值后继续。',null,function(){
                    this.ensure.skin = 'res/alert/rechargebtn.png';
                    this.ensure.on(Laya.Event.CLICK, this, function(){
                        Sail.director.popScene(new Alert.recharge());
                    });
                }));
                break;
            //积分达到单笔上限提示
            case "113" : 
                //todo 提示土豪，您投币金额达到万里通单笔限额，请往万里通设置！
                Sail.director.popScene(new Alert.Message('土豪，您投币金额达到万里通单笔限额，请往万里通设置！'));
                break;
            //积分达到当日上限提示
            case "114" :
                //todo 提示积分或欢乐值超过当日最大使用额度，若要继续游戏，请充值欢乐豆！
                Sail.director.popScene(new Alert.Message('您积分或欢乐值超过当日最大使用额度，若要继续游戏，请充值欢乐豆'));
                break;
         
            case "115" : 
                //todo 提示用户 很抱歉！经系统检测，您的账号存在异常，无法进行该游戏。如有疑问，请联系客服：4001081768。
                Sail.director.popScene(new Alert.Message('很抱歉！经系统检测，您的账号存在异常，无法进行该游戏。如有疑问，请联系客服：4001081768'));
                break;
            case "116" :
                 Sail.director.popScene(new Alert.Message('很抱歉！经系统检测，您的账号存在异常，无法进行该游戏。如有疑问，请联系客服：4001081768'));
                break
            //ajax网络异常，包含超时和所有异常
            case "xhrError" : 
                //todo 一般弹窗提示 网络异常，请检查您的网络！
                Sail.director.popScene(new Alert.Message( '网络异常，请检查您的网络!'));           
                break;
            case "200" :
                if(cmd == GAME_CMDS.BUZHONGXIAN){
                    if( data != null && data != undefined){
                    if(window.GM && GM.socket_RJ && GM.socket_RJ.pop){
                        // data.buzhongxian.prizePoint   data值
                        GM.socket_RJ.pop('buzhongxian', data.buzhongxian.prizePoint);
                    }
                    //需要更新余额
                    Sail.io.emit(GAME_CMDS.USE_INFO);
                    }
                }else{
                     Sail.director.popScene(new Alert.Tip(msg));
                }
                break;
            case "205" :
                tbnn.data.firstbet = true;
                tbnn.dom.table.betInternal = false;
                Sail.director.popScene(new Alert.Tip(msg));
                break;
            //输分禁用
            // case "1000" :
            //     if(cmd == GAME_CMDS.CAUTION){
            //          GM.jumpToHomePage && GM.jumpToHomePage("blacklist_disable");
            //     }
            //     break;
            // case "1001" :
            //     if(cmd == GAME_CMDS.CAUTION){
            //         GM.accredit && GM.accredit();
            //     }
            //     break;
            default : 
                Sail.director.popScene(new Alert.Tip(msg));
                //todo 提示默认的错误信息
                break;
        }
    }
})();