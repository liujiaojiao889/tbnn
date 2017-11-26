Sail.checkLogin = function () {
    if(!USER_LOGIN_STATUS){
        location.href = GM.userLoginUrl;
        return false;
    }
    return true;
}
Sail.onStart = function () {
    // Laya.DebugPanel.init() //Laya调试工具
    // Laya.Stat.show();

    // Laya.SoundManager.setMusicVolume(0.4);
    Laya.SoundManager.autoStopMusic = true;
    var voiceStatus =  Sail.Utils.localStore.get('sound');
    if(voiceStatus == "false"){
        Laya.SoundManager.soundMuted = true; 
        Laya.SoundManager.musicMuted = true;
        SOUNDSTATUS.CUR = SOUNDSTATUS.OFF;
    }else{
        SOUNDSTATUS.CUR = SOUNDSTATUS.ON;
    }
    Sail.keyboard = new Tools.KeyBoardNumber;
   
    Sail.io.init(IO_CONFIG,Sail.Error);
    Sail.director.runScene(new Scene.Start());
}
Sail.run(GAME_CONFIG);