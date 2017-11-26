{
    let EVENT_CLICK = Laya.Event.CLICK;
    
    class Room extends ui.hall.roomUI {
        constructor (index) {
            super();
            this.roomId = null;
            this.init(index);
        }

        init (index) {
            this.size(332,111);
            this.right = 20;
            this.index = index;
            this.centerY = 120*(index - 1);
            this.on(EVENT_CLICK,this,function(){
                if(!Sail.checkLogin()){return;} ; 
                Laya.SoundManager.playSound("sound/btn.mp3");                 
                let params = {
                    roomId:this.roomId
                }             
                Sail.io.emit(GAME_CMDS.INROOM,params);
            })

        }

        roomTable(res){
          this.roomId = res.roomId;
          this.userCount.text = res.userCount;
          this.roomNum.index = this.index;
          if(res.type == "fluent"){
                this.roomtype.index = 0;
          }else if(res.type == "hot"){
                this.roomtype.index = 1;
          }

        }

        enter () {
           
        }
    }
    class roomTable extends Laya.Box{
        constructor(){
            super();
            this.uiLists = [];
            this.res = [];
            this.init();
        }
        init(){           
            Sail.io.register(GAME_CMDS.ROOMlIST, this,this.RoomList);        
            Sail.io.emit(GAME_CMDS.ROOMlIST);         
            this.size(420,360);         
            this.right = 0;
           
        }
        RoomList(data){   
            
            this.res = data;    
            let delay = 300;
            this.res.forEach((item,index)=>{
                if(index>3){return;}
                let roomUI = new Room(index);
                roomUI.alpha = 0;
                Laya.Tween.to(roomUI, {y : 20 + 120 * index, alpha : 1}, 500, Laya.Ease.backOut, null, delay * index);
                this.uiLists.push(roomUI);
                this.addChild(roomUI);
            });
            for(let i in this.uiLists){
                this.uiLists[i].roomTable(this.res[i]);
            }
            Sail.io.emit(GAME_CMDS.USER_NAME);
            Sail.io.unregister(GAME_CMDS.ROOMlIST,this.RoomList);
        }
    }
    Sail.class(roomTable, "Com.hall.roomTable");
}