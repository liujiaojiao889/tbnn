;(function () {
    var utils = (Sail && Sail.Utils) || $;

    var SKIN = {
        "confirm" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAWlBMVEUAAADMQkLLQkLLQkL9Y2PLQkLLQkL9Y2PMQkL9Y2PLQkLLQkLdTk75YGD7YmL9Y2P2Xl77YmL9Y2P9Y2P9Y2PLQkL9Y2PLQkL3Xl7cTU3tWFj5YGDoVVXmVFTAQB7jAAAAFnRSTlMA4qyPiltUU9sGBvr59e3cyl/fplYHf9H6ogAAAJVJREFUKM/lzFkOhCAQRdEHCs5TD1WAuv9ttm00xii1Ae/vSS7Wis/7Ree6DHtZRzelm6Z0XyrpUvY/U7S2QNFSvAEDCfXoJW7QkBTooTzK7CR1CBIH1BLXyIX7qKB9nL2G4TmmMxuUiqd7nVh9Acvs3RWdZ7ZYSpjZB3eysCAnwOaXDgVsfsXcAnul0ao6qFLalCv8AOM4RjeBMUEAAAAAAElFTkSuQmCC",
        "delete" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAb1BMVEUAAADLy8ttbGzMzMzMzMxtbGzMzMxtbGzMzMxtbGzMzMxubW3MzMxtbGxtbGyQj4/MzMxtbGxtbGzMzMzMzMzMzMzMzMzMzMzMzMxwb29tbGzMzMxtbGzBwcGtra2NjIy/vr6goKCPjo6kpKSko6Pen5mzAAAAG3RSTlMA/N2piVtVVAYGA+ParPr54ZSKW1Hz5OPf2quDrJY6AAAAqklEQVQoz9XPSQ6DMBBE0TKEeR4yum0Dyf3PGCARLLA76/ztk0oqrMWhfxNy65z7YYytPpeH8v6L6UlaO6Urz+rwRUPpLATiq5svMTrJ1MHn2EfNcQ3BsYBk+2P+8XvgWEFzrFFxXOGumO0MD+NmUyCg0aUjBUgyetn1SVkCRETG8m4wRBHmWiKatBI7CaUnImqxlDZkrUnxKfKO6EXYSoLCK3cqvSJIVngDsvlU0+yaOfMAAAAASUVORK5CYII=",
        "number" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAeFBMVEUAAADGxsa3t7f///////////////////+3t7e3t7fo6Oi3t7fT09P///////+3t7e6urr///+3t7f///+3t7e3t7f///////////////+3t7e3t7f///+3t7fQ0ND29vb19fX7+/v39/fo6Ojh4eHe3t65ubm4uLiqIy5xAAAAHHRSTlMABeKJVQb64VtV/Prp5NvbrqysppSKW1Hz11xTZZ6wfwAAAKVJREFUKM/d00cSgzAQRNEWOefgIIkM97+hMbhwuUBzAP/tq1nMorFlGrlt8aPbPTdMHNURPxXVH2Q6v0xnG6+q8LcaXJkBmKGaQxMVJ6qQUpzCptiGRbEFTva/3FHaoaW4gUexh4DiAEmv1j6BI9UsH2DapNJJY4C7jNc6Li7WSiHbM7ZSlPsMCjHLofn5d5CzKBj2nrE4Fbs4Yk6m+V/ytczZT1+rJlhgr8lBXAAAAABJRU5ErkJggg=="
    };
    var SKIN_PATH = "public/keyboard_" + (Math.random() * 9999999 | 0) + "/";
    var KEYS = [
        {text : "1", skin : "number", x : 20, y : 15},
        {text : "2", skin : "number", x : 280, y : 15},
        {text : "3", skin : "number", x : 545, y : 15},
        {text : "4", skin : "number", x : 20, y : 125},
        {text : "5", skin : "number", x : 280, y : 125},
        {text : "6", skin : "number", x : 545, y : 125},
        {text : "7", skin : "number", x : 20, y : 235},
        {text : "8", skin : "number", x : 280, y : 235},
        {text : "9", skin : "number", x : 545, y : 235},
        {text : "0", skin : "number", x : 810, y : 15},
        {text : "00", skin : "number", x : 810, y : 125},
        {text : ".", skin : "number", x : 810, y : 235},
        {text : "确定", skin : "confirm", x : 1070, y : 15},
        {text : "删除", skin : "delete", x : 1070, y : 235}
    ];
    var EVENT_CLICK = Laya.Event.CLICK;

    var KeyBoardMask = (function (_super) {
        function KeyBoardMask() {
            KeyBoardMask.super(this);

            this.configAlpha = null;
            this.configColor = null;
            this.closeOnSide = false;

            this.on(EVENT_CLICK, this, function () {
                if(this.closeOnSide){
                    this.event("exit", ["mask", null]);
                }
            });
        }
        Laya.class(KeyBoardMask, "", _super);
        var _proto = KeyBoardMask.prototype;

        _proto.update = function (width, height, alpha, color, closeOnSide) {
            this.alpha = this.configAlpha = alpha;
            this.configColor = color;
            this.closeOnSide = closeOnSide;

            this.resize(width, height);
        }
        _proto.resize = function (width, height) {
            this.size(width, height);
            this.graphics.clear();
            this.graphics.drawRect(0, 0, this.width, this.height, this.configColor);
            this.alpha = this.configAlpha;
        }

        return KeyBoardMask;
    })(Laya.Sprite);

    var InputText = (function (_super) {
        function InputText() {
            InputText.super(this);

            this.Mask = null;
            this.textValue = null;
            this.originHeight = null;

            this.init();
        }
        Laya.class(InputText, "KeyBoard.InputText", _super);
        var _proto = InputText.prototype;
        _proto.destroy = function () {
            _super.prototype.destroy.call(this, true);
            this.Mask = null;
            this.textValue = null;
            this.originHeight = null;
        }
        _proto.init = function (width) {
            this.originHeight = 60;

            var mask = new KeyBoardMask();
                mask.update(this.width, this.height, 0.5, "#000000", false);

            var text = new Laya.Label();
                text.height = 30;
                text.fontSize = 30;
                text.align = "center";

            this.Mask = mask;
            this.textValue = text;
            this.addChildren(mask, text);
        }
        _proto.update = function (value, color) {
            this.textValue.color = color;
            this.textValue.text = value;
        }
        _proto.resize = function (width, height) {
            var yrate = height / 1334;

            this.size(width, this.originHeight * yrate);
            this.Mask.resize(this.width, this.height);
            this.textValue.width = width;
            this.textValue.bottom = 0;
            this.top = -this.height;
        }

        return InputText;
    })(Laya.Box);

    var KeyBoardButton = (function (_super) {
        function KeyBoardButton(config, callback) {
            KeyBoardButton.super(this);

            this.config = null;
            this.callback = null;
            this.label = null;

            this.init(config, callback);
        }

        Laya.class(KeyBoardButton, "", _super);
        var _proto = KeyBoardButton.prototype;
        _proto.destroy = function () {
            _super.prototype.destroy.call(this, true);

            this.config = null;
            this.callback = null;
            this.label = null;
        }

        _proto.init = function (config, callback) {
            config.width = 240;
            config.height = config.skin === "confirm" ? 210 : 100;
            this.config = config;

            this.skin = SKIN_PATH + config.skin + ".png";
            this.sizeGrid = "15,15,15,15";

            this.resize(Laya.stage.width, Laya.stage.height);
            this.create(config);

            this.on(EVENT_CLICK, this, callback, [config.text]);
        }
        _proto.create = function (config) {
            var label = new Laya.Label(config.text);
                label.color = config.skin === "confirm" ? "#ffffff" : "#1c1c1c";
                label.font = "arial";
                label.align = "center";
                label.fontSize = 40;
                label.size(this.width, label.fontSize);
                label.centerY = 0;

            this.label = label;
            this.addChild(label);
        }
        _proto.resize = function (width, height) {
            var xrate = width / 1334;
            var yrate = height / 1334;

            this.size(this.config.width * xrate, this.config.height * yrate);
            this.pos(this.config.x * xrate, this.config.y * yrate);
            this.label && (this.label.width = this.width);
        }

        return KeyBoardButton;
    })(Laya.Image);

    var KeyBoardPanel = (function (_super) {
        function KeyBoardPanel() {
            KeyBoardPanel.super(this);

            this.keys = [];
            this.textValue = "";
            this.inputText = null;
            this.panelMask = null;

            this.init();
        }
        Laya.class(KeyBoardPanel, "", _super);
        var _proto = KeyBoardPanel.prototype;
        _proto.destroy = function () {
            _super.prototype.destroy.call(this, true);
        }

        _proto.init = function () {
            var height = Laya.stage.height;
                height = height < 750 ? 750 : height;

            this.size(Laya.stage.width, height / 1334 * 350);
            this.bottom = -this.height;

            var panelMask = new KeyBoardMask();
                panelMask.update(this.width, this.height, 0.5, "#000000", false);

            var inputText = new InputText();
                inputText.resize(this.width, height);

            this.inputText = inputText;
            this.panelMask = panelMask;
            this.addChildren(panelMask, inputText);

            for(var i in KEYS){
                this.keys.push(new KeyBoardButton(KEYS[i], this.onClick.bind(this)));
            }
            _super.prototype.addChildren.apply(this, this.keys);
        }
        _proto.onClick = function (text) {
            this.event("input", [text]);
        }

        _proto.update = function (value, color) {
            this.inputText.update(value, color);
        }
        _proto.enter = function (value) {
            this.inputText.update(value, "#ffffff");

            Laya.Tween.to(this, {bottom : 0}, 300, Laya.Ease.linearIn);
        }
        _proto.exit = function (type) {
            Laya.Tween.to(this, {bottom : -this.height}, 200, Laya.Ease.linearIn, Laya.Handler.create(this, function (type) {
                this.event("exit", [type]);
            }, [type]));
        }
        _proto.resize = function (width, height) {
            height = height < 750 ? 750 : height;

            var xrate = width / 1334;
            var yrate = height / 1334;

            this.size(width, 350 * yrate);
            this.panelMask.resize(this.width, this.height);

            this.inputText.resize(width, height);
            for(var i in this.keys){
                this.keys[i].resize(width, height);
            }
        }

        return KeyBoardPanel;
    })(Laya.Box);

    (function (_super) {
        var DEFAULT_CONFIG = {
            "closeOnSide" : true, //点击遮罩关闭键盘
            "shadowAlpha" : 0.3, //遮罩的透明度
            "shadowColor" : "#000000", //遮罩的颜色值
            "nullMsg" : "输入的值不能为空", //输入的值为空时的提示
            "length" : 11, //输入字段的最大长度（只针对整数位）
            "float" : false, //是否允许有小数点
            "fixed" : 4, //保留的小数位，仅在 float:true 时起作用
            "zero" : false,//能否输入0
            "input" : function (value) { //输入时的回调函数，参数为当前输入的值
                console.log("当前输入值：" + value);
            },
            "close" : function (type, value) { //键盘关闭时的回调函数，参数为 type:(confirm|mask)从哪儿关闭， value:当前输入的值
                if(type === "confirm"){
                    console.log("点击了确定按钮，关闭输入键盘，当前值：" + value);
                }else{
                    console.log("点击了遮罩，关闭输入键盘。");
                }
            }
        };

        function KeyBoardNumber() {
            KeyBoardNumber.super(this);

            this.keyBoardMask = null;
            this.keyBoardPanel = null;
            this.config = null;
            this.textValue = "";
            this.firstInput = false;

            this.loadAssets();
        }

        Laya.class(KeyBoardNumber, "Tools.KeyBoardNumber", _super);
        var _proto = KeyBoardNumber.prototype;
        _proto.destroy = function () {
            Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
            _super.prototype.destroy.call(this, true);

            this.keyBoardMask = null;
            this.keyBoardPanel = null;
            this.config = null;
            this.textValue = null;
        }

        _proto.loadAssets = function () {
            var self = this;
            var loadedNum = 0;
            var totalNum = Object.keys(SKIN).length;

            for(var i in SKIN){
                (function (url, data) {
                    var img = new Laya.HTMLImage.create(data, {
                        onload : function () {
                            Laya.Loader.cacheRes(SKIN_PATH + url + ".png", new Laya.Texture(img));
                            loadedNum++;
                            if(loadedNum === totalNum){
                                self.init();
                            }
                        }
                    });
                })(i, SKIN[i]);
            }
        }
        _proto.init = function () {
            this.size(Laya.stage.width, Laya.stage.height);
            this.zOrder = 1000;

            var keyBoardPanel = new KeyBoardPanel(this.removeSelf.bind(this));
                keyBoardPanel.on("input", this, this.onInput);
                keyBoardPanel.on("exit", this, this.onExit);
            var keyBoardMask = new KeyBoardMask();
                keyBoardMask.on("exit", this, function (type) {
                    keyBoardPanel.exit(type);
                });
            
            this.keyBoardMask = keyBoardMask;
            this.keyBoardPanel = keyBoardPanel;
            this.addChildren(keyBoardMask, keyBoardPanel);

            Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        }
        _proto.onExit = function (type) {
            this.removeSelf();
            this.config.close && this.config.close(type, type === "confirm" ? this.textValue + "" : null);
            this.textValue = "";
            this.firstInput = false;
        }
        _proto.onInput = function (text) {
            switch(text){
                case "删除":
                    var text = this.textValue.split("");
                        text.pop();
                    this.textValue = text.join("");

                    if(this.textValue){
                        this.keyBoardPanel.update(this.textValue, "#ffffff");
                    }else{
                        this.keyBoardPanel.update(this.config.nullMsg, "#ff0000");
                    }
                    this.config.input && this.config.input(this.textValue);
                    break;
                case "确定":
                    this.keyBoardPanel.exit("confirm");
                    break;
                default:
                    if(this.firstInput){
                        this.textValue = "";
                        this.firstInput=false;
                    }
                    if(text === "."){
                        if(this.config.float !== true){return;}
                        if(this.textValue == ""){text = "0.";}
                        if((this.textValue.indexOf(".") != -1)){return;}
                    }
                    if(this.config.float === true){
                        var decimal = this.textValue.split(".")[1];
                        if(decimal && decimal.length >= this.config.fixed){return;}
                    }
                    if((this.textValue + text).length > this.config.length){return;}

                    this.textValue = this.textValue + text;
                    if(!this.config.zero || parseInt(this.textValue)>0){
                        this.textValue = this.textValue.replace(/^0+/, "");
                    }else if(parseInt(this.textValue)==0){
                        this.textValue = "0";
                    }

                    this.config.input && this.config.input(this.textValue);
                    if(this.textValue || (this.config.zero && this.textValue==0)){
                        this.keyBoardPanel.update(this.textValue, "#ffffff");
                    }else{
                        this.keyBoardPanel.update(this.config.nullMsg, "#ff0000");
                    }
            }
        }

        _proto.enter = function (value, config) {
            this.firstInput = true;
            this.config = utils.extend({}, DEFAULT_CONFIG, config);
            this.textValue = value + "";

            Laya.timer.callLater(this, function () {
                this.keyBoardMask.update(this.width, this.height, this.config.shadowAlpha, this.config.shadowColor, this.config.closeOnSide);
                this.keyBoardPanel.enter(this.textValue, this.config);
            });
            Laya.stage.addChild(this);
        }
        _proto.onResize = function () {
            var width = Laya.stage.width;
            var height = Laya.stage.height;
            this.size(width, height);

            this.keyBoardMask.resize(width, height);
            this.keyBoardPanel.resize(width, height);
        }
    })(Laya.Box);
})();