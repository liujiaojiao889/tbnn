;(function (Sail) {
    var utils = Sail.Utils;

    Sail.viewer = new Sail.Viewer();
    Sail.io = new Sail.IO();

    Sail.run = function (Config) {
        if(Sail.__isInit){return;}
        Laya.init(Config.WIDTH, Config.HEIGHT, Laya.WebGL);

        Laya.stage.screenMode = Config.SCREEN_MODE;
        Laya.stage.scaleMode = Config.SCALE_MODE;
        Laya.URL.basePath = Config.BASE_PATH;

        // if(utils.getUrlParam("debug_status") != "1"){
        //     window.console && (console.log = console.trace = console.error = function () {});
        // }

        Sail.director = new Sail.Director(Config.DIALOGTYPE);
        Sail.ASSETS_VERSION = Config.VERSION;
        Laya.stage.addChild(Sail.director);

        Sail.onStart && Sail.onStart();
        Sail.__isInit = true;
    }
})(Sail);