{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true
    };

    class pool extends ui.alert.poolUI {
        constructor (data) {
            super();

            this.data = data;
            this.CONFIG = ALERT_CONFIG;
           
            this.init(data);
        }

        init (data) {  
            this.poolList.array = [];
            this.prizeList.array = [];                 
            this.closeBtn.on(EVENT_CLICK, this, function () {
                this.close();
                Laya.SoundManager.playSound("sound/btn.mp3");   
            });
            this.quesBtn.on(EVENT_CLICK,this,function(){
                Laya.SoundManager.playSound("sound/btn.mp3"); 
                Sail.director.popScene(new Alert.rules);  

            })
            this.poolData(data);
            


        }
        poolData(data){
            this.poolAmount.text  = data.totalAmount;
            let poolList = data.awardType;
            let prizeList = data.userList;
            let tempList1 = [];
            let tempList2 = [];
          
            for(let i=0; i<poolList.length; i++){    
                let pooltext;           
                if(poolList[i].card_type=="CARD_TYPE_ZHA_DANG"){                  
                    pooltext = "炸弹"                   
                }else if(poolList[i].card_type=="CARD_TYPE_WU_HUA"){
                    pooltext = "五花牛"
                }else if(poolList[i].card_type=="CARD_TYPE_SI_HUA"){
                    pooltext = "四花牛";
                }

                tempList1.push({
                        'card_type':{text:pooltext},
                        'percent':poolList[i].percent +"%"                    
                })

            }
            this.poolList.array = tempList1;


            for(let i=0; i<prizeList.length; i++){ 
                let bgskin;
               
                if(i==0){
                  bgskin="res/alert/tiao.png";
                }else{
                  bgskin="res/alert/tiao2.png"; 
                }    
                tempList2.push({
                        'bg':{skin:bgskin},
                        'userAvater':Sail.Utils.getAvatar(prizeList[i].user_id),
                        'username': Sail.Utils.cutStr(prizeList[i].user_name, 12),
                        'userAmount':prizeList[i].award_amount                    
                })

            }
            this.prizeList.array = tempList2;

            
        }
    }
    Sail.class(pool, "Alert.pool");
}