;(function (_super) {
    var EVENT_RESIZE = Laya.Event.RESIZE;

    function Director(dialogtype) {
        Director.super(this);

        this.dialog = null;
        this.scene = null;

        this.init(dialogtype);
    }
    Laya.class(Director, "Sail.Director", _super);
    var _proto = Director.prototype;
    _proto.destroy = function () {
        _super.prototype.destroy.call(this, true);

        this.dialog = null;
        this.scene = null;
    }

    _proto.init = function (dialogtype) {
        this.size(Laya.stage.width, Laya.stage.height);

        this.dialog = new Sail.DialogManager(dialogtype);
        this.scene = new Sail.SceneManager();

        Laya.Dialog.manager = this.dialog;

        this.addChildren(this.scene, this.dialog);

        Laya.stage.on(EVENT_RESIZE, this, function () {
            this.onResize(Laya.stage.width, Laya.stage.height);
        });
        Laya.stage.event(EVENT_RESIZE);
    }

    _proto.runScene = function (scene) {
        this.scene.run(scene);
    }
    _proto.popScene = function (dialog, config) {
        this.dialog.open(dialog, config);
    }
    _proto.getRunningScene = function () {
        return this.scene.curScene;
    }
    _proto.closeAll = function () {
        this.dialog.closeAll();
    }
    _proto.closeByName = function (name) {
        this.dialog.closeByName(name);
    }
    _proto.closeByGroup = function (group) {
        this.dialog.closeByGroup(group);
    }
    _proto.getDialogsByGroup = function (group) {
        return this.dialog.getDialogsByGroup(group);
    }
    _proto.onResize = function (width, height) {
        this.size(width, height);

        this.dialog.onResize(width, height);
        this.scene.onResize(width, height);
    }
})(Laya.Box);