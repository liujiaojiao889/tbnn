{
    let EVENT_CLICK = Laya.Event.CLICK;
    
    class Rank extends ui.hall.rankUI {
        constructor () {
            super();
            this.myRecod = [];
            this.tycoons = [];
            this.init();
        }

        init () {          
            Sail.io.register(GAME_CMDS.RANK, this,this.Updata);     
            Sail.io.emit(GAME_CMDS.RANK);
            this.rankTab.selectHandler = this.rankPage.setIndexHandler;
            this.yinList.array = [];    
            this.yinList.vScrollBarSkin = ''; 
            this.myRecord.vScrollBarSkin = ''; 
            this.myRecord.array = [];
           
            this.rankTab.on(EVENT_CLICK,this,function(){
                let index = this.rankTab.selectedIndex;
                if(index == 0){                  
                     Sail.io.emit(GAME_CMDS.RANK);
                     Laya.SoundManager.playSound("sound/btn.mp3");  
                }else{
                     
                     Sail.io.emit(GAME_CMDS.RANK);
                     Laya.SoundManager.playSound("sound/btn.mp3");  
                }

            });
          
        }
       
        Updata(data){ 
            this.tycoons = data.tycoons;
            this.myRecod = data.myRecod;
            if(this.rankTab.selectedIndex == 0){
                this.Rankdata();
            }else{
                this.rankcord();
            } 
        }
     
        Rankdata(){   
            this.loginbox.visible = false;      
            let tempList = [];       
            let list = this.tycoons;
            if(list.length==0){
                 this.rankNodata.visible = true;
            }else{
                 this.rankNodata.visible = false;
            }
            let iconindex; // rankbg
            let bgindex; //背景图
            let fontnum; // 字体 
            for(var i = 0;i<list.length; i++){
                if(i < 3 ){ 
                    iconindex = 'res/hall/numbg1.png';
                    fontnum = "rankNum";
                }else{                   
                    iconindex = 'res/hall/numbg.png';
                    fontnum = "rankN";
                }
                if(list[i].self == 1){
                    bgindex = 1;                        
                }else{
                    bgindex = 0;
                }
                tempList.push({
                    'allbg':bgindex,
                    'avtar':Sail.Utils.getAvatar(list[i].userId),
                    'userName':Sail.Utils.cutStr(list[i].userName,10),
                    'winAll':list[i].winAll,
                    'rankNum':{text:i+1,font:fontnum},
                    'rankbg':{skin:iconindex}
                })

            }
            
            this.yinList.array = tempList;    
        }

        rankcord(){
            if(GM.userLogged){
                let tempList = [];        
                let list = this.myRecod;
                if(list.length == 0){
                    this.rankNodata.visible = true;
                }else{
                    this.rankNodata.visible = false;
                    for(var i = 0;i<list.length; i++){

                        tempList.push({

                        'addTime':list[i].addTime,
                        'winAmount':list[i].winAmount

                        })
                    }
                    this.myRecord.array = tempList;
                
                }
               
            }else{
                this.loginbox.visible = true;
                this.login.on(EVENT_CLICK,this,() => {
                    if(!Sail.checkLogin()){return;} 
                })
            }
           

        }

        enter () {
            Laya.Tween.to(this, {y :Laya.stage.height / 4, alpha : 1}, 600, Laya.Ease.backOut, null, 500);
           
        }
        onResize (width, height) {  
          
            this.y = Laya.stage.height / 4;
            
        }
    }
    Sail.class(Rank, "Com.hall.rank");
}