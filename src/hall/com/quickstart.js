{
    let EVENT_CLICK = Laya.Event.CLICK;
    
    class quickStart extends ui.hall.quickStartUI {
        constructor () {
            super();
          
            this.init();
        }

        init () {
             this.size(560,121)
             this.bottom = 0;
             this.right = -10;
             this.start.on(EVENT_CLICK,this,function(){
                 if(!Sail.checkLogin()){return;} ;
                 Laya.SoundManager.playSound("sound/btn.mp3");                
                 Sail.io.emit(GAME_CMDS.INROOM);
             });
            this.hand.on(Laya.Event.CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");  
                if(!Sail.checkLogin()){return;} ;             
                Sail.director.popScene(new Alert.dragin);           
            });

        }
  
        enter () {
           
        }
    }
    Sail.class(quickStart, "Com.hall.quickStart");
}