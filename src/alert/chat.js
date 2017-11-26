/* 
表情聊天
 */
{
    let EVENT_CLICK = Laya.Event.CLICK;
     let ALERT_CONFIG = {
       "shadowAlpha" : 0.7, 
        "autoClose" :  false,
        "closeOther"  : true
    };

    class chat extends ui.alert.lookUI {
        constructor (data) {
            super();

            this.data = data;
            this.CONFIG = ALERT_CONFIG;
           
            this.init(data);
        }

        init (data) {  
            let ACTIONS = {
                [GAME_CMDS.CHATLIST] : this.chatDetail, //聊天语句列表
                [GAME_CMDS.EXPRESS] : this.lookDetail       //表情列表
                
            };    
            Sail.io.register(ACTIONS,this);   
            Sail.io.emit(GAME_CMDS.CHATLIST);
            Sail.io.emit(GAME_CMDS.EXPRESS);
            this.chattab.selectHandler = this.chatpage.setIndexHandler;
            this.chatList.vScrollBarSkin = "";
            this.chatList.array = [];
            this.lookList.array = [];
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.close();
            });         
          
        }
        //聊天语句
        chatDetail(data){
            let tempList = [];
            let list = data || [];
            let chatvis ;
            for(let i=0;i<list.length;i++){
                if(i==0){
                    chatvis = true;
                }else{
                    chatvis = false;
                }
                
                tempList.push({"chatbg":{visible:chatvis},"id":list[i].id,"chat":list[i].content})
            }
            this.chatList.array = tempList;
            this.chatList.selectHandler = Laya.Handler.create(this,this.chatIndex,null,false);

        }
        //改变文字选中状态  发送命令
        chatIndex(index){
             for(let i=0;i< this.chatList.length;i++){
                if(i==index){
                    this.chatList.changeItem(i,{'chatbg':{visible:true},"id":this.chatList.array[i].id,"chat":this.chatList.array[i].content});
                    let id = this.chatList.array[index].id;
                    let params = {
                      "langId":id
                    }

                    Sail.io.emit(GAME_CMDS.SENDLANGUAGE,params);
                    this.close();
                   

                }else{
                    this.chatList.changeItem(i,{'chatbg':{visible:false},"id":this.chatList.array[i].id,"chat":this.chatList.array[i].content});
                }
             }
        }
        //表情
        lookDetail(data){
            let tempList = [];
            let list = data || [];
            let selectvis ;
            for(let i=0;i<list.length;i++){
               
                
                tempList.push({"select":{visible:selectvis},"img":list[i].url,"id":list[i].id})
            }
            this.lookList.array = tempList;
            this.lookList.selectHandler = Laya.Handler.create(this,this.LookIndex,null,false);


            

        }
        //改变选中表情状态  发送命令
        LookIndex(index){
             for(let i=0;i< this.lookList.length;i++){
                if(i==index){
                    this.lookList.changeItem(i,{"select":{visible:true},"id":this.lookList.array[i].id,"img":this.lookList.array[i].url});
                    let id = this.lookList.array[index].id;
                    let params = {
                      "icoId":id
                    }

                    Sail.io.emit(GAME_CMDS.SENDEXPRESS,params);
                    this.close();
                   

                }else{
                      this.lookList.changeItem(i,{"select":{visible:false},"id":this.lookList.array[i].id,"img":this.lookList.array[i].url});
                }
             }

        }
    }
    Sail.class(chat, "Alert.chat");
}