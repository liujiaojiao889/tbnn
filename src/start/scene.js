{
    let utils = Sail.Utils;

    
    class StartScene extends Sail.Scene {
        constructor () {
            super();
            this.proPreLoad = null;
            this.size(Laya.stage.width, Laya.stage.height);
        }
        init () {
            this.size(Laya.stage.width, Laya.stage.height);
            let BGImg = new Laya.Image("res/loading/loadingbg.jpg");         
            BGImg.anchorX = 0.5;
            BGImg.anchorY = 0.5;
            BGImg.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            let hebg = new Laya.Image("res/loading/fangcenmi.png");   
            hebg.centerX = 0;
            hebg.bottom = 30;
            let loadsk = utils.createSkeleton("res/dragon/loadsk");
            loadsk.play('loading',true);
            loadsk.pos(Laya.stage.width / 2, Laya.stage.height / 2 - 30);             
            this.addChildren(BGImg,hebg,loadsk);
            this.showStaticProgress();
            Sail.io.register(GAME_CMDS.IS_IN_ROOM, this, (data)=>{
                if(data.inRoom == 1){
                    this.proPreLoad.load(ASSETS.HALL, function () {
                        Sail.io.socket.end();
                        IO_CONFIG.URL = 'https://' + data.host + ':' + data.port + '/';
                        Sail.io.socket.init(IO_CONFIG);
                        Sail.director.runScene(new Scene.Game);
                    });
                }else if(data.inRoom == 0){
                    tbnn.data.userHallInfo =  data;
                    this.proPreLoad.load(ASSETS.HALL, function () {
                        Sail.director.runScene(new Scene.Hall);
                    });
                }
            });
            if(GM.userLogged){
                Sail.io.emit(GAME_CMDS.IS_IN_ROOM);
            }else{
                this.proPreLoad.load(ASSETS.HALL, function () {
                    Sail.director.runScene(new Scene.Hall);
                });
            }
        }
        showStaticProgress () {
            let proPreLoad = new Com.Start.Load();
            tbnn.dom.proPreLoad = proPreLoad;
            this.proPreLoad = proPreLoad;
            this.addChild(proPreLoad);
        }
      

        onEnter () {
            Laya.loader.load(ASSETS.PRELOAD, Laya.Handler.create(this, this.init));
        }
        onExit () {
            tbnn.dom.proPreLoad = null;
            Laya.SoundManager.playMusic('sound/bgm.mp3',0);
        }
        onResize (width, height) {
            this.height = height;
        }
    }

    Sail.class(StartScene, "Scene.Start");
}