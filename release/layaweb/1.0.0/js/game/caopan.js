{
    class CaopanClass extends ui.game.caopanUI{
        constructor(){
            super();
            this.minAmount = 0;
            this.init();
            tbnn.cp = this;
        }
        init(){
            this.caopanType.labelFont = 'SimHei';
            this.bindEvent();
            Sail.io.emit(GAME_CMDS.BANKER_UP_INIT);
        }
        bindEvent(){
            Sail.Utils.addBtnSound(this);
            this.amount.on(Laya.Event.CLICK, this, function(){
                Sail.keyboard.enter(this.amountValue.text, {
                    input: (value)=>{
                        this.amountValue.changeText(value);
                    },
                    close: (type, value)=>{
                        if(type == 'confirm'){
                            this.amountValue.changeText(value);
                        }
                    }
                });
            });
            this.times.on(Laya.Event.CLICK, this, function(){
                Sail.keyboard.enter(this.timesValue.text, {
                    input: (value)=>{
                        this.timesValue.changeText(value);
                    },
                    close: (type, value)=>{
                        if(type == 'confirm'){
                            this.timesValue.changeText(value);
                        }
                    },
                    zero : true
                });
            });
            this.ensure.on(Laya.Event.CLICK, this, function(){
                let amount = this.amountValue.text;
                //判断是否满足最小金额
                if(amount < this.minAmount){
                    Sail.director.popScene(new Alert.Tip('不足最低操盘金额'));
                    return;
                }
                let selected = this.caopanType.selectedIndex;
                let times = selected == 0 ? this.timesValue.text : -1;
                let goon = this.goon.selected?1:0;
                Sail.io.emit(GAME_CMDS.BANKER_UP,{
                    "amount" : amount,
                    "times" : times,
                    "goon" : goon 
                });
                // this.close();
            });
            Sail.io.register(GAME_CMDS.BANKER_UP_INIT, this, this.dataInit);
        }
        dataInit(data){
            this.minAmount = data.leastAmount;
            this.amountValue.changeText(data.leastAmount);
            this.leastAmount.changeText(data.leastAmount);
            this.timesValue.changeText(data.defaultTimes);
            this.maxTime.changeText('每次最长操盘时间' + data.maxTime + '分钟');
            this.goon.selected = data.isContinue;
        }
        onClosed(){ 
            Sail.io.unregister(GAME_CMDS.BANKER_UP_INIT, this.dataInit);
        }
    }
    Sail.class(CaopanClass,'Alert.Caopan')
}