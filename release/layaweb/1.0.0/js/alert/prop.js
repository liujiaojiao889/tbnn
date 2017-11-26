/* 
道具
 */
 {
    let EVENT_CLICK = Laya.Event.CLICK;
    let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true
    };
    class  propuser extends ui.alert.propUserUI{
        constructor(data,index){
            super();
            this.data = data;  
            this.id  = null;       
            this.init(data,index);
        }

        init(data,index){
            this.propbg.index = 0;
            this.id = data.id;
            this.animation.skin = data.img;
            this.price.text  = data.price;
            this.on(EVENT_CLICK,this,function(){
                Laya.SoundManager.playSound("sound/btn.mp3");  
                //  发送道具
                let parmas = {
                    sendAll : tbnn.dom.prop.sendAll,
                    seatId : tbnn.dom.prop.seatId,
                    itemId : this.id

                }
                Sail.io.emit(GAME_CMDS.SENDPROP,parmas);
                this.offAll(Laya.Event.CLICK);
                tbnn.dom.prop.close();
            });
        }
        
   
    }
    class prop extends ui.alert.propUI {
        constructor (data) {
            super();
            tbnn.dom.prop = this;
            tbnn.dom.prop.sendAll = 0;
            this.data = data;
            this.CONFIG = ALERT_CONFIG;
            this.seatId = null;
            this.isAll = null;
            this.init(data);
        }

        init (data) {
            
            tbnn.dom.prop.seatId = data.userInfo.seatId;
            this.avater.skin = Sail.Utils.getAvatar(data.userInfo.userId);
            this.userName.text = Sail.Utils.cutStr(data.userInfo.userName, 8);
            this.amount.text = data.userInfo.amount
            this.propList.hScrollBarSkin = ''; 
            this.propdata(data);
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.close();
            });
            this.haveseat.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");   
                Sail.io.emit(GAME_CMDS.SIT_DOWN_USER,{seatId : this.seatId});
                this.close();
            });    
            this.allselect.on(EVENT_CLICK,this,function(){
                 Laya.SoundManager.playSound("sound/btn.mp3");   
                 let flag = this.select.visible;
                    if(flag == true){
                        tbnn.dom.prop.sendAll = 0;
                        this.select.visible = false;
                    }else{
                        tbnn.dom.prop.sendAll = 1;
                        this.select.visible = true;
                    }                            
               
            })  
        }
        propdata(data){
            let tempList = [];
            let propdata = data.propList;
            let list = propdata || [];
            if(list.length > 0){               
                for(let i=0; i<list.length; i++){
                    let li = new propuser(list[i],i);
                    li.name = "content";
                    this.propList.addChild(li);
                    li.pos(i%6*155,parseInt(i/6)*210);
                }
            }else{
                this.noRecord.visible = true;
            }
            PROPUSER = this.getElementsByName(this,"content");
            for(let i=0;i<PROPUSER.length;i++){
                
                PROPUSER[i].on(EVENT_CLICK,this,function(){
                    for(let j=0;j<PROPUSER.length;j++){
                        PROPUSER[j].propbg.index=0;
                    }
                    PROPUSER[i].propbg.index=1;

                })
            }
            
        }
        getElementsByName(root_dom, name){
            var arr = [];
            if (root_dom.getChildByName && root_dom.getChildByName(name)) {
            for (var i = 0; i < root_dom.numChildren; i++) {
                if (root_dom.getChildAt(i).name == name) {
                    arr.push(root_dom.getChildAt(i));
                }
                }
            }
            for (var i = 0; i < root_dom.numChildren; i++) {
                    arr = arr.concat(this.getElementsByName(root_dom.getChildAt(i), name));
            }
            return arr;

        }
       
    }
   
   
    Sail.class(prop, "Alert.prop");
}