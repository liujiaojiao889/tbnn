{   
    class CoinCtrl {
    }
    CoinCtrl.COIN_SIGN = 'coin'; 
    /**
     * 押注金币动画
     * @param startPos 座位索引,8为自己,9用户列表 
     * @param endPos   区域索引
     */
    CoinCtrl.coinFly = function(startPos, endPos, noAni, disappear){
        let table = tbnn.dom.table;
        let bottom = tbnn.dom.gameScene.bottom;
        let startPoint = null;
        if(startPos < 8){
            let seat = tbnn.dom.table.seats[startPos];
            startPoint = table.localToGlobal(new Laya.Point(seat.x ,seat.y));
        }else if(startPos == 8){
            startPoint = bottom.localToGlobal(new Laya.Point(bottom.avatar.x ,bottom.avatar.y));
        }else if(startPos == 9){
            startPoint = bottom.localToGlobal(new Laya.Point(bottom.userList.x ,bottom.userList.y));
        }
        let area = tbnn.dom.table.areas[endPos];
        let endPoint = table.localToGlobal(new Laya.Point(area.x + Math.random()*180 ,area.y + 40 + Math.random()*90));
        let coin = Laya.Pool.getItemByCreateFun(CoinCtrl.COIN_SIGN, ()=>{
            return new Laya.Image('res/game/coin.png');
        });
        if(!disappear){
            tbnn.dom.coins[endPos].push(coin);
            table.coinAmount[endPos+1] += 1;
        }
        tbnn.dom.gameScene.addChild(coin);
        coin.pos(startPoint.x, startPoint.y);
        let period = noAni ? 0 : 300;
        Laya.Tween.to(coin,{x:endPoint.x,y:endPoint.y}, period, null, Laya.Handler.create(this,()=>{
            if(disappear || tbnn.dom.coins[endPos].length>200){
                coin.removeSelf();
                Laya.Pool.recover(CoinCtrl.COIN_SIGN, coin);
            }
        }));
        if(!noAni){
            Laya.SoundManager.playSound('sound/coin.mp3');
        }
    }
    /**
     * 结算金币动画
     */
    CoinCtrl.coinsRecover = function(cardInfo){
        let gameScene = tbnn.dom.gameScene;
        let bankerPos = gameScene.top.localToGlobal(new Laya.Point(gameScene.top.avatar.x ,gameScene.top.avatar.y));
        let myPos = gameScene.bottom.localToGlobal(new Laya.Point(gameScene.bottom.avatar.x ,gameScene.bottom.avatar.y));
        for(let i = 0 ; i < 4 ; i++){
            let aimPos = null;
            let res = cardInfo[gameScene.orderList[i+1]].res;
            if('lose' == res){
                aimPos = bankerPos;
            }else if(tbnn.data.areasBetFlags[i]){
                aimPos = myPos;
            }
            if(aimPos){
                (function(aimPos){
                    let delay = 0;
                    tbnn.dom.coins[i].forEach((item)=>{
                        setTimeout(function() {
                            Laya.Tween.to(item, {x:aimPos.x,y:aimPos.y},300,null,Laya.Handler.create(this,()=>{
                                item.removeSelf();
                                Laya.Pool.recover(CoinCtrl.COIN_SIGN, item);
                            },null,false));  
                        }, delay);
                        delay+=5;
                    });
                })(aimPos);
            }
        }
    }

    Sail.class(CoinCtrl, 'Com.Game.CoinCtrl');
}