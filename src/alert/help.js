{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true
    };

    class help extends ui.alert.helpUI {
        constructor (data) {
            super();

            this.data = data;
            this.CONFIG = ALERT_CONFIG;
           
            this.init();
        }

        init (value) {
            Sail.io.register(GAME_CMDS.USER_RATE,this,this.uperRate)
            Sail.io.emit(GAME_CMDS.USER_RATE);
            let slider = new zsySlider(this.helpWarp);
            
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.close();
            });
            this.gogame.on(EVENT_CLICK, this, function(){
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.close();
               
            });
            
            
          
        }
        uperRate(data){

            this.bomb.text = data.bomb + "倍";
            this.wu_hua.text = data.wu_hua + "倍";
            this.si_hua.text = data.si_hua + "倍";
            this.niu_niu.text = data.niu_niu + "倍";
            this.niu_ba.text = data.niu_ba + "倍";
            this.niu_yi.text = data.niu_yi + "倍";
            this.niu_lin.text = data.niu_lin + "倍";
        }
        onClosed(){ 
         
           Sail.io.unregister(GAME_CMDS.USER_RATE,this,this.uperRate)
        }
    }

    Sail.class(help, "Alert.help");
}