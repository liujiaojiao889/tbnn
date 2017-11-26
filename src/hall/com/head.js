{
    let EVENT_CLICK = Laya.Event.CLICK;
    
    class Header extends ui.hall.headUI {
        constructor () {
            super();
          
            this.init();
        }

        init () {
            this.login.visible = true;
            this.backbtn.visible = false;
            this.homebtn.visible = false;
            this.centerX = 0;
            this.y = -200;
            this.onclick();
          
        	let ACTIONS = {
                [GAME_CMDS.USE_INFO] : this.infoDetail,              
                [GAME_CMDS.USERDETAIL] : this.gaindata ,
                [GAME_CMDS.CHARGEIN]: this.updata,
                [GAME_CMDS.CHANGROUT]:this.changeout,
                [GAME_CMDS.USER_NAME]:this.userInfo
            };
            Sail.io.register(ACTIONS,this);
            Sail.io.emit(GAME_CMDS.USE_INFO);
           
          
        }
       
        infoDetail(data){
            if(GM.userLogged){
                this.login.visible = false;             
            }  
            this.balance.text = Sail.Utils.transferNumberToK(data.platformAmount); 
            this.gamecoin.text = Sail.Utils.transferNumberToK(data.gameAmount);
        }
        updata(data){
            var message = "带入游戏币成功";
            Sail.director.popScene(new Alert.Tip(message));
             if(data.promptMsg){
                 setTimeout(function() {
                    Sail.director.popScene(new Alert.propMsg(data.promptMsg.content));
                 }, 2000);
            }
            // if(data.promptMsg){
            //     Sail.director.popScene(new Alert.propMsg(data.promptMsg.content));
            // }
            this.balance.text = Sail.Utils.transferNumberToK(data.platformAmount); 
            this.gamecoin.text = Sail.Utils.transferNumberToK(data.gameAmount);

        }
        userInfo(data){
            if(GM.userLogged){
                this.userName.text = Sail.Utils.cutStr(data.userName,12);
                   
            }   
            this.avatar.skin = Sail.Utils.getAvatar(GM.user_id);      
        }
        changeout(data){
            Sail.director.popScene(new Alert.Tip('收获成功'));          
            this.balance.text = Sail.Utils.transferNumberToK(data.platformAmount); 
            this.gamecoin.text = Sail.Utils.transferNumberToK(data.gameAmount);

        }
        onclick(){
            // 是否显示返回按钮
            if (window.GM && GM.isCall_out === 1 && GM.isShowBtnBack_out && GM.btnBackCall_out) {
                this.backbtn.visible = true; // 显示返回按钮
                this.backbtn.on(EVENT_CLICK,this,function(){ 
                    Laya.SoundManager.playSound("sound/btn.mp3");   
                    GM.btnBackCall_out();              
                })
            };

            if(GM.backHomeUrl){          
                this.homebtn.visible = true; // 显示home按钮
                this.homebtn.on(EVENT_CLICK, this, function () {
                    Laya.SoundManager.playSound("sound/btn.mp3");
                    location.href = GM.backHomeUrl;
                });
            }
           //余额查询
            this.yubtn.on(EVENT_CLICK, this, function(){
                Laya.SoundManager.playSound("sound/btn.mp3");
                if(!Sail.checkLogin()){return;}
                if(window.GM && GM.isCall_out === 1 && GM.popBalanceShow_out){                                  
                    GM.popBalanceShow_out();
                }
            });
           
           
            this.setBtn.on(EVENT_CLICK,this,function(){  
                 Laya.SoundManager.playSound("sound/btn.mp3");                
                 Sail.director.popScene(new Alert.Set);
            });
            this.login.on(EVENT_CLICK,this,function(){
                location.href = GM.userLoginUrl;
                Laya.SoundManager.playSound("sound/btn.mp3");   
            });
            this.rechargebtn.on(EVENT_CLICK,this,function(){
                Laya.SoundManager.playSound("sound/btn.mp3");
                if(!Sail.checkLogin()){return;} ;  
                Sail.director.popScene(new Alert.recharge);
            });
            this.gain.on(EVENT_CLICK,this,function(){
               Laya.SoundManager.playSound("sound/btn.mp3");   
               if(!Sail.checkLogin()){return;} ;
                Sail.io.emit(GAME_CMDS.USERDETAIL);            
            })
         
        }
      
       gaindata(data){
           if(data.amount>0){             
                Sail.director.popScene(new Alert.gain(data));
           }else{
               Sail.director.popScene(new Alert.coinTip);
           }
           

       }
       
       enter () {
            Laya.Tween.to(this, {y :0, alpha : 1}, 600, null, null, 500);
           
           
        }
    }
    Sail.class(Header, "Com.hall.Header");
}