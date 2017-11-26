{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true
    };
    let VALUES = ["10", "50", "100", "500"];

    class recharge extends ui.alert.rechargeUI {
        constructor (data) {
            super();

            this.data = data;
            this.CONFIG = ALERT_CONFIG;
            this.indexd = null;
            this.init();
        }

        init () {
            this.rechargeTab.selectedIndex = 2;
            this.rechageNum.text = 100;
            let tabItems = this.rechargeTab.items;
            for(let i in tabItems){
                tabItems[i].getChildByName("value").text = VALUES[i] + "元";
            }           
            this.rechargeTab.selectHandler = new Laya.Handler(this, function (index) {
                Laya.SoundManager.playSound("sound/btn.mp3");   
                if(index == -1){return;}                
                this.rechageNum.text = VALUES[index];
            });
            this.rechageNum.on(EVENT_CLICK,this,function(){
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.showKeyboard();
            })
            this.closeBtn.on(EVENT_CLICK, this, function () {  
                Laya.SoundManager.playSound("sound/btn.mp3");            
                this.close();
            });
            this.rechargeBtn.on(EVENT_CLICK, this, function(){
               Laya.SoundManager.playSound("sound/btn.mp3");   
               if(this.rechageNum.text>0){
                    this.gorechange(); 
               }else{
                    return;
               }
               this.close();
               
            });                 
        }
       
        onKeyboardInput (value) {
            this.rechageNum.text = value;
            for(let i in VALUES){
                if(VALUES[i] == value){
                    this.rechargeTab.selectedIndex = i;
                    return;
                }
            }
            this.rechargeTab.selectedIndex = -1;
        }
        showKeyboard () {
            console.log(this.rechageNum)
            let KEYBOARD_CONFIG = {
                "length" : 8,
                "input" : this.onKeyboardInput.bind(this),
                "close" : function (type, value) {
                    if(type === "confirm"){
                        this.onKeyboardInput(value);
                    }
                }.bind(this)
            };
            Sail.keyboard.enter(this.rechageNum.text, KEYBOARD_CONFIG);
        }
        gorechange(){      
            let url = `/?act=payment&gameId=${gameId}&tradeName=${tradeName}&amount=${this.rechageNum.text}&platform=${platform}&redirect_uri=${redirect_uri}`;
            window.location.href = url;

        }
        
    }
    Sail.class(recharge, "Alert.recharge");
}