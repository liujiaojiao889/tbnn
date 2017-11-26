;(function (_super) {
    var utils = Sail.Utils;
    var EVENT_REMOVED = Laya.Event.REMOVED;

    var DEFAULT_CONFIG = {
        "isModal"     : true,       //是否是模式窗口
        "closeOther"  : false,      //在弹窗模式为multiple时，是否在弹窗弹窗的时候关闭其他显示中的弹窗
        "closeOnSide" : false,      //模式窗口点击遮罩，是否关闭窗口，默认是关闭的
        "popupCenter" : true,       //指定对话框是否居中弹。 如果值为true，则居中弹出，否则，则根据对象坐标显示，默认为true。
        "shadowAlpha" : 0.5,        //弹出框背景透明度
        "shadowColor" : "#000000",  //弹出框背景颜色
        "autoClose"   : false       //指定时间内自动关闭，单位为ms，默认不打开此功能
    };
    var defaultPopupEffect = function(dialog){
        dialog.scale(1, 1);
        Laya.Tween.from(dialog, {x : Laya.stage.width / 2, y : Laya.stage.height / 2, scaleX : 0, scaleY : 0}, 300, Laya.Ease.backOut, Laya.Handler.create(this, this.doOpen, [dialog]));
    };
    var defaultCloseEffect = function(dialog){
        Laya.Tween.to(dialog, {x : Laya.stage.width / 2, y : Laya.stage.height / 2, scaleX : 0, scaleY : 0}, 300, Laya.Ease.backIn, Laya.Handler.create(this, this.doClose, [dialog]));
    };
    var defaultCloseHandler = function () {
        if(this.closeEffect){
            this.closeEffect.runWith(this);
        }else{
            if(dialog.onClosed){
                dialog.onClosed();
            }
            !dialog.destroyed && dialog.destroy(true);
        }
    }

    function DialogManager(type) {
        DialogManager.super(this);
        this.maskLayer = null;
        this.dialogType = (type == "single" || type == "multiple") ? type : "single";
        this.maskLayerName = "__$DialogManagerMaskLayer:" + Math.random();
        this.popupEffect = new Laya.Handler(this, defaultPopupEffect);
        this.closeEffect = new Laya.Handler(this, defaultCloseEffect);

        this.init();
    }
    Laya.class(DialogManager, "Sail.DialogManager", _super);
    var _proto = DialogManager.prototype;
    _proto.destroy = function () {
        _super.prototype.destroy.call(this, true);
        this.maskLayer = null;
    }

    _proto.init = function () {
        this.size(Laya.stage.width, Laya.stage.height);

        var maskLayer = new Laya.Sprite();
            maskLayer.size(this.width, this.height);
            maskLayer.name = this.maskLayerName;
            maskLayer.on(Laya.Event.CLICK, this, this.closeFromMask);

        this.maskLayer = maskLayer;
    }
    _proto.centerDialog=function(dialog){
        dialog.x = ((Laya.stage.width - dialog.width) / 2) + dialog.pivotX;
        dialog.y = ((Laya.stage.height - dialog.height) / 2) + dialog.pivotY;
    }
    _proto._checkMask = function () {
        this.maskLayer.removeSelf();
        for (var i = this.numChildren - 1; i >- 1; i--){
            var dialog = this.getChildAt(i);
            
            if (dialog && dialog.CONFIG.isModal){
                this.maskLayer.graphics.clear();
                this.maskLayer.graphics.drawRect(0, 0, this.width, this.height, dialog.CONFIG.shadowColor);
                this.maskLayer.alpha = dialog.CONFIG.shadowAlpha;
                this.addChildAt(this.maskLayer, i);
                return;
            }
        }
        this.visible = false;
    }
    _proto.closeFromMask = function () {
        var dialog = this.getChildAt(this.numChildren - 1);
        
        if(dialog.name !== this.maskLayerName && dialog.CONFIG.isModal && dialog.CONFIG.closeOnSide){
            this.close(dialog);
        }
    }
    _proto.setup = function (dialog, config) {
        if(config.isModal){
            this.maskLayer.graphics.clear();
            this.maskLayer.graphics.drawRect(0, 0, this.width, this.height, config.shadowColor || "#000000");

            this.maskLayer.alpha = config.shadowAlpha || 0.5;
        }
        if(config.popupCenter != false){
            this.centerDialog(dialog);
        }
        if(config.closeOther){
            this.closeAll();
        }
        if(config.onOpened){
            dialog.onOpened = config.onOpened;
        }
        if(config.onClosed){
            dialog.onClosed = config.onClosed;
        }

        dialog.onOpened.bind(dialog);
        dialog.onClosed.bind(dialog);
    }

    _proto.getDialogsByGroup = function (group) {
        if(!group){return null;}

        var arr = [];
        for (var i = this.numChildren - 1; i > -1; i--){
            var item = this.getChildAt(i);
            if (item.group === group){
                arr.push(item);
            }
        }
        return arr;
    }
    _proto.open = function (dialog, config) {
        Laya.timer.callLater(this, function () {
            this.visible = true;
        });
        dialog.CONFIG = utils.extend({}, DEFAULT_CONFIG, dialog.CONFIG, config);

        (this.dialogType == "single") && this.closeAll();

        this.setup(dialog, dialog.CONFIG);
        
        (!dialog.popupEffect && dialog.popupEffect !== null) && (dialog.popupEffect = this.popupEffect);
        (!dialog.closeEffect && dialog.closeEffect !== null) && (dialog.closeEffect = this.closeEffect);
        
        this.addChild(dialog);
        this._checkMask();
        
        if(dialog.popupEffect){
            dialog.popupEffect.runWith(dialog);
        }else{
            this.doOpen(dialog);
        }
    }
    _proto.doOpen = function (dialog) {
        dialog.onOpened && dialog.onOpened();
        if(dialog.CONFIG.autoClose){
            Laya.timer.once(dialog.CONFIG.autoClose, dialog, dialog.close);
        }
    }
    _proto.doClose = function (dialog) {
        if(dialog.onClosed){
            dialog.onClosed();
        }

        !dialog.destroyed && dialog.destroy(true);
        dialog.CONFIG.isModal && this.callLater(this._checkMask);
    }
    _proto.close = function (dialog) {
        if(dialog.closeEffect){
            dialog.closeEffect.runWith(dialog);
            return;
        }
        this.doClose(dialog);
    }
    _proto.closeByGroup = function (group) {
        if(!group){return;}
        for (var i = this.numChildren - 1; i > -1; i--){
            var item = this.getChildAt(i);
            if(item.group == group){
                // item.offAll(EVENT_REMOVED);
                this.close(item);
            }
        }
        this._checkMask();
    }
    _proto.closeByName = function (name) {
        if(!name){return;}
        for (var i = this.numChildren - 1; i > -1; i--){
            var item = this.getChildAt(i);
            if(item.name == name){
                this.close(item);
                return;
            }
        }
    }
    _proto.closeAll = function () {
        for (var i = this.numChildren - 1; i > -1; i--){
            var item = this.getChildAt(i);
            if(!item) {return;}

            if(item.name === this.maskLayerName) {
                item.removeSelf();
                continue;
            }

            this.close(item);
        }
    }
    _proto.onResize = function (width, height) {
        this.size(width, height);
        this.maskLayer.size(width, height);

        for (var i = this.numChildren - 1; i > -1; i--){
            var item = this.getChildAt(i);
            if(item.name !== this.maskLayerName){
                if(item.CONFIG.popupCenter){
                    this.centerDialog(item);
                }else{
                    item.onResize && item.onResize(width, height);
                }
            }
        }

        this._checkMask();
    }
})(Laya.Box);