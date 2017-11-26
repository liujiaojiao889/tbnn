//押注记录
{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true
    };

    class hisrecord extends ui.alert.hisrecordUI {
        constructor (data) {
            super();

            this.data = data;
            this.CONFIG = ALERT_CONFIG;
            this.type = {
                "win":1,
                "lose":0
                
            }
            this.init(data);
        }

        init (data) {
            this.hisCard.array = [];                 
            this.closeBtn.on(EVENT_CLICK, this, function () {
                this.close();
                Laya.SoundManager.playSound("sound/btn.mp3");   
            });
          
            this.historyData();

        }
        historyData(){
            let tempList = [];
            let res = this.data;    
            if(res.length==0){
                this.noRecord.visible = true;

            }else{
                this.noRecord.visible = false;
                let list = res || [];
                for(let i=0; i<list.length; i++){
                
                    tempList.push({                   
                        'item0':this.type[list[i].shun],
                        'item1':this.type[list[i].di],
                        'item2':this.type[list[i].tian],
                        'item3':this.type[list[i].xuan]
                        
                    })

            
                }
                this.hisCard.array = tempList.reverse();
            }
           
            
        }
    }
    Sail.class(hisrecord, "Alert.hisrecord");
}