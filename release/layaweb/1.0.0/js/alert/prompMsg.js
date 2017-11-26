{
    let EVENT_CLICK = Laya.Event.CLICK;
    class propMsg extends ui.alert.propMsgUI{
        constructor(data){
            super();
            this.init(data);
        }
        init(data){
            this.prompMsg.text = data;       
            this.surebtn.on(EVENT_CLICK,this,function(){
                Laya.SoundManager.playSound("sound/btn.mp3");  
                let show = this.tips.selected?1:0;
                Sail.io.emit(GAME_CMDS.UPDATAPROMPT,{rpcId:show});
                this.close();

            });
            this.closeBtn.on(EVENT_CLICK, this, function () {
                Laya.SoundManager.playSound("sound/btn.mp3");   
                this.close();
            });
           
        }
       
    }
    Sail.class(propMsg, 'Alert.propMsg')
}
