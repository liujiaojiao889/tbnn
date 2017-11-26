//分奖
{
    let EVENT_CLICK = Laya.Event.CLICK;
    let INDEX_POS = ['操盘手','顺门','天门','地门','玄门'];
    let TYPE_TEXT = {
        CARD_TYPE_ZHA_DANG : '炸弹',
        CARD_TYPE_WU_HUA : '五花牛',
        CARD_TYPE_SI_HUA : '四花牛'
    }
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  2000,
        "closeOther"  : true
    };
   
    class prize extends ui.alert.prizeUI {
        constructor (data) {
            super();
            this.data = data;
            this.CONFIG = ALERT_CONFIG;
            this.pooltext = null;
            this.amount = null;
            this.init(data);
        }

        init (data) {
            this.prizeData(data);
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");  
                this.close();
            });
            
            this.prizesk.on(Laya.Event.STOPPED,this.prizesk, function () {
                   Laya.SoundManager.playSound("sound/btn.mp3");  
                   this.prizesk.play('prize',false);
            });
        }

        prizeData(data){
            let awardpool = data || [];   
            this.textBox.height = 60 * awardpool.length;
            awardpool.forEach((item, index)=>{
                let span = new Laya.HTMLDivElement();
                span.size(570, 50);
                span.style.align = "center";
                span.style.fontSize = 26;
                let pos = INDEX_POS[item.areaId];
                span.innerHTML = '<span style="color:#f7e98a;"> '+ pos +' </span><span style="color:#ffffff">开出</span><span style="color:#f7e98a;">'+ TYPE_TEXT[item.cardType] +'</span><span style="color:#ffffff;">奖励</span><span style="color:#f7e98a;">'+item.amount+'</span><span style="color:#ffffff;">,恭喜'+ pos +'玩家!</span>';
                span.y = 60 * index;
                this.textBox.addChild(span);
            });
        }     
    }
    Sail.class(prize, "Alert.prize");
}