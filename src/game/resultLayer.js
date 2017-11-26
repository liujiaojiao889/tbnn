{
    class resultLayerClass extends ui.game.resultUI{
        constructor(data){
            super();
            this.CONFIG = {
            "autoClose" :  2000,
        };
            this.init(data);
        };
        init(data){
            Sail.Utils.addBtnSound(this);
            this.userList.renderHandler = Laya.Handler.create(this, (cell, index)=>{
                let data = cell.dataSource;
                cell.getChildByName('avatar').skin = Sail.Utils.getAvatar(data.userId);
                cell.getChildByName('amount').changeText(data.amount);
                cell.getChildByName('userName').changeText(Sail.Utils.cutStr(data.userName,8));
                cell.getChildByName('flag').skin = 'res/game/alert/' + index + '.png';
            }, null, false);
            this.loadData(data);
            this.closeBtn.alpha = this.continue.alpha = this.amount.alpha = this.avatar.alpha = 0;
            Laya.Tween.to(this.closeBtn, {alpha : 1}, 500, null, null, 400);
            Laya.Tween.to(this.continue, {alpha : 1}, 300, null, null, 1000);
            Laya.Tween.to(this.amount, {alpha : 1}, 300, null, null, 800);
            Laya.Tween.to(this.avatar, {alpha : 1}, 300, null, null, 450);
            Laya.Tween.from(this.closeBtn, {rotation:-30}, 500, Laya.Ease.backOut, null, 400);
            Laya.Tween.from(this.continue, {scaleX : 3, scaleY : 3}, 300, null, null, 1000);
            Laya.Tween.from(this.amount, {scaleX : 3, scaleY : 3}, 300, null, null, 800);
            Laya.Tween.from(this.avatar, {scaleX : 3, scaleY : 3}, 300, null, null, 450);
        }
        loadData(data){  
            let preFive = data.preFive;
            let myResult = data.myResult;
            if(myResult.ticketFlag == 1){
                this.ticket.visible = true;
                this.ticket.changeText('对局费：' + myResult.ticketAmount);
            }
            this.avatar.skin = Sail.Utils.getAvatar(GM.user_id);
            let amount = myResult.amount>0? '+'+myResult.amount : myResult.amount;
            this.amount.changeText(myResult.amount);
            this.userName.changeText(Sail.Utils.cutStr(myResult.userName,8));
            this.userList.array = data.preFive; 
            if(myResult.amount < 0){ 
                this.animation.play('lose');
                Laya.SoundManager.playSound('sound/lose.mp3');
            }else{
                 this.animation.play('win');
                 Laya.SoundManager.playSound('sound/win.mp3');
            }
        }
    }
    Sail.class(resultLayerClass,'Alert.ResultLayer');
}  