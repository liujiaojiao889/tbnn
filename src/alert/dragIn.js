{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true,
        "closeOnSide" : true
    };
   

    class dragin extends ui.alert.dragInUI {
        constructor () {
            super();
      
            this.CONFIG = ALERT_CONFIG;
            this.moneyNum = null;          
            this.init();
        }

        init () {          
           
            Sail.io.register(GAME_CMDS.USE_INFO, this,this.allmoney);
            Sail.io.emit(GAME_CMDS.USE_INFO);
             
           
            this.coin.on(EVENT_CLICK,this,function(){
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.showKeyboard();
            })
            this.closeBtn.on(EVENT_CLICK, this, function () { 
                Laya.SoundManager.playSound("sound/btn.mp3");             
                this.close();
            });
            this.goon.on(EVENT_CLICK, this, function(){
                Laya.SoundManager.playSound("sound/btn.mp3");   
                let params = {
                    amount:this.coin.text
                }    
                if(this.coin.text > 0){
                    Sail.io.emit(GAME_CMDS.CHARGEIN,params); 
                    this.close();     
                }else{
                     Sail.director.popScene(new Alert.Tip('带入的游戏币不能大于余额或小于等于0'));

                }
                  
                            
            });
    
        }
        allmoney(data){
             this.balance.text = data.platformAmount;
        }
      
        showKeyboard () {
           this.moneyNum  = this.coin.text;
                let config = {
                    "input": function (value) {             
                      this.moneyNum = value;                  
                       
                    },
                    "close" : function (type, value) {
                        if(type == "confirm"){                      
                            this.moneyNum = value;
                            this.coin.text = this.moneyNum;                           
                        }
                    }.bind(this)
                };
                
           
            Sail.keyboard.enter(this.coin.text,config);
        }
        onClosed(){ 
         
            Sail.io.unregister(GAME_CMDS.USE_INFO, this,this.allmoney);
        }
    }
    Sail.class(dragin, "Alert.dragin");
}