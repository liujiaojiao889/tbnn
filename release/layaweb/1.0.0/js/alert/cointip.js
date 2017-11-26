 /**
  * 暂无游戏币
  */
   
{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
        "closeOnSide" : true,
        "shadowAlpha" : 0.7, 
        "autoClose" :  3000,
        "closeOther"  : true
    };
    class coinTip extends ui.alert.cointipUI{
        constructor(){
            super();
            this.CONFIG = ALERT_CONFIG;
            this.init();
        }
        init(){
            this.otherCoin.on(EVENT_CLICK,this,function(){
                Laya.SoundManager.playSound("sound/btn.mp3");
                if (GM.whereYxb) {
                    GM.whereYxb();
                    this.close();
                }
               
            })
        }

    } 
    Sail.class(coinTip, "Alert.coinTip");
}

 