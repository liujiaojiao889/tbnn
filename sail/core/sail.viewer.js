;(function () {
    /**
     * 发布订阅模块构造函数
     */
    function Viewer() {
        this.topics = {};
    }

    Laya.class(Viewer, "Sail.Viewer");
    var _proto = Viewer.prototype;

    _proto._register = function (Event, caller, CallBack) {
        console.log("订阅事件：" + Event);

        if(!this.topics.hasOwnProperty(Event)){
            this.topics[Event] = [];
        }

        this.topics[Event].push({caller : caller, callback : CallBack});
    }
    _proto._unregister = function (Event, CallBack) {
        if(this.topics.hasOwnProperty(Event)){
            if(CallBack && typeof CallBack === "function"){
                var Events = this.topics[Event];
                
                for(var i = 0; i < this.topics[Event].length; i++){
                    if (Events[i].callback == CallBack){
                        Events.splice(i, 1);
                        console.log("删除订阅事件：" + Event + "中的事件：", CallBack);

                        return;
                    }
                }
            }else{
                delete this.topics[Event];
                console.log("删除订阅事件：" + Event);
            }
        }else{
            console.log(new Error("不存在的订阅名：" + Event));
        }
    }

    /**
     * 订阅事件
     * @param  {String}    Event    事件名
     * @param  {Object}    Caller   事件作用域
     * @param  {Function}  CallBack 事件回调函数
     * 
     * @return void
     */
    _proto.register = function (Event, Caller, CallBack) {
        if(typeof Event == "object"){
            for(var i in Event){
                this._register(i, Caller, Event[i]);
            }
        }else{
            this._register(Event, Caller, CallBack);
        }
    }

    /**
     * 取消订阅事件
     * @param  {String}    Event    事件名
     * @param  {Function}  CallBack 事件函数
     * 
     * @return void
     */
    _proto.unregister = function (Event, CallBack) {
        if(!Event){return;}
        if(typeof Event == "object"){
            for(var i in Event){
                this._unregister(i, Event[i]);
            }
        }else{
            this._unregister(Event, CallBack);
        }
    }

    /**
     * 发布订阅
     * @param  {String}    Event  事件名
     * @param  {...any}    args   参数列表
     * 
     * @return void
     */
    _proto.publish = function (Event, args) {
        var args = Array.prototype.slice.call(arguments);
        var Event = args.shift();
        
        if(this.topics.hasOwnProperty(Event)){
            var Events = this.topics[Event];

            for(var i in Events){
                var event = Events[i];

                if(typeof event.callback === "function"){
                    event.callback.apply(event.caller, args);
                }else{
                    console.log(new Error("订阅名：" + Event + "中注册了类型不正确的回调函数"));
                    console.log(Events);
                }
            }
        }else{
            console.log(new Error("不存在的订阅事件：" + Event));
        }
    }
})();