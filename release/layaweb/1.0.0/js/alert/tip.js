{
    class TipClass extends Laya.Dialog{
        constructor(text){
            super();
            this.init(text);
        }
        init(text){
            this.CONFIG = {
               "isModal"     : true,
               "autoClose"   : 2000,
               "shadowAlpha" : 0,
               "closeOther"  : true,
               "closeOnSide" : true,   
            };
            this.size(843,45);
            let bg = new Laya.Image('res/alert/tips.png');
            let msg = new Laya.Label();
            msg.width = this.width;
            msg.fontSize = 30;
            msg.y = 5;
            msg.font = 'simHei';
            msg.color = '#ffffff';
            msg.align = 'center';
            msg.changeText(text);
            this.addChildren(bg, msg);
            // this.closeEffect = Laya.Handler.create(this, ()=>{

            // });
        }
    }
    Sail.class(TipClass, 'Alert.Tip');
}