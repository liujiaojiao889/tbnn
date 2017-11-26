{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true
    };
    let COIN_TYPE = {
        1:'欢乐值',
        2:'万里通积分',
        3:'欢乐豆',
        4:'彩金',
        5:'钻石',
        10:'健康金余额',
        9:'彩分'

    }
    class gain extends ui.alert.gainUI {
        constructor (data) {
            super();

            this.data = data;
            this.CONFIG = ALERT_CONFIG;
         
            this.init(data);
        }

        init (data) {
        
            this.gameCoin.text = data.amount;
            this.gainDate(data);
                     
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.close();
            });

            this.sureBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3"); 
                Sail.io.emit(GAME_CMDS.CHANGROUT);  
                this.close();
            });
            this.gother.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");  
                this.close();               
                if (GM.whereYxb) {
                    GM.whereYxb();              
                }
            });
        }
        gainDate(data){
            let gaindata = data.details;
            this.textBox.height = 30 * gaindata.length;
            gaindata.forEach((item,index)=>{                         
                if(item.amountAvailable > 0){
                    let span = new Laya.Label();
                    span.size(425, 30);
                    span.align = "left";
                    span.font = "Microsoft YaHei";
                    span.fontSize = 26;
                    span.color = "#faecc5";
                    let cointype = COIN_TYPE[item.accountType];
                    let coinMoney = item.amountAvailable;
                    if(item.accountType == "4" || item.accountType == "5" || item.accountType == "9"){
                        coinMoney = coinMoney/500;
                    }
                    span.text = "等同于:    " + coinMoney + " " + cointype;             
                    span.y = 30 * index;  
                    this.textBox.addChild(span);
                }
              
            })

        }
    }
    Sail.class(gain, "Alert.gain");
}