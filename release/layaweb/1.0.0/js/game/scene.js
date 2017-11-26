{
    class GameScene extends Sail.Scene{
        constructor(){
            super();
            tbnn.dom.gameScene = this;
            this.orderList = [
                'zhuangCard','shunCard','tianCard','diCard','xuanCard'
            ];
            this.init(); 
        }

        init(){
            this.size(Laya.stage.width, Laya.stage.height);
            this.ACTIONS = {
                [GAME_CMDS.ROUND_START] : this.roundStart,
                [GAME_CMDS.ROUND_OVER] : this.showCards,
                [GAME_CMDS.GET_ROOM_INFO] : this.setRoomInfo,
                [GAME_CMDS.BANKER_DOWN_ROOM] : this.bankerDown,
                [GAME_CMDS.BET_CALL] : this.betCall,
                [GAME_CMDS.BET_INFO] : this.betInfo,
                [GAME_CMDS.OUT_BANKER_LIST] : this.outBankerList,
                [GAME_CMDS.OUT_ROOM] : this.outRoom,
                [GAME_CMDS.HISTORY_CARD] : this.hisData,
                [GAME_CMDS.BANKER_LIST] : this.bankerList,
                [GAME_CMDS.POOL_INFO] : this.poolInfo,
                [GAME_CMDS.PLAYLIST] : this.userList,
                [GAME_CMDS.USE_INFO] :  this.userAmount,
                [GAME_CMDS.SIT_DOWN_ROOM] : this.sitDown,
                [GAME_CMDS.BANKER_UP] : this.bankerUp,
                [GAME_CMDS.AWARD_POOL] : this.saveAward,
                [GAME_CMDS.SENDLANGUAGE] : this.sendLanguage,
                [GAME_CMDS.SENDEXPRESS] : this.sendExpress,
                [GAME_CMDS.GET_SEAT_USER_INFO] : this.seatUserInfo,
                [GAME_CMDS.STAND_UP] : this.standUp,
                [GAME_CMDS.SENDPROP] : this.sendProp,
                [GAME_CMDS.SEAT_BET_CALL] : this.seatBetCall,
                [GAME_CMDS.NOTICE_MAIN] : this.notice
            }
            Laya.loader.load(ASSETS.GAME, Laya.Handler.create(this, this.showMainview));
        }
        onResize(width, hight){
            this.size(width, hight);
        }
        onEnter(){}
        onExit(){
            tbnn.dom.table = null;
            tbnn.dom.top = null;
            tbnn.dom.gameScene = null;
            if(this.bottom.chatHandler){
                this.bottom.chatHandler.clear();
            }
            tbnn.dom.coins = [[],[],[],[]];
            this.destroy();
            Laya.Pool.clearBySign(Com.Game.CoinCtrl.COIN_SIGN);
            Sail.io.unregister(this.ACTIONS,this);
        }

        showMainview(){
            let Bg = new Laya.Image("res/game/bg.png");
            Bg.centerX = Bg.centerY = 0;

            let top = this.top = new Com.Game.Top();
            top.top = 0;
            let bottom = this.bottom = new Com.Game.Bottom(); 
            bottom.bottom = 0;   

            let table = this.table = new Com.Game.Table();
            tbnn.dom.table = table;
            table.centerX = 0;
            table.centerY = 20; 
            this.addChildren(Bg, top, table, bottom);
            Sail.io.register(this.ACTIONS,this);
            Sail.io.emit(GAME_CMDS.GET_ROOM_INFO);
            Sail.io.emit(GAME_CMDS.USE_INFO, {type:"game"});
            if(tbnn.data.autoSit){
                Sail.io.emit(GAME_CMDS.SIT_DOWN_USER);
            }
        }

        /**
         * 房间信息
         */
         setRoomInfo(data){
            let table = this.table;
            let chips = data.allChips;
            let defaultChip = data.defaultChip;
            tbnn.data.betAvailable = data.betAvailable;
            //设置奖池
            this.top.setPool(data.poolAmount);
            //投币上限
            table.setAvailableAmount(data.leftAmount);
            if(data.leftAmount){
                tbnn.data.leftAmount = data.leftAmount;
            }
            //四门投币金额
            table.setAreaAmount(data, true);
            //庄家
            this.top.setBanker(data);
            //筹码
            this.bottom.initList(data.allChips, data.defaultChip);
            //座位
            let seatInfo = data.seatInfo;
            for(let key in seatInfo){
                seatInfo[key].seatId = key;
                this.table.sitDown(seatInfo[key]);
            }
            //个人信息
            let baseInfo = data.baseInfo;
            if(baseInfo){
                tbnn.data.userHallInfo.avater = baseInfo.avater;
                this.bottom.setUserInfo(baseInfo.avater, baseInfo.userName);
            }
            //倒计时
            if(!data.leftTime){
                this.table.waiting(1);
            }   
            if(data.leftTime > 0 && data.betTime){
                this.table.beginCountDown(parseInt(data.leftTime/1000), parseInt(data.betTime/1000));
            }
         }

         /**
          * 游戏开始
          */
        roundStart(data){
            this.reStart();
            this.table.beginCountDown(parseInt(data.betTime/1000), parseInt(data.betTime/1000));
            this.top.setBanker(data);
            tbnn.data.betAvailable = true;
        }
          
        /**
         * 发牌
         */
        showCards(data){
            this.table.betInternal = false;
            this.table.stopCountDown();
            this.table.waiting(0);
            this.cardList = [];//牌sprite集合
            let cardInfo = data.cardInfo;
            let delay = 1000;
            for(let i = 0; i < 5 ; i++){
                this.timerOnce(delay*i, this, function(){
                    this.cardList.push(Com.Game.CardCtrl.create5cards(cardInfo[this.orderList[i]],i));
                    if(i==4){
                        this.timerOnce(1000,this,this.showResult,[data]);
                    }
                }); 
            }
        }
        /**
         * 翻牌显示结果
         */
        showResult(data){
            let delay = 1000;
            let cardInfo = data.cardInfo;
            this.cardList.forEach((item,index)=>{
                this.timerOnce(delay*index, this, ()=>{
                    item.showResult();
                    index>0 && this.table.showMultiple(data, index-1);
                })
            });
            this.timerOnce(delay*this.cardList.length, this, ()=>{
                Com.Game.CoinCtrl.coinsRecover(data.cardInfo);
            });
            if(data.settlement && data.settlement.myResult && Object.keys(data.settlement.myResult)!=0){
                this.timerOnce(delay*this.cardList.length + 1000, this, ()=>{
                    data.poolAmount && this.top.setPool(data.poolAmount);
                    Sail.director.popScene(new Alert.ResultLayer(data.settlement));
                    Sail.io.emit(GAME_CMDS.USE_INFO, {type:"game"});
                    //救济金
                    if (window.GM && GM.socket_RJ && GM.socket_RJ.exec) {
                        GM.socket_RJ.exec();
                        //更新余额
                        Sail.io.emit(GAME_CMDS.USE_INFO);
                    }
                });
            }else{
                this.timerOnce(delay*this.cardList.length + 1000, this, ()=>{
                    data.poolAmount && this.top.setPool(data.poolAmount);
                });
            }
            this.timerOnce(delay*this.cardList.length + 3000, this, ()=>{
                if(tbnn.data.award){
                    Sail.director.popScene(new Alert.prize(tbnn.data.award));
                }
                tbnn.data.award = null;
            });
            this.timerOnce(delay*this.cardList.length + 5000, this, ()=>{
                this.reStart();
            });
        }
        /**
         * 上庄
         */
        bankerUp(data){
            this.top.setBanker(data);
        }
        /**
         * 下庄
         */
        bankerDown(data){
            this.table.waiting(1);
            this.top.removeBanker(data.bankerId);
        }

        /**
         * 押注
         */
        betCall(data,cmd){
            this.table.betInternal = false;
            tbnn.data.firstbet = true;
            this.table.setAreaAmount({
                myInfo : data
            }, true);
            this.bottom.amount.changeText(data.leftAmount);
        }
        
        /**
         * 押注信息
         */
        betInfo(data){
            tbnn.data.leftAmount = data.leftAmount;
            this.table.setAvailableAmount(data.leftAmount);
            this.table.setAreaAmount(data);
        }

        /**
         * 重置游戏
         */
        reStart(){
            this.cardList && this.cardList.forEach((item,inex)=>{
                item.reset();
            });
            this.table.resetTable();
        }
        /**
         * 退出队列
         */
        outBankerList(){
            this.top.bankerDown();
        }
        /**
         * 退出房间
         */
        outRoom(){
            Sail.io.socket.end();
            IO_CONFIG.URL = connectionUrl;
            Sail.io.socket.init(IO_CONFIG);
            Sail.director.runScene(new Scene.Hall());
        }
        /**
         * 对局记录
         */
        hisData(data){
           Sail.director.popScene(new Alert.hisrecord(data));
       }
       /**
        * 上庄列表 
        */
        bankerList(data){
            Sail.director.popScene(new Alert.graveList(data));
        }
        /**
         * 奖池信息
         */
        poolInfo(data){
            Sail.director.popScene(new Alert.pool(data));
        }
        /**
         * 玩家列表
         */
        userList(data){
            Sail.director.popScene(new Alert.playList(data));
        }
        /**
         * 账户信息
         */
        userAmount(data){
            this.bottom.amount.changeText(data.gameAmount);
            this.table.updateMyAmount(data.gameAmount);
        }
        /**
         * 坐下
         */
        sitDown(data){
            this.table.sitDown(data);
        }
        /**
         * 分奖
         */
        saveAward(data){
            tbnn.data.award = data;
        }
        /**
         * 发送文字
         */
        sendLanguage(data){
            this.bottom.addChat(data, 1);
        }
        /**
         * 发送表情
         */
        sendExpress(data){
            this.bottom.addChat(data, 2);
        }
        seatUserInfo(data){
            Sail.director.popScene(new Alert.prop(data));
        }
        standUp(data){
            this.table.standUp(data);
        }
        /**
         * 赠送道具
         */
        sendProp(data){
            let startPoint = null;
            let bottom = this.bottom;
            let top = this.top;
            if(GM.user_id == data.originUid){
                startPoint = bottom.localToGlobal(new Laya.Point(bottom.avatar.x ,bottom.avatar.y));
            }else if(data.originSeat == 0){
                startPoint = bottom.localToGlobal(new Laya.Point(bottom.userList.x ,bottom.userList.y));
            }else if(data.originSeat == 9){
                startPoint = top.localToGlobal(new Laya.Point(top.avatar.x ,top.avatar.y));
            }else{
                let seat = this.table.seats[data.originSeat-1];
                startPoint = this.table.localToGlobal(new Laya.Point(seat.x ,seat.y));
            }
            if(Array.isArray(data.target)){
                data.target.forEach((item,index)=>{
                 let clip = new Laya.Clip(data.animation, 1, 7);
                    // let clip = new Laya.Clip('res/game/test.png', 1, 7);
                    clip.pivotX = clip.clipWidth * 0.5;
                    clip.pivotY = clip.clipHeight * 0.5;
                    clip.interval = 180;
                    clip.pos(startPoint.x, startPoint.y);
                    this.addChild(clip);
                    let targetSeat = this.table.seats[item-1];
                    let targetPoint = this.table.localToGlobal(new Laya.Point(targetSeat.x-50 ,targetSeat.y-60));
                    Laya.Tween.to(clip, {x:targetPoint.x + 16, y:targetPoint.y -10}, 1100, null, Laya.Handler.create(this,()=>{
                        this.timerOnce(clip.interval*clip.clipY, this, ()=>{
                            clip.dispose();
                        });
                        clip.play();
                    },null,false));
                });
            }
        }
        /**
         * 押注
         */
    seatBetCall(data){
            if(data.userId != GM.user_id){
                Com.Game.CoinCtrl.coinFly(data.seatId-1, data.areaId-1);
            }
            //更新金额
            this.table.setSeatAmount(data.seatId, data.leftAmount);
        }
        /**
         * 公告
         */
        notice(data){
            this.bottom.addChat(data, 3);
        }
    }
    Sail.class(GameScene, "Scene.Game");
}