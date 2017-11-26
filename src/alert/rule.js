 /**
  * 奖励里的规则
  */
   
{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
        "closeOnSide" : true,
        "shadowAlpha" : 0.7
    };
    class rules extends ui.alert.rulesUI{
        constructor(){
            super();
            this.CONFIG = ALERT_CONFIG;
            this.init();
        }
        init(){
            this.closeBtn.on(EVENT_CLICK, this, function () {
                this.close();
                Laya.SoundManager.playSound("sound/btn.mp3");   
            });
        }

    } 
    Sail.class(rules, "Alert.rules");
}

 