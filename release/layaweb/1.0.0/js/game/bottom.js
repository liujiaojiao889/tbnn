{
    class BottomClass extends ui.game.bottomUI{
        constructor(){
            super();
            this.init();
        }

        init(){
            Sail.Utils.addBtnSound(this);
            this.chatList = [];
            this.chatHandler = null;
            this.scrollBox.scrollRect = new Laya.Rectangle(-784,0,784,100);
            // this.htmlContent.style.align = "left";
            this.htmlContent.style.valign = "top";
            this.htmlContent.style.fontSize = 30;
            this.htmlContent.style.color = '#ffffff';
            this.leftArrow.on(Laya.Event.CLICK, this, this.roll, [-1]);
            this.rightArrow.on(Laya.Event.CLICK, this, this.roll, [1]);
            this.chat.on(Laya.Event.CLICK, this, ()=>{
                Sail.director.popScene(new Alert.chat());
            });
            this.userList.on(Laya.Event.CLICK, this, ()=>{
                Sail.io.emit(GAME_CMDS.PLAYLIST);
            });
            this.plus.on(Laya.Event.CLICK, this, ()=>{
                Sail.director.popScene(new Alert.recharge);
            });
        }

        roll(value){
            this.chipList.tweenTo(this.chipList.startIndex+value, 200);
        }

        initList(chipsData, defaultChip){
            let previousChoice = null;
            let chipList = this.chipList;
            let dataArray = [];
            chipsData.forEach((item)=>{
                dataArray.push({amount:item});
            });
            chipList.repeatX = chipsData.length;
            chipList.hScrollBarSkin = '';
            chipList.selectEnable = true;
            chipList.array = dataArray;
            chipList.selectHandler = Laya.Handler.create(this,function(index){
                if(previousChoice) {
                    previousChoice.getChildByName('button').skin = 'res/game/button2.png';
                    previousChoice.getChildByName('amount').font = 'chip2';
                }
                let currentChoice = chipList.getCell(index);
                currentChoice.getChildByName('button').skin = 'res/game/button1.png';
                currentChoice.getChildByName('amount').font = 'chip1'; 
                previousChoice = currentChoice;
                tbnn.data.betAmount = chipList.getCell(index).value;
            },null,false);

            chipList.renderHandler = Laya.Handler.create(this,function(cell, index){
                let amountLabel = cell.getChildByName('amount');
                let data = cell.dataSource;
                cell.value = data.amount;
                amountLabel.changeText(Sail.Utils.modifyNumber(data.amount));
            },null,false); 
            chipList.selectedIndex = chipsData.indexOf(parseInt(defaultChip));
            tbnn.data.betAmount = parseInt(defaultChip);
            chipList.scrollTo(chipList.selectedIndex - 2);
        }

        addChat(data, type){
            if(this.chatList.length > 100){
                return; 
            }
            let text = '<span>【用户】' + data.userName + '说：';
            if(type == 1){
                text += data.content + '</span>';
            }else if(type == 2){
                text += '</span><img src="' + data.url + '" style="width:50px;height:50px;"/>';
            }else if(type == 3){
                text = data.content;
            }
            this.chatList.push(text); 
            this.chatList.length == 1 && this.sendChat(); 
        } 

        sendChat(){
            if(this.chatList.length == 0){
                return;
            }
            let content = this.chatList[0];
            this.chatBox.visible = true;
            this.scrollBox.scrollRect.x = -784;
            this.htmlContent.innerHTML = content;
            this.chatHandler = Laya.Handler.create(this.scrollBox.scrollRect, () => {
                this.chatList.shift();
                this.chatBox.visible = false;
                this.sendChat();
            });
            Laya.Tween.to(this.scrollBox.scrollRect, {x:784}, 11000, null, this.chatHandler);
        }

        setUserInfo(avatar, userName){
            this.avatar.skin = Sail.Utils.getAvatar(GM.user_id);
            this.userName.changeText(Sail.Utils.cutStr(userName,8));
        }

    }
    Sail.class(BottomClass, 'Com.Game.Bottom');
}