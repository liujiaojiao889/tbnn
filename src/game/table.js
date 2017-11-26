{   
    let areaOrder = ['shunAmount','tianAmount','diAmount','xuanAmount'];
    class TableClass extends ui.game.tableUI{
        constructor(){
            super();
            this.betInternal = false;
            this.betData = {
                1 : 0,
                2 : 0,
                3 : 0,
                4 : 0
            }
            this.coinAmount = {
                1 : 0,
                2 : 0,
                3 : 0,
                4 : 0
            }
            this.init();
        }

        init(){
            this.progress.bar.pos(-4,5);
            this.coins = [];
            this.areas = [this.area1,this.area2,this.area3,this.area4];
            this.seats = [this.seat0,this.seat1,this.seat2,this.seat3,this.seat4,this.seat5,this.seat6,this.seat7];
            this.initAreas();
            this.initSeats();
        }

        initAreas(){
            this.area1.tableName.skin = 'res/game/shun.png';
            this.area2.tableName.skin = 'res/game/tian.png';
            this.area3.tableName.skin = 'res/game/di.png';
            this.area4.tableName.skin = 'res/game/xuan.png';
            this.areas.forEach((item, index)=>{
                item.on(Laya.Event.CLICK, this, ()=>{
                    if(tbnn.data.isBanker){
                        Sail.director.popScene(new Alert.Tip('操盘手不能投币'));
                        return;
                    }else if(tbnn.data.betAvailable){
                        if(tbnn.data.leftAmount < tbnn.data.betAmount){
                            Sail.director.popScene(new Alert.Tip('当前可投币总额不足'));
                            return;
                        }
                        Com.Game.CoinCtrl.coinFly(8, index);
                        //合并押注
                        if(this.betInternal){
                            this.betData[index+1] += tbnn.data.betAmount;
                        }else{
                            if(tbnn.data.firstbet){
                                this.betData[index+1] += tbnn.data.betAmount;
                                tbnn.data.firstbet = false;
                            }
                            let delay = 0;
                            this.timerOnce(250, this, ()=>{
                                for(let key in this.betData){
                                    this.timerOnce(delay, this, ()=>{
                                        if(this.betData[key]){
                                            Sail.io.emit(GAME_CMDS.BET_CALL, {
                                                'areaId' : key,
                                                'amount' : this.betData[key]
                                            });
                                        }
                                        this.betData[key] = 0;
                                    });
                                delay += 250;
                                }
                            });
                            this.betInternal = true;
                        }
                    }
                });
                item.myAmount.on(Laya.Event.CHANGE, this, (item)=>{
                    if(item.myAmount.text == '' || item.myAmount.text == 0){
                        item.myAmountLabel.visible = false;
                    }else{
                        item.myAmountLabel.visible = true;
                    }
                },[item]);
            });
        }

        initSeats(){
            this.seats.forEach((item, index)=>{
                item.empty.on(Laya.Event.CLICK, this, ()=>{
                    Sail.io.emit(GAME_CMDS.SIT_DOWN_USER , {
                        seatId : index+1
                    });
                });
                item.full.on(Laya.Event.CLICK, this, ()=>{
                    Sail.io.emit(GAME_CMDS.GET_SEAT_USER_INFO , {
                        seatId : index+1
                    });
                });
            });
        }

        /**
         * 可投币金额
         */
        setAvailableAmount(num){
            this.available.changeText('当前可投币总额：' + num);
            if(num<10){
                this.countdown.visible = false;
                this.waiting(2);
            }
        }
        /**
         * 四门投币金额
         */
        setAreaAmount(data, noAni){
            this.areas.forEach((item,index)=>{
                let amount = data[areaOrder[index]];
                if(amount){
                    item.amount.changeText(amount); 
                    let addAmount = Math.ceil(amount/300) - this.coinAmount[index+1];
                    this.coinAmount[index+1] = Math.ceil(amount/300);
                    for(let i = 0 ; i < addAmount ; i++){
                        Com.Game.CoinCtrl.coinFly(9, index, noAni);
                    }
                }
                if(data.myInfo){
                    item.myAmount.text = data.myInfo[areaOrder[index]];
                }
            });
        }
        /**
         * 坐下
         */
        sitDown(data){
            let seat = this.seats[data.seatId-1];
            seat.empty.visible = false;
            seat.full.visible = true;
            let amount = Sail.Utils.transferNumberToK(data.amount);
            seat.amount.changeText(amount);
            seat.pic.skin = Sail.Utils.getAvatar(data.userId);
            seat.frame.visible = GM.user_id == data.userId;
            //保存自己座位
            if(data.userId == GM.user_id){
                this.mySeat = seat;
            }
        }
        /**
         * 站起
         */
        standUp(data){
            let seat = this.seats[data.seatId-1];
            if(data.content){
                Sail.director.popScene(new Alert.Tip(data.content));
            }
            seat.empty.visible = true;
            seat.full.visible = false;
            seat.frame.visible = false;
            if(data.userId == GM.user_id){
                this.mySeat = null;
            }
        }
        /**
         * 更新我的座位金额
         */
        updateMyAmount(amount){
            if(this.mySeat){
                this.mySeat.amount.changeText(Sail.Utils.transferNumberToK(amount));
            }
        }
        /**
         * 显示翻倍结果
         */
        showMultiple(data, index){
            let isBet = false;
            let result = data.settlement.myResult;
            let amountLabel = this.areas[index].myAmount;
            if(result){
                let multiple = result.multiple;
                let areaName = areaOrder[index];
                if(Array.isArray(multiple)){
                    multiple.forEach((item,i)=>{
                        if(areaName.substr(0,2) == item.area.substr(0,2)){
                            amountLabel.text = 'x' + item.multiple + '  ' + item.betAmont;
                            isBet = true;
                            tbnn.data.areasBetFlags[index] = isBet;
                        }
                    });
                }
            }
            if(!isBet){
                amountLabel.text = '没有投币';
            }
        }
        /**
         * 开始倒计时
         */
        beginCountDown(count, maxCount){
            if( !count ) return;
            tbnn.data.betAvailable = true;
            this.countdown.visible = true;
            this.count.changeText('');
            let duration = 1000;
            this.progress.value = count/maxCount;
            this.countDownValue = count;
            this.countDownaction(maxCount);
            this.timerLoop(duration, this, this.countDownaction ,[maxCount] );
        }
        countDownaction(maxCount){
            this.count.changeText(this.countDownValue);
            if(this.countDownValue<=5 && this.countDownValue!=0){
                Laya.SoundManager.playSound('sound/countdown.mp3');
            }
            Laya.Tween.to(this.progress, {value:this.countDownValue--/maxCount},1000);
            if(this.countDownValue < 0){
                this.stopCountDown();
            }
        }
        /**
         * 停止倒计时
         */
        stopCountDown(){
            this.clearTimer(this,this.countDownaction);
            tbnn.data.betAvailable = false;
            this.countdown.visible = false;
            this.waiting(2);
        }
        /**
         * 等待提示
         */
        waiting(type){
            this.countdown.visible = false;
            this.reminder.visible = true;
            let text = "";
            switch(type){
                case 0:
                    this.reminder.visible = false;
                    break;
                case 1 :
                    text = '等待玩家操盘...';
                    break;
                case 2 :
                    text = '等待发牌...'
                    break;
                default:
                    break;
            }
            this.reminder.changeText(text);
        }

        /**
         * 重置游戏
         */
        resetTable(){
            this.coinAmount = {
                1 : 0,
                2 : 0,
                3 : 0,
                4 : 0
            }
            this.reminder.visible = false;
            this.areas.forEach((item, index)=>{
                item.amount.changeText(0);
                item.myAmount.text = '';
            });
            tbnn.dom.coins.forEach((item)=>{
                if(Array.isArray(item)){
                    item.forEach((item)=>{
                        item.removeSelf();
                        Laya.Pool.recover(Com.Game.CoinCtrl.COIN_SIGN, item);
                    });
                }
            });
            tbnn.dom.coins = [[],[],[],[]];
        }
        /**
         * 更新座位金额
         */
        setSeatAmount(seatId, amount){
            this.seats[seatId-1] && this.seats[seatId-1].amount.changeText(Sail.Utils.transferNumberToK(amount));
        }
    }   

    Sail.class(TableClass, 'Com.Game.Table');
}