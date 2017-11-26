{
    let EVENT_CLICK = Laya.Event.CLICK;
    let ALERT_CONFIG = {
        "closeOnSide" : true
    };
    let SOUND_INITED = false;


    class Set extends ui.alert.setUI {
        constructor () {
            super();    
            this.CONFIG = ALERT_CONFIG;
            this.soundstatus  = null;
           
            this.init();
        }

        init () { 
             // Laya 系统公告, 默认是隐藏的
            if(window.GM && GM.isCall_out === 1 && GM.noticeStatus_out){
                GM.noticeStatus_out(function(data){
                    data = data || {};
                    // 是否显示系统公告
                    if(data.isShowNotice){
                        // 显示系统公告按钮
                        this.btnNotice.visible = true;
                        // this.setbg.skin = "res/alert/setbg2.png";
                        this.setbg.height = 340;
                        this.line2.visible = true;
                    }

                    // 是否需要显示小红点
                    if(data.isShowRedPoint){
                        this.noticeDot.visible = true;
                    }
                }.bind(this));
            }
            this.btnNotice.on(EVENT_CLICK,this,function(){
                  if(window.GM && GM.noticePopShow_out){
                    Laya.SoundManager.playSound("sound/btn.mp3");
                    GM.noticePopShow_out();
                }  
                
            })
           var voiceStatus =  Sail.Utils.localStore.get('sound');
           if(voiceStatus=="false"){
                 this.btnSound.index = 0;
                 this.soundicon.index = 1;   
            }         
          
            this.top = 120;    
            this.right = (Laya.stage.width/750)*2+20;
            this.onclick();
           
           
        }

        initVoice () {            
            this.soundstatus = !!SOUNDSTATUS.CUR;
            if(this.soundstatus == true){
                 this.btnSound.index = 1;
                 this.soundicon.index = 0;   
            }else{
                 this.btnSound.index = 0;   //关
                 this.soundicon.index = 1;   
            }              
            if(SOUND_INITED == true){return;}
            SOUND_INITED = true;
            // 背景音乐  
            Laya.SoundManager.musicMuted = !this.soundstatus;
            // 音效
            Laya.SoundManager.soundMuted = !this.soundstatus;
        }

        setVoiceStatus  () {
            switch(SOUNDSTATUS.CUR){
                case SOUNDSTATUS.ON:
                    SOUNDSTATUS.CUR = SOUNDSTATUS.OFF;    
                    Laya.SoundManager.musicMuted = true;
                    Laya.SoundManager.soundMuted = true;
                    Sail.Utils.localStore.set('sound',false);    
                    break;
                case SOUNDSTATUS.OFF:
                    SOUNDSTATUS.CUR = SOUNDSTATUS.ON;
                    Laya.SoundManager.musicMuted = false;
                    Laya.SoundManager.soundMuted = false;                     
                    Sail.Utils.localStore.set('sound',true);          
                    break;
            }
            this.initVoice();
        } 
     
        onclick(){
            this.btnSound.on(Laya.Event.CLICK, this, function () {              
                // 0关 1开
                let index = this.btnSound.index; 
                    if(index == 0){   // 0关 
                        this.btnSound.index = 1;   
                        this.soundicon.index = 0;                                                 
                    }else{ //1开
                        this.btnSound.index = 0;  
                        this.soundicon.index = 1;                                             
                    }
                    this.setVoiceStatus();
                    Laya.SoundManager.playSound("sound/btn.mp3");
             });

            this.helpBtn.on(EVENT_CLICK, null, function () {
               Laya.SoundManager.playSound("sound/btn.mp3");             
               Sail.director.popScene(new Alert.help);  
            });
            
           

        }

        onResize (width, height) {
            this.size(width, height);
            
        }
        onexit(){
             
        }
    }
    Sail.class(Set, "Alert.Set");
}