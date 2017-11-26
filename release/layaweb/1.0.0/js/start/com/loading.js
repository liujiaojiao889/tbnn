{
    class Load extends ui.start.loadingUI {
        constructor () {
            super();
            this.init();
        }
        destroy  () {
            super.destroy.call(this, true);
           
        }
        init () {
            this.centerX = 0;
            this.bottom = 120;
            laya.tools.monitorBackground(function(){
                var _data = "当前网络不稳定！请刷新";
                Sail.director.popScene(new Alert.Message(_data,function(){ 
                    Sail.Utils.set_param('t', new Date().getTime());
                }));
                Sail.io.socket.end();
                laya.tools.monitorBackground(function(){});
            },4000)
            //资质信息
            if(laya.components && laya.components.Isbn){
                let isbn = new laya.components.Isbn();
                this.addChild(isbn);
            }
        }
        onProgress(percent){
           
            let x = 946 * percent;
            if(x > 946){
                x = 946;
            }
            this.progress.value = percent;
           
            this.percent.text = parseInt((percent*100))+'%';
        }
        load (res, callback) {
            Laya.loader.load(res, Laya.Handler.create(this, function () {
                callback();
            }, [callback]), new Laya.Handler(this, this.onProgress));
        }
    }
    
    Sail.class(Load, "Com.Start.Load");
}
 