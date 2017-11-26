{
    class TopClass extends ui.game.topUI{
        constructor(){
            super();
            tbnn.dom.top = this;
            this.bankerType = 0;//0.非庄家1.队列中2.庄家
            this.bindEvent();
        }
        setBanker(data){
            if(data.bankerId){
                this.bankerName.changeText(Sail.Utils.cutStr(data.bankerName, 8));
                this.avatar.skin = Sail.Utils.getAvatar(data.bankerId);
                this.gold.changeText(data.gameAmount);
                if(data.bankerId == userId){
                    this.operate.skin = 'res/game/offbanker.png';
                    this.bankerType = 2;
                    tbnn.data.isBanker = true;
                }
            }else{
                this.bankerName.changeText('虚位以待');
            }
            if(data.inBankerList == 1){
                this.inBankerList();
            } 
        }
        bindEvent(){
            Sail.Utils.addBtnSound(this);
            this.operate.on(Laya.Event.CLICK, this, ()=>{
                switch(this.bankerType){
                    case 0 ://申请操盘
                        Sail.director.popScene(new Alert.Caopan);
                        break;
                    case 1 ://退出队列
                        Sail.io.emit(GAME_CMDS.OUT_BANKER_LIST);
                        break;
                    case 2 ://退出操盘
                        Sail.io.emit(GAME_CMDS.BANKER_DOWN_USER);
                        break;
                    default:
                        break;
                }
            });
            this.back.on(Laya.Event.CLICK, this, ()=>{
                Sail.io.emit(GAME_CMDS.OUT_ROOM);
            });
            this.record.on(Laya.Event.CLICK, this, ()=>{
                Sail.io.emit(GAME_CMDS.HISTORY_CARD);
            });
            this.bankerList.on(Laya.Event.CLICK, this, ()=>{
                Sail.io.emit(GAME_CMDS.BANKER_LIST);
            });
            this.setting.on(Laya.Event.CLICK, this, ()=>{
                Sail.director.popScene(new Alert.Set);
            });
            this.poolArea.on(Laya.Event.CLICK, this, ()=>{
                Sail.io.emit(GAME_CMDS.POOL_INFO);
            });
        }
        removeBanker(bankerId){
            this.bankerName.changeText('虚位以待');
            this.gold.changeText('');
            this.avatar.skin = '';
            if(userId == bankerId){
                this.bankerType = 0;
                this.operate.skin = 'res/game/operate.png';
                tbnn.data.isBanker = false;
            }
        }
        /**
         * 设置奖池金额
         */
        setPool(num){
            let origin = Number(this.pool.text);
            let amout = num-origin;
            let i = 0;
            this.timerLoop(50,this,addPoolNum,[amout,origin]);
            function addPoolNum(amout,origin){
                if(i == 60){
                    this.clearTimer(this,addPoolNum);
                }
                this.pool.changeText(parseInt(origin+amout*i/60)); 
                i++;
            }
        }
        /**
         * 进入操盘队列
         */
        inBankerList(){
            this.bankerType = 1;
            this.operate.skin = 'res/game/offline.png';
        }
        /**
         * 退出操盘
         */
        bankerDown(){
            this.bankerType = 0;
            this.operate.skin = 'res/game/operate.png';
        }
    }
    Sail.class(TopClass, 'Com.Game.Top');
}