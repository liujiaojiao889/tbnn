{
    class Message extends ui.alert.tipsUI{
        constructor(msg, callback, fun){
            super();
            this.init(msg, callback, fun);
        }
        init(msg, callback, fun){
            this.label.changeText(msg);
            this.callback = callback;
            if(fun && typeof fun == 'function'){
                fun.call(this);
            }
        }
        onClosed(){
            this.callback && this.callback();
        }
    }
    Sail.class(Message, 'Alert.Message')
}
{
    class tip extends Laya.Sprite{
        
    }
}