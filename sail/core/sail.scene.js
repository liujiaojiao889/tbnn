;(function (_super) {
    function Scene() {
        Scene.super(this);
    }
    Laya.class(Scene, "Sail.Scene", _super);
    var _proto = Scene.prototype;

    _proto.onEnter = function () {}
    _proto.onExit = function () {}
    _proto.onResize = function (width, height) {}
})(Laya.Box);

;(function (_super) {
    function SceneManager() {
        SceneManager.super(this);

        this.curScene = null;

        this.init();
    }
    Laya.class(SceneManager, "Sail.SceneManager", _super);
    var _proto = SceneManager.prototype;
    _proto.destroy = function () {
        _super.prototype.destroy.call(this, true);
        this.curScene = null;
    }

    _proto.init = function () {
        this.size(Laya.stage.width, Laya.stage.height);
    }

    _proto.run = function (scene) {
        this.addChild(scene);

        if(this.curScene){
            if(this.curScene.onExit){
                this.curScene.onExit();
            }else{
                this.curScene.destroy(true);
            }
        }
        this.callLater(function () {
            scene.onEnter && scene.onEnter();
            this.curScene = scene;
        });
    }
    _proto.onResize = function (width, height) {
        this.size(width, height);

        if(this.curScene){
            if(this.curScene.onResize){
                this.curScene.onResize(width, height);
            }else{
                this.curScene.size(width, height);
            }
        }
    }
})(Laya.Box);