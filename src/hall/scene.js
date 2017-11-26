{
    let EVENT_STOP = Laya.Event.STOPPED;
    let utils = Sail.Utils;
    

    class HallScene extends Sail.Scene {
        constructor () {
            super();
        
            this.size(Laya.stage.width, Laya.stage.height);
            this.BGImg = null;
            this.Beaut = null;
            this.head = null;
            this.rank = null;
            this.roomBox = null;
            this.quick = null;      
            this.init();
            
        }
        init () {
       
            Sail.io.register(GAME_CMDS.NEWUSER, this,this.newuser);
            Sail.io.register(GAME_CMDS.INROOM, this, this.inRoom);         
            if(GM.userLogged){
                USER_LOGIN_STATUS = true;    
                // Sail.io.emit(GAME_CMDS.NEWUSER);           
            }else{
                USER_LOGIN_STATUS = false;
                
            }        
            
            this.size(Laya.stage.width, Laya.stage.height);
            //背景图
            let BGImg = new Laya.Image("res/hall/hallbg.jpg");         
            BGImg.anchorX = 0.5;
            BGImg.anchorY = 0.5;
            BGImg.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            // 美女
            this.BGImg = BGImg;
            let Beaut = utils.createSkeleton("res/dragon/man");
            Beaut.play('man',true);         
            Beaut.pos(Laya.stage.width / 2-40, Laya.stage.height / 2);
            this.Beaut = Beaut;
            let head = new Com.hall.Header();
            let rank = new Com.hall.rank();
            let roomTable = new Com.hall.roomTable();
            let quick = new Com.hall.quickStart();
         
            let roomBox = new Laya.Box();
            roomBox.size(520,600);
            rank.y =Laya.stage.height / 4-500;
            rank.centerx = 30;         
            roomBox.pos(Laya.stage.width /2+100,Laya.stage.height / 5);
        
            let delay = 300;
            quick.y = 800;
            quick.hand.alpha = quick.start.alpha = 0;

            // roomTable.uiLists.forEach((item, index)=>{
            //     item.alpha = 0;
            //     Laya.Tween.to(item, {y : 20 + 120 * index, alpha : 1}, 500, Laya.Ease.backOut, null, delay * index);
            // });
             Laya.timer.once(delay*roomTable.uiLists.length, this, function () {    
                 Laya.Tween.to(quick.hand, { alpha : 1 , scaleX : 1.3 , scaleY : 1.3}, 100, null, Laya.Handler.create(this, ()=>{
                     Laya.Tween.to(quick.hand, {scaleX : 1 , scaleY : 1},100);
                 }));
                 Laya.Tween.to(quick.start, { alpha : 1 , scaleX : 1.3 , scaleY : 1.3}, 100, null, Laya.Handler.create(this, ()=>{
                     Laya.Tween.to(quick.start, {scaleX : 1 , scaleY : 1},100);
                 }),200);
            });
       
          
            roomBox.addChildren(quick,roomTable);
           
            this.head = head;  
            this.rank = rank;
            this.quick = quick;
            this.roomBox = roomBox;  
            this.addChildren(BGImg,Beaut,head,rank,roomBox);    
                        
        }
        newuser(data){
            if(data.isNewUser==1){
               Sail.director.popScene(new Alert.help); 
            }else{
                return;
            }
           


        }

        inRoom(data){
         
            Sail.io.socket.end();
            IO_CONFIG.URL = 'https://' + data.host + ':' + data.port + '/';
            // IO_CONFIG.URL = 'https://nodejs-test.games.1768.com:8351/'
            Sail.io.socket.init(IO_CONFIG);
            tbnn.data.autoSit = true;
            // Sail.io.socket.connect();
            Sail.director.runScene(new Scene.Game());
        }
       
        onEnter () { 
            this.head.enter();           
            this.rank.enter();      
            
        }
        onExit () {
            Sail.io.unregister(GAME_CMDS.NEWUSER,this.newuser);
            Sail.io.unregister(GAME_CMDS.INROOM, this.inRoom);
        }
        onResize (width, height) {
            this.size(width, height);
            this.BGImg.y = height / 2;
            this.roomBox.y = height / 2-220;
            this.rank.y = height/2-200;
       
            
        }
    }

    Sail.class(HallScene, "Scene.Hall");
}