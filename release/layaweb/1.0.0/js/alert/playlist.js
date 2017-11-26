{
        let EVENT_CLICK = Laya.Event.CLICK;
        let ALERT_CONFIG = {
        "shadowAlpha" : 0.7, 
            "autoClose" :  false,
            "closeOther"  : true
        };

    class playList extends ui.alert.playlistUI{
        constructor(data){
            super(); 
            this.uiLists = [];  
            this.CONFIG = ALERT_CONFIG;
            this.data = data;    
            this.init(data);
        }
        init(data){ 
            this.playList.vScrollBarSkin = "";
            this.playList.array = [];
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");             
                this.close();
            });
            this.showDetail(data);
           
        }

        showDetail(data){
             let tempList = [];
             let list = data || [];  
             if(list.length==0){
                this.noRecord.visible = true;
             }else{
                 this.noRecord.visible = false;
                 this.allNum.text = list.length;
                  for(let i=0; i<list.length; i++){
                       tempList.push({
                          'rank': i+1,
                          'userName':Sail.Utils.cutStr(list[i].userName, 8),                      
                          'amount':list[i].amount                    
                        });                                    
                  }
                  this.playList.array = tempList;

             }
          
        }
        
        enter () {
           
        }
       

    }
     Sail.class(playList, "Alert.playList");
}