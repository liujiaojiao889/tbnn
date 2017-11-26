/*
上庄列表
*/
{
        let EVENT_CLICK = Laya.Event.CLICK;
        let ALERT_CONFIG = {
        "shadowAlpha" : 0.7, 
            "autoClose" :  false,
            "closeOther"  : true
        };

    class graveList extends ui.alert.zhuangListUI{
        constructor(data){
            super(); 
            this.uiLists = [];  
            this.CONFIG = ALERT_CONFIG;
            this.data = data;    
            this.init(data);
        }
        init(data){
           
            this.zhuangList.vScrollBarSkin = "";
            this.zhuangList.array = [];
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");             
                this.close();
            });
            this.showDetail(data);
           
        }

        showDetail(data){
            let tempList = [];
            // let pindex = Object.keys(data).length;    
             let list = data || [];  
             if(list.length==0){
                this.noRecord.visible = true;
                this.bankbox.visible = false;
              
             }else{
                
                 this.noRecord.visible = false;
                 this.bankbox.visible = true;
                
                  for(let i=0; i<list.length; i++){
                      console.log(list[i].name)
                       tempList.push({
                          'rank': i+1,
                          'name':Sail.Utils.cutStr(list[i].name,8),                      
                          'amount':list[i].amount                    
                        });                                    
                  }
                  this.zhuangList.array = tempList; 

             }
          
        }
        
        enter () {
           
        }
       

    }
     Sail.class(graveList, "Alert.graveList");
}