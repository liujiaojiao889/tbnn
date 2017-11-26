var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var cointipUI=(function(_super){
		function cointipUI(){
			
		    this.otherCoin=null;

			cointipUI.__super.call(this);
		}

		CLASS$(cointipUI,'ui.alert.cointipUI',_super);
		var __proto__=cointipUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(cointipUI.uiView);
		}
		cointipUI.uiView={"type":"Dialog","props":{"width":426,"height":237},"child":[{"type":"Image","props":{"y":0,"x":0,"width":426,"skin":"res/alert/publicbg.png","height":237}},{"type":"Label","props":{"y":69,"x":59,"width":308,"text":"当前没有可收获的游戏币","height":40,"fontSize":28,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}},{"type":"Image","props":{"y":169,"x":127,"var":"otherCoin","skin":"res/alert/cointext.png"}}]};
		return cointipUI;
	})(Dialog);
var dragInUI=(function(_super){
		function dragInUI(){
			
		    this.goon=null;
		    this.closeBtn=null;
		    this.balance=null;
		    this.coin=null;

			dragInUI.__super.call(this);
		}

		CLASS$(dragInUI,'ui.alert.dragInUI',_super);
		var __proto__=dragInUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(dragInUI.uiView);
		}
		dragInUI.uiView={"type":"Dialog","props":{"width":800,"height":568},"child":[{"type":"Image","props":{"y":26,"x":6,"width":760,"skin":"res/alert/commbg.png","height":555}},{"type":"Image","props":{"y":449,"x":256,"var":"goon","skin":"res/alert/handbtn.png"}},{"type":"Image","props":{"y":39,"x":700,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Image","props":{"y":0,"x":218,"skin":"res/alert/draghead.png"}},{"type":"Label","props":{"y":123,"x":246,"width":155,"text":"当前余额：","height":45,"fontSize":31,"font":"Microsoft YaHei","color":"#ffdb5d"}},{"type":"Label","props":{"y":121,"x":410,"width":221,"var":"balance","text":"0","height":35,"fontSize":31,"font":"Arial","color":"#ffdb5d"}},{"type":"Label","props":{"y":210,"x":100,"width":313,"text":"请输入要带入的游戏币","height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#faecc5"}},{"type":"Image","props":{"y":193,"x":414,"skin":"res/alert/box2.png"}},{"type":"Label","props":{"y":191,"x":414,"width":269,"var":"coin","valign":"middle","text":"0","height":59,"fontSize":31,"font":"Arial","color":"#ffdb5d","align":"center"}},{"type":"Label","props":{"y":262,"x":412,"width":273,"text":"*请输入大于0的数字","height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#ffb24e"}},{"type":"Label","props":{"y":367,"x":118,"width":533,"text":"带入的游戏币不能大于余额或小于等于0","height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#e28500"}}]};
		return dragInUI;
	})(Dialog);
var gainUI=(function(_super){
		function gainUI(){
			
		    this.sureBtn=null;
		    this.gother=null;
		    this.gameCoin=null;
		    this.closeBtn=null;
		    this.textBox=null;

			gainUI.__super.call(this);
		}

		CLASS$(gainUI,'ui.alert.gainUI',_super);
		var __proto__=gainUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gainUI.uiView);
		}
		gainUI.uiView={"type":"Dialog","props":{"width":0,"height":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/alert/shouhuo.png"}},{"type":"Image","props":{"y":113,"x":83,"skin":"res/alert/kuang.png"}},{"type":"Image","props":{"y":418,"x":241,"var":"sureBtn","skin":"res/alert/sure.png"}},{"type":"Image","props":{"y":398,"x":157,"skin":"res/alert/xian.png"}},{"type":"Label","props":{"y":117,"x":188,"width":167,"valign":"middle","text":"您的游戏币：","height":61,"fontSize":31,"font":"Arial","color":"#ffc000","align":"center"}},{"type":"Label","props":{"y":497,"x":269,"width":202,"var":"gother","valign":"middle","underline":true,"text":"查看别处游戏币","height":35,"fontSize":28,"font":"Arial","color":"#faecc5"}},{"type":"Label","props":{"y":117,"x":357,"width":188,"var":"gameCoin","valign":"middle","text":"900000000","height":61,"fontSize":31,"font":"Arial","color":"#ffc000","align":"center"}},{"type":"Image","props":{"y":40,"x":690,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Box","props":{"width":425,"var":"textBox","height":210,"centerY":0,"centerX":0}}]};
		return gainUI;
	})(Dialog);
var helpUI=(function(_super){
		function helpUI(){
			
		    this.helpWarp=null;
		    this.helpList=null;
		    this.bomb=null;
		    this.wu_hua=null;
		    this.si_hua=null;
		    this.niu_niu=null;
		    this.niu_ba=null;
		    this.niu_yi=null;
		    this.niu_lin=null;
		    this.gogame=null;
		    this.closeBtn=null;

			helpUI.__super.call(this);
		}

		CLASS$(helpUI,'ui.alert.helpUI',_super);
		var __proto__=helpUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(helpUI.uiView);
		}
		helpUI.uiView={"type":"Dialog","props":{"width":1050,"height":677},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1000,"skin":"res/alert/helpbg.png","height":677}},{"type":"Box","props":{"y":81,"x":51,"var":"helpWarp"},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"con"},"child":[{"type":"ViewStack","props":{"y":-5,"x":0,"width":902,"var":"helpList","selectedIndex":3,"name":"list","height":460},"child":[{"type":"Box","props":{"y":0,"x":0,"width":900,"name":"item0","height":473},"child":[{"type":"Image","props":{"width":900,"skin":"res/alert/help1.png","name":"Img","height":473}}]},{"type":"Box","props":{"y":0,"x":0,"width":900,"name":"item1","height":473},"child":[{"type":"Image","props":{"y":0,"x":3,"width":900,"skin":"res/alert/help2.png","name":"Img","height":473}}]},{"type":"Box","props":{"y":6,"x":1,"name":"item2"},"child":[{"type":"Image","props":{"y":-2,"x":5,"width":900,"skin":"res/alert/help3.png","name":"Img","height":473}}]},{"type":"Box","props":{"y":-3,"x":-1,"name":"item3"},"child":[{"type":"Image","props":{"y":-1,"x":-22,"skin":"res/alert/help4.png","name":"Img"},"child":[{"type":"Label","props":{"y":120,"x":550.2307692307693,"width":63,"var":"bomb","text":"5倍","pivotY":17.30769230769232,"pivotX":19.23076923076924,"height":37,"fontSize":24,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":172,"x":550.2307692307693,"width":63,"var":"wu_hua","text":"5倍","pivotY":17.30769230769232,"pivotX":19.23076923076924,"height":37,"fontSize":24,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":225,"x":550.2307692307693,"width":63,"var":"si_hua","text":"5倍","pivotY":17.30769230769232,"pivotX":19.23076923076924,"height":37,"fontSize":24,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":277,"x":550.2307692307693,"width":63,"var":"niu_niu","text":"5倍","pivotY":17.30769230769232,"pivotX":19.23076923076924,"height":37,"fontSize":24,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":329,"x":550.2307692307693,"width":63,"var":"niu_ba","text":"5倍","pivotY":17.30769230769232,"pivotX":19.23076923076924,"height":37,"fontSize":24,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":382,"x":550.2307692307693,"width":63,"var":"niu_yi","text":"5倍","pivotY":17.30769230769232,"pivotX":19.23076923076924,"height":37,"fontSize":24,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":434,"x":550.2307692307693,"width":63,"var":"niu_lin","text":"5倍","pivotY":17.30769230769232,"pivotX":19.23076923076924,"height":37,"fontSize":24,"font":"Arial","color":"#faecc5","align":"center"}}]}]}]}]},{"type":"Tab","props":{"y":448,"x":347,"width":210,"selectedIndex":0,"name":"pagination","height":30},"child":[{"type":"Button","props":{"y":0,"x":0,"width":18,"stateNum":"2","skin":"res/alert/point.png","name":"item0","height":18}},{"type":"Button","props":{"y":0,"x":59,"width":18,"stateNum":"2","skin":"res/alert/point.png","name":"item1","height":18}},{"type":"Button","props":{"y":0,"x":118,"width":18,"stateNum":"2","skin":"res/alert/point.png","name":"item2","height":18}},{"type":"Button","props":{"y":0,"x":177,"width":18,"stateNum":"2","skin":"res/alert/point.png","name":"item3","height":18}}]}]},{"type":"Image","props":{"y":566,"x":373,"var":"gogame","skin":"res/alert/gogame.png"}},{"type":"Image","props":{"y":41,"x":933,"var":"closeBtn","skin":"res/alert/close.png"}}]};
		return helpUI;
	})(Dialog);
var hisrecordUI=(function(_super){
		function hisrecordUI(){
			
		    this.closeBtn=null;
		    this.new=null;
		    this.hisCard=null;
		    this.noRecord=null;

			hisrecordUI.__super.call(this);
		}

		CLASS$(hisrecordUI,'ui.alert.hisrecordUI',_super);
		var __proto__=hisrecordUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(hisrecordUI.uiView);
		}
		hisrecordUI.uiView={"type":"Dialog","props":{"width":980,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"width":950,"skin":"res/alert/his.png","height":638}},{"type":"Image","props":{"y":38,"x":882,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Image","props":{"y":281,"x":67,"skin":"res/alert/di.png"}},{"type":"Image","props":{"y":134,"x":800,"width":18,"skin":"res/alert/po1.png","pivotY":-6.25,"pivotX":-6.25,"name":"green","height":18}},{"type":"Image","props":{"y":83,"x":751,"var":"new","skin":"res/alert/new.png"}},{"type":"Image","props":{"y":177,"x":67,"skin":"res/alert/shun.png"}},{"type":"Image","props":{"y":385,"x":67,"skin":"res/alert/tian.png"}},{"type":"Image","props":{"y":489,"x":67,"skin":"res/alert/xuan.png"}},{"type":"List","props":{"y":161,"x":129,"width":718,"var":"hisCard","repeatX":10,"height":389},"child":[{"type":"Box","props":{"y":0,"x":9,"width":71,"name":"render","height":389},"child":[{"type":"Clip","props":{"y":6,"x":2,"width":68,"skin":"res/alert/clip_wl.png","name":"item0","index":0,"height":66,"clipY":2}},{"type":"Clip","props":{"y":107,"x":2,"skin":"res/alert/clip_wl.png","name":"item1","index":0,"clipY":2}},{"type":"Clip","props":{"y":213,"x":2,"skin":"res/alert/clip_wl.png","name":"item2","index":0,"clipY":2}},{"type":"Clip","props":{"y":318,"x":2,"skin":"res/alert/clip_wl.png","name":"item3","index":0,"clipY":2}}]}]},{"type":"Label","props":{"y":287,"x":285,"width":396,"visible":false,"var":"noRecord","text":"暂无胜负记录，请玩游戏吧！","height":42,"fontSize":30,"font":"Microsoft YaHei","color":"#ffe2e2"}}]};
		return hisrecordUI;
	})(Dialog);
var lookUI=(function(_super){
		function lookUI(){
			
		    this.chattab=null;
		    this.chatpage=null;
		    this.chatList=null;
		    this.lookList=null;
		    this.closeBtn=null;

			lookUI.__super.call(this);
		}

		CLASS$(lookUI,'ui.alert.lookUI',_super);
		var __proto__=lookUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(lookUI.uiView);
		}
		lookUI.uiView={"type":"Dialog","props":{"width":960,"height":630},"child":[{"type":"Image","props":{"y":37,"x":0,"width":930,"skin":"res/alert/lookbg.png","height":592}},{"type":"Tab","props":{"y":12,"x":162,"var":"chattab","selectedIndex":0},"child":[{"type":"Button","props":{"y":3,"x":7,"width":300,"stateNum":"2","skin":"res/alert/clip_chat0.png","name":"item0","height":84}},{"type":"Button","props":{"y":3,"x":296,"width":300,"stateNum":"2","skin":"res/alert/clip_chat.png","name":"item1","height":84}}]},{"type":"ViewStack","props":{"y":110,"x":37,"width":849,"var":"chatpage","selectedIndex":0,"height":456},"child":[{"type":"Box","props":{"y":14,"x":9,"width":829,"name":"item0","height":427},"child":[{"type":"List","props":{"y":-7,"x":103,"width":654,"var":"chatList","selectEnable":true,"mouseEnabled":true,"height":435},"child":[{"type":"Box","props":{"y":0,"x":0,"width":654,"name":"render","height":40},"child":[{"type":"Image","props":{"y":0,"x":0,"width":654,"skin":"res/alert/chatbg.png","name":"chatbg","height":38}},{"type":"Label","props":{"y":2,"x":0,"width":650,"text":"很高兴能和大家一起牛牛！ ","name":"chat","height":34,"fontSize":26,"font":"Microsoft YaHei","color":"#f7f2cc","align":"center"}}]}]}]},{"type":"Box","props":{"y":20,"x":180,"name":"item1"},"child":[{"type":"List","props":{"y":-13,"x":-66,"width":650,"var":"lookList","spaceY":10,"spaceX":55,"selectEnable":true,"repeatY":3,"repeatX":3,"mouseEnabled":true,"height":442},"child":[{"type":"Box","props":{"y":14,"x":65,"width":133,"name":"render","height":130},"child":[{"type":"Image","props":{"y":-7,"x":-4,"width":137,"skin":"res/alert/facebg1.png","name":"select","height":137}},{"type":"Image","props":{"y":0,"x":0,"width":130,"skin":"res/alert/facebg.png","height":130}},{"type":"Image","props":{"y":1,"x":1,"width":128,"name":"img","height":128}}]}]}]},{"type":"Image","props":{"y":-70,"x":817,"var":"closeBtn","skin":"res/alert/close.png"}}]}]};
		return lookUI;
	})(Dialog);
var playlistUI=(function(_super){
		function playlistUI(){
			
		    this.closeBtn=null;
		    this.noRecord=null;
		    this.playList=null;
		    this.allNum=null;

			playlistUI.__super.call(this);
		}

		CLASS$(playlistUI,'ui.alert.playlistUI',_super);
		var __proto__=playlistUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(playlistUI.uiView);
		}
		playlistUI.uiView={"type":"Dialog","props":{"width":530,"height":509},"child":[{"type":"Image","props":{"y":0,"x":0,"width":488,"skin":"res/alert/playbg.png","height":509}},{"type":"Image","props":{"y":-7,"x":437,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Label","props":{"y":229,"x":110,"width":309,"visible":false,"var":"noRecord","text":"暂无记录，赶快去游戏吧","height":50,"fontSize":28,"font":"Microsoft YaHei","color":"#ffdb4b"}},{"type":"Image","props":{"y":18,"x":170,"skin":"res/alert/playt.png"}},{"type":"Label","props":{"y":68,"x":75,"width":53,"text":"排序","height":31,"fontSize":23,"font":"Microsoft YaHei","color":"#ffdb4b"}},{"type":"Label","props":{"y":68,"x":170,"width":53,"text":"用户","height":31,"fontSize":23,"font":"Microsoft YaHei","color":"#ffdb4b"}},{"type":"Label","props":{"y":68,"x":322,"width":53,"text":"余额","height":31,"fontSize":23,"font":"Microsoft YaHei","color":"#ffdb4b"}},{"type":"List","props":{"y":106,"x":51,"width":386,"var":"playList","spaceY":10,"height":318},"child":[{"type":"Box","props":{"y":0,"x":7,"width":360,"name":"render","height":26},"child":[{"type":"Label","props":{"y":0,"x":6,"width":47,"text":"1","name":"rank","height":26,"fontSize":22,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":-2,"x":69,"width":119,"text":"胜利的曙光","name":"userName","height":26,"fontSize":22,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":-1,"x":212,"width":152,"text":"10000000000","name":"amount","height":26,"fontSize":22,"font":"Arial","color":"#faecc5","align":"center"}}]}]},{"type":"Label","props":{"y":449,"x":183,"width":77,"text":"总人数:","height":31,"fontSize":22,"font":"Arial","color":"#faecc5"}},{"type":"Label","props":{"y":449,"x":257,"width":53,"var":"allNum","text":"100","height":31,"fontSize":22,"font":"Arial","color":"#faecc5"}}]};
		return playlistUI;
	})(Dialog);
var poolUI=(function(_super){
		function poolUI(){
			
		    this.poolList=null;
		    this.prizeList=null;
		    this.closeBtn=null;
		    this.poolAmount=null;
		    this.quesBtn=null;

			poolUI.__super.call(this);
		}

		CLASS$(poolUI,'ui.alert.poolUI',_super);
		var __proto__=poolUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(poolUI.uiView);
		}
		poolUI.uiView={"type":"Dialog","props":{"width":800,"height":730},"child":[{"type":"Image","props":{"y":0,"x":0,"width":756,"skin":"res/alert/pool.png","height":725}},{"type":"Box","props":{"y":141,"x":111},"child":[{"type":"Image","props":{"y":1,"x":80,"skin":"res/alert/pooln.png"}},{"type":"Label","props":{"y":3,"x":102,"width":352,"text":"开牌牌型及开奖比例","height":33,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":55,"x":0,"width":153,"text":"开牌类型","height":33,"fontSize":26,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":107,"x":0,"width":153,"text":"开牌奖励","height":33,"fontSize":26,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}},{"type":"List","props":{"y":55,"x":174,"width":350,"var":"poolList","spaceX":15,"repeatX":3,"height":85},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Label","props":{"width":105,"text":"四炸","name":"card_type","height":35,"fontSize":26,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":50,"width":105,"text":"40%","name":"percent","height":35,"fontSize":26,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}}]}]}]},{"type":"Box","props":{"y":338,"x":88},"child":[{"type":"Image","props":{"x":86,"skin":"res/alert/pooln.png"}},{"type":"Label","props":{"y":1,"x":101,"width":352,"text":"大奖得主","height":33,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}},{"type":"List","props":{"y":48,"x":0,"width":590,"var":"prizeList","spaceY":2,"height":272},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Image","props":{"skin":"res/alert/tiao2.png","name":"bg"}},{"type":"Image","props":{"y":6,"x":9,"width":81,"name":"userAvater","height":81}},{"type":"Label","props":{"y":25,"x":124,"width":128,"text":"大奖得主","name":"username","height":33,"fontSize":24,"font":"Microsoft YaHei","color":"#593821","align":"center"}},{"type":"Image","props":{"y":24,"x":320,"skin":"res/alert/coin.png"}},{"type":"Label","props":{"y":23,"x":360,"width":110,"text":"12000","name":"userAmount","height":33,"fontSize":34,"font":"Arial","color":"#dd3503","bold":true,"align":"center"}}]}]}]},{"type":"Image","props":{"y":85,"x":693,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Label","props":{"y":76,"x":359,"width":109,"var":"poolAmount","text":"0","height":30,"fontSize":30,"font":"Arial","color":"#c31e1e","bold":true,"align":"center"}},{"type":"Image","props":{"y":143,"x":61,"var":"quesBtn","skin":"res/alert/ru.png"}}]};
		return poolUI;
	})(Dialog);
var prizeUI=(function(_super){
		function prizeUI(){
			
		    this.prizesk=null;
		    this.closeBtn=null;
		    this.textBox=null;

			prizeUI.__super.call(this);
		}

		CLASS$(prizeUI,'ui.alert.prizeUI',_super);
		var __proto__=prizeUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(prizeUI.uiView);
		}
		prizeUI.uiView={"type":"Dialog","props":{"width":720,"height":450},"child":[{"type":"Box","props":{"y":0,"x":0,"width":720,"height":420,"anchorY":0,"anchorX":0},"child":[{"type":"SkeletonPlayer","props":{"y":200,"x":360,"var":"prizesk","url":"res/dragon/prize.sk"}}]},{"type":"Image","props":{"y":12,"x":635,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Box","props":{"width":600,"var":"textBox","height":300,"centerY":50,"centerX":0}}]};
		return prizeUI;
	})(Dialog);
var propUI=(function(_super){
		function propUI(){
			
		    this.closeBtn=null;
		    this.allselect=null;
		    this.select=null;
		    this.avater=null;
		    this.amount=null;
		    this.userName=null;
		    this.haveseat=null;
		    this.propList=null;
		    this.noRecord=null;

			propUI.__super.call(this);
		}

		CLASS$(propUI,'ui.alert.propUI',_super);
		var __proto__=propUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(propUI.uiView);
		}
		propUI.uiView={"type":"Dialog","props":{"width":930,"height":462},"child":[{"type":"Image","props":{"y":0,"x":2,"width":863,"skin":"res/alert/propbg.png","height":470}},{"type":"Image","props":{"y":12,"x":823,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Image","props":{"y":380,"x":301,"var":"allselect","skin":"res/alert/cheak0.png"}},{"type":"Image","props":{"y":378,"x":298,"visible":false,"var":"select","skin":"res/alert/right.png"}},{"type":"Label","props":{"y":402,"x":381,"width":187,"text":"全桌玩家使用","height":36,"fontSize":30,"font":"Arial","color":"#f7e98a","bold":true}},{"type":"Box","props":{"y":43,"x":201},"child":[{"type":"Image","props":{"width":277,"skin":"res/alert/play.png","height":118}},{"type":"Image","props":{"y":9,"x":9,"width":100,"var":"avater","height":100}},{"type":"Label","props":{"y":99,"x":203,"width":113,"var":"amount","text":"1000000","pivotY":31.578947368421055,"pivotX":51.31578947368422,"height":34,"fontSize":24,"font":"Arial","color":"#80442c"}},{"type":"Label","props":{"y":50,"x":172,"width":112,"var":"userName","text":"哆啦A梦","pivotY":31.578947368421055,"pivotX":51.31578947368422,"height":34,"fontSize":24,"font":"Microsoft YaHei","color":"#80442c"}},{"type":"Image","props":{"y":29,"x":325,"var":"haveseat","skin":"res/alert/haveseat.png"}},{"type":"Image","props":{"y":64,"x":119,"skin":"res/alert/coin.png"}}]},{"type":"Panel","props":{"y":168,"x":43,"width":782,"var":"propList","height":210}},{"type":"Label","props":{"y":243,"x":265,"width":335,"visible":false,"var":"noRecord","text":"暂无道具，请玩游戏吧！","height":53,"fontSize":30,"font":"Microsoft YaHei","color":"#f7e98a"}}]};
		return propUI;
	})(Dialog);
var propMsgUI=(function(_super){
		function propMsgUI(){
			
		    this.closeBtn=null;
		    this.prompMsg=null;
		    this.surebtn=null;
		    this.tips=null;

			propMsgUI.__super.call(this);
		}

		CLASS$(propMsgUI,'ui.alert.propMsgUI',_super);
		var __proto__=propMsgUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(propMsgUI.uiView);
		}
		propMsgUI.uiView={"type":"Dialog","props":{"width":770,"height":488},"child":[{"type":"Image","props":{"y":10,"x":10,"width":756,"skin":"res/alert/commbg.png","height":488}},{"type":"Button","props":{"y":19,"x":695,"var":"closeBtn","stateNum":"1","skin":"res/alert/close.png","name":"close"}},{"type":"Label","props":{"y":150,"x":193,"wordWrap":true,"width":366,"var":"prompMsg","height":40,"fontSize":31,"color":"#faecc5","align":"center"}},{"type":"Button","props":{"y":375,"x":249,"var":"surebtn","stateNum":"1","skin":"res/alert/sure.png"}},{"type":"CheckBox","props":{"y":279,"x":244,"width":263,"visible":true,"var":"tips","stateNum":"2","skin":"res/game/alert/check1.png","labelSize":28,"labelPadding":"15,0,0,10","labelColors":"#faecc5","label":"以后不再提示","height":61}}]};
		return propMsgUI;
	})(Dialog);
var propUserUI=(function(_super){
		function propUserUI(){
			
		    this.propbg=null;
		    this.animation=null;
		    this.price=null;

			propUserUI.__super.call(this);
		}

		CLASS$(propUserUI,'ui.alert.propUserUI',_super);
		var __proto__=propUserUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(propUserUI.uiView);
		}
		propUserUI.uiView={"type":"View","props":{"width":150,"height":210},"child":[{"type":"Box","props":{"y":0,"x":0,"width":150,"height":210},"child":[{"type":"Clip","props":{"y":-4,"x":-7,"width":166,"var":"propbg","skin":"res/alert/clip_prop.png","index":0,"height":227,"clipY":2}},{"type":"Image","props":{"y":45,"x":32,"width":106,"var":"animation","scaleY":0.8,"scaleX":0.8,"height":97}},{"type":"Label","props":{"y":155,"x":33,"width":81,"var":"price","text":"200","height":34,"fontSize":30,"font":"Arial","color":"#ffffff","align":"center"}}]}]};
		return propUserUI;
	})(View);
var publicUI=(function(_super){
		function publicUI(){
			
		    this.otherCoin=null;

			publicUI.__super.call(this);
		}

		CLASS$(publicUI,'ui.alert.publicUI',_super);
		var __proto__=publicUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(publicUI.uiView);
		}
		publicUI.uiView={"type":"Dialog","props":{"width":426,"height":237},"child":[{"type":"Image","props":{"y":0,"x":0,"width":426,"skin":"res/alert/publicbg.png","height":237}},{"type":"Label","props":{"y":69,"x":59,"width":308,"text":"当前没有可收获的游戏币","height":40,"fontSize":28,"font":"Microsoft YaHei","color":"#faecc5","align":"center"}},{"type":"Image","props":{"y":169,"x":127,"var":"otherCoin","skin":"res/alert/cointext.png"}}]};
		return publicUI;
	})(Dialog);
var rechargeUI=(function(_super){
		function rechargeUI(){
			
		    this.closeBtn=null;
		    this.rechargeBtn=null;
		    this.rechargeTab=null;
		    this.rechageNum=null;

			rechargeUI.__super.call(this);
		}

		CLASS$(rechargeUI,'ui.alert.rechargeUI',_super);
		var __proto__=rechargeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(rechargeUI.uiView);
		}
		rechargeUI.uiView={"type":"Dialog","props":{"width":790,"height":555},"child":[{"type":"Image","props":{"y":0,"x":7,"width":760,"skin":"res/alert/commbg.png","height":555}},{"type":"Label","props":{"y":84,"x":78,"width":551,"text":"钻石充值(1元=1钻石=500欢乐豆)","height":48,"fontSize":36,"font":"Microsoft YaHei","color":"#faecc5"}},{"type":"Image","props":{"y":16,"x":696,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Image","props":{"y":422,"x":253,"var":"rechargeBtn","skin":"res/alert/rechargebtn.png"}},{"type":"Tab","props":{"y":159,"x":73,"var":"rechargeTab","mouseEnabled":true},"child":[{"type":"Button","props":{"width":155,"stateNum":"2","skin":"res/alert/clip_re.png","name":"item0","height":95},"child":[{"type":"Label","props":{"y":30,"x":10,"width":132,"text":"10","name":"value","mouseThrough":true,"height":43,"fontSize":36,"font":"Arial","color":"#faedc3","align":"center"}}]},{"type":"Button","props":{"x":158,"width":156,"stateNum":"2","skin":"res/alert/clip_re.png","name":"item1","height":95},"child":[{"type":"Label","props":{"y":30,"x":6,"width":137,"text":"50","name":"value","mouseThrough":true,"height":43,"fontSize":36,"font":"Arial","color":"#faedc3","align":"center"}}]},{"type":"Button","props":{"x":317,"width":155,"stateNum":"2","skin":"res/alert/clip_re.png","name":"item2","height":95},"child":[{"type":"Label","props":{"y":30,"x":7,"width":137,"text":"100","name":"value","mouseThrough":true,"height":43,"fontSize":36,"font":"Arial","color":"#faedc3","align":"center"}}]},{"type":"Button","props":{"x":475,"width":155,"stateNum":"2","skin":"res/alert/clip_re.png","name":"item3","height":95},"child":[{"type":"Label","props":{"y":30,"x":8,"width":137,"text":"500","name":"value","mouseThrough":true,"height":43,"fontSize":36,"font":"Arial","color":"#faedc3","align":"center"}}]}]},{"type":"Image","props":{"y":273,"x":86,"width":607,"skin":"res/alert/re.png","height":77}},{"type":"Label","props":{"y":279,"x":109,"width":574,"var":"rechageNum","valign":"middle","text":" 请输入大于零的整数","height":73,"fontSize":36,"font":"Arial","color":"#faecc5"}},{"type":"Label","props":{"y":356,"x":166,"width":439,"text":"充值钻石成功后将为您自动兑换为欢乐豆","height":32,"fontSize":24,"font":"Microsoft YaHei","color":"#d96b00"}}]};
		return rechargeUI;
	})(Dialog);
var rulesUI=(function(_super){
		function rulesUI(){
			
		    this.closeBtn=null;

			rulesUI.__super.call(this);
		}

		CLASS$(rulesUI,'ui.alert.rulesUI',_super);
		var __proto__=rulesUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(rulesUI.uiView);
		}
		rulesUI.uiView={"type":"Dialog","props":{"width":790,"height":600},"child":[{"type":"Image","props":{"y":26,"x":0,"width":756,"skin":"res/alert/commbg.png","height":568}},{"type":"Image","props":{"y":41,"x":693,"var":"closeBtn","skin":"res/alert/close.png"}},{"type":"Image","props":{"y":-2,"x":212,"skin":"res/alert/ruleh.png"}},{"type":"Box","props":{"y":106,"x":98},"child":[{"type":"Image","props":{"y":1,"skin":"res/alert/ruless.png"}},{"type":"Label","props":{"width":95,"text":"开奖","height":33,"fontSize":26,"font":"Microsoft YaHei","color":"#e8d8ba","align":"center"}},{"type":"Label","props":{"y":47,"x":6,"width":556,"text":"牌局开出：炸弹，五花牛或四花牛，并且奖池金额","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5"}},{"type":"Image","props":{"y":122,"skin":"res/alert/ruless.png"}},{"type":"Label","props":{"y":122,"width":95,"text":"中奖","height":33,"fontSize":26,"font":"Microsoft YaHei","color":"#e8d8ba","align":"center"}},{"type":"Label","props":{"y":81,"x":6,"width":556,"text":"奖池开奖。","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5"}},{"type":"Label","props":{"y":167,"x":6,"width":556,"text":"在开出中奖牌型的门投币的玩家，根据投币金额平分","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5"}},{"type":"Label","props":{"y":201,"x":6,"width":556,"text":"对应比例的奖金。操盘手开出中奖牌型，分得牌型对","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5"}},{"type":"Label","props":{"y":235,"x":6,"width":556,"text":"应比例的奖金。同时开出多个中奖牌型，根据发牌顺","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5"}},{"type":"Label","props":{"y":269,"x":6,"width":556,"text":"发序分奖。","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#faecc5"}}]}]};
		return rulesUI;
	})(Dialog);
var setUI=(function(_super){
		function setUI(){
			
		    this.setbg=null;
		    this.soundicon=null;
		    this.btnSound=null;
		    this.btnNotice=null;
		    this.noticeDot=null;
		    this.helpBtn=null;
		    this.line2=null;

			setUI.__super.call(this);
		}

		CLASS$(setUI,'ui.alert.setUI',_super);
		var __proto__=setUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(setUI.uiView);
		}
		setUI.uiView={"type":"Dialog","props":{"width":292,"height":332},"child":[{"type":"Image","props":{"y":0,"x":0,"width":282,"var":"setbg","skin":"res/alert/setbg.png","sizeGrid":"30,30,30,30","height":230}},{"type":"Clip","props":{"y":42,"x":39,"var":"soundicon","skin":"res/alert/clip_sound.png","index":0,"clipY":2}},{"type":"Clip","props":{"y":51,"x":126,"width":122,"var":"btnSound","skin":"res/alert/clip_off.png","index":1,"height":45,"clipY":2}},{"type":"Button","props":{"y":237,"x":28,"width":247,"visible":false,"var":"btnNotice","height":72},"child":[{"type":"Image","props":{"y":23,"x":110,"skin":"res/alert/noti.png"}},{"type":"Image","props":{"y":3,"x":9,"width":70,"skin":"res/alert/notice.png","height":70}},{"type":"Image","props":{"y":8,"x":58,"width":24,"visible":false,"var":"noticeDot","skin":"res/alert/dian.png","height":25}}]},{"type":"Button","props":{"y":135,"x":28,"width":247,"var":"helpBtn","height":72},"child":[{"type":"Image","props":{"y":18,"x":110,"width":79,"skin":"res/alert/helptitle.png","height":38}},{"type":"Image","props":{"y":1.0000000000000284,"x":9,"width":70,"skin":"res/alert/ques.png","height":70}}]},{"type":"Image","props":{"y":122,"x":25,"skin":"res/alert/lin.png"}},{"type":"Image","props":{"y":223,"x":31,"width":231,"visible":false,"var":"line2","skin":"res/alert/lin.png","height":3}}]};
		return setUI;
	})(Dialog);
var tipsUI=(function(_super){
		function tipsUI(){
			
		    this.closeBtn=null;
		    this.label=null;
		    this.ensure=null;

			tipsUI.__super.call(this);
		}

		CLASS$(tipsUI,'ui.alert.tipsUI',_super);
		var __proto__=tipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(tipsUI.uiView);
		}
		tipsUI.uiView={"type":"Dialog","props":{"width":790,"height":488},"child":[{"type":"Image","props":{"y":0,"x":0,"width":756,"skin":"res/alert/commbg.png","height":488}},{"type":"Button","props":{"y":12,"x":697,"var":"closeBtn","stateNum":"1","skin":"res/alert/close.png","name":"close"}},{"type":"Label","props":{"y":149,"x":135,"wordWrap":true,"width":474,"var":"label","text":"您携带的金额不足，请充值后继续!","height":40,"fontSize":31,"color":"#faecc5","align":"center"}},{"type":"Button","props":{"y":373,"x":77,"stateNum":"1","skin":"res/alert/cancle.png","name":"close"}},{"type":"Button","props":{"y":373,"x":431,"var":"ensure","stateNum":"1","skin":"res/alert/sure.png","name":"close"}}]};
		return tipsUI;
	})(Dialog);
var zhuangListUI=(function(_super){
		function zhuangListUI(){
			
		    this.closeBtn=null;
		    this.noRecord=null;
		    this.bankbox=null;
		    this.zhuangList=null;

			zhuangListUI.__super.call(this);
		}

		CLASS$(zhuangListUI,'ui.alert.zhuangListUI',_super);
		var __proto__=zhuangListUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(zhuangListUI.uiView);
		}
		zhuangListUI.uiView={"type":"Dialog","props":{"width":445,"height":481},"child":[{"type":"Image","props":{"y":0,"x":0,"width":445,"skin":"res/alert/zhuangbg.png","height":481}},{"type":"Image","props":{"y":397,"x":98,"var":"closeBtn","skin":"res/alert/closeBtn.png"}},{"type":"Box","props":{"y":134,"x":6,"width":438,"visible":false,"var":"noRecord","height":174},"child":[{"type":"Image","props":{"y":0,"x":143,"skin":"res/alert/niu.png"}},{"type":"Label","props":{"y":148,"x":17,"width":404,"text":"列表中暂无其他操盘手，赶紧去申请操盘吧~","height":32,"fontSize":20,"font":"Microsoft YaHei","color":"#5e2f00"}}]},{"type":"Box","props":{"y":40,"x":38,"var":"bankbox"},"child":[{"type":"Image","props":{"y":39,"x":-7,"skin":"res/alert/zhuangn.png"}},{"type":"Label","props":{"x":8,"width":53,"text":"排序","height":31,"fontSize":23,"font":"Microsoft YaHei","color":"#5c3000"}},{"type":"Label","props":{"x":103,"width":53,"text":"用户","height":31,"fontSize":23,"font":"Microsoft YaHei","color":"#5c3000"}},{"type":"Label","props":{"x":255,"width":53,"text":"余额","height":31,"fontSize":23,"font":"Microsoft YaHei","color":"#5c3000"}},{"type":"List","props":{"y":49,"x":-7,"width":385,"var":"zhuangList","spaceY":20,"height":305},"child":[{"type":"Box","props":{"y":0,"x":0,"width":360,"name":"render","height":26},"child":[{"type":"Label","props":{"y":0,"x":6,"width":47,"text":"1","name":"rank","height":26,"fontSize":22,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":-2,"x":69,"width":119,"text":"胜利的曙光","name":"name","height":26,"fontSize":22,"font":"Arial","color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":-1,"x":212,"width":152,"text":"10000000000","name":"amount","height":26,"fontSize":22,"font":"Arial","color":"#faecc5","align":"center"}}]}]}]}]};
		return zhuangListUI;
	})(Dialog);
var areaUI=(function(_super){
		function areaUI(){
			
		    this.amount=null;
		    this.tableName=null;
		    this.myAmountLabel=null;
		    this.myAmount=null;

			areaUI.__super.call(this);
		}

		CLASS$(areaUI,'ui.game.areaUI',_super);
		var __proto__=areaUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(areaUI.uiView);
		}
		areaUI.uiView={"type":"View","props":{"width":219,"height":295},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/game/area_new.png"}},{"type":"Label","props":{"y":9,"width":186,"var":"amount","text":"0","height":29,"fontSize":24,"font":"Arial","color":"#ffffff","centerX":0.5,"align":"center"}},{"type":"Image","props":{"var":"tableName","skin":"res/game/di.png","centerY":0,"centerX":0}},{"type":"Box","props":{"y":264,"x":42,"visible":false,"var":"myAmountLabel"},"child":[{"type":"Image","props":{"y":4,"visible":true,"skin":"res/game/area_amount.png"}},{"type":"Label","props":{"y":0,"x":20,"width":108,"var":"myAmount","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#fcff00","align":"center"}}]}]};
		return areaUI;
	})(View);
var avatarUI=(function(_super){
		function avatarUI(){
			
		    this.full=null;
		    this.amount=null;
		    this.pic=null;
		    this.empty=null;
		    this.frame=null;

			avatarUI.__super.call(this);
		}

		CLASS$(avatarUI,'ui.game.avatarUI',_super);
		var __proto__=avatarUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(avatarUI.uiView);
		}
		avatarUI.uiView={"type":"View","props":{"width":102,"height":135},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"full"},"child":[{"type":"Image","props":{"skin":"res/game/avatar1.png","centerY":0,"centerX":0}},{"type":"Label","props":{"y":90,"x":11,"width":83,"var":"amount","height":19,"fontSize":20,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"width":80,"var":"pic","skin":"res/avatar/avtar2.png","height":80,"centerY":-12.5,"centerX":0}}]},{"type":"Image","props":{"y":0,"x":0,"var":"empty","skin":"res/game/avatar2.png"}},{"type":"Image","props":{"y":-3,"x":-2,"visible":false,"var":"frame","skin":"res/game/avatar_frame.png"}}]};
		return avatarUI;
	})(View);
var bottomUI=(function(_super){
		function bottomUI(){
			
		    this.chat=null;
		    this.userList=null;
		    this.plus=null;
		    this.chipList=null;
		    this.leftArrow=null;
		    this.rightArrow=null;
		    this.avatar=null;
		    this.amount=null;
		    this.chatBox=null;
		    this.scrollBox=null;
		    this.htmlContent=null;
		    this.userName=null;

			bottomUI.__super.call(this);
		}

		CLASS$(bottomUI,'ui.game.bottomUI',_super);
		var __proto__=bottomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(bottomUI.uiView);
		}
		bottomUI.uiView={"type":"View","props":{"width":1334,"height":112},"child":[{"type":"Image","props":{"skin":"res/game/bottom.png","centerX":-16,"bottom":0}},{"type":"Image","props":{"x":57,"var":"chat","skin":"res/game/chat.png","pivotY":3,"pivotX":35,"name":"soundBtn","bottom":10}},{"type":"Image","props":{"x":1275,"var":"userList","skin":"res/game/friend.png","pivotY":35,"pivotX":35,"name":"soundBtn","bottom":10}},{"type":"Image","props":{"y":91,"x":412,"var":"plus","skin":"res/game/plus.png","pivotY":24,"pivotX":24,"name":"soundBtn"}},{"type":"List","props":{"y":25,"x":500,"width":650,"var":"chipList","height":75},"child":[{"type":"Box","props":{"y":2,"x":0,"name":"render"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/game/button2.png","name":"button"}},{"type":"Label","props":{"y":14,"x":17,"width":97,"valign":"middle","name":"amount","height":43,"font":"chip2","align":"center"}}]}]},{"type":"Image","props":{"y":29,"x":447,"var":"leftArrow","skin":"res/game/arrow.png","name":"soundBtn"}},{"type":"Image","props":{"y":29,"x":1209,"var":"rightArrow","skin":"res/game/arrow.png","scaleX":-1,"name":"soundBtn"}},{"type":"Image","props":{"y":14,"x":135,"width":92,"var":"avatar","height":91}},{"type":"Label","props":{"y":75,"x":282,"width":114,"var":"amount","height":39,"fontSize":20,"font":"Microsoft YaHei","color":"#fffb1a","align":"center"}},{"type":"Box","props":{"y":-57,"visible":false,"var":"chatBox","height":100,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":885,"skin":"res/game/chatBg.png","height":42}},{"type":"Box","props":{"y":6,"x":52,"width":784,"var":"scrollBox"},"child":[{"type":"HTMLDivElement","props":{"y":-2,"x":0,"width":784,"var":"htmlContent","innerHTML":"htmlText","height":43}}]}]},{"type":"Label","props":{"y":16,"x":266,"width":126,"var":"userName","height":36,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]};
		return bottomUI;
	})(View);
var caopanUI=(function(_super){
		function caopanUI(){
			
		    this.caopanType=null;
		    this.amount=null;
		    this.times=null;
		    this.ensure=null;
		    this.leastAmount=null;
		    this.amountValue=null;
		    this.timesValue=null;
		    this.maxTime=null;
		    this.goon=null;

			caopanUI.__super.call(this);
		}

		CLASS$(caopanUI,'ui.game.caopanUI',_super);
		var __proto__=caopanUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(caopanUI.uiView);
		}
		caopanUI.uiView={"type":"Dialog","props":{"width":800,"height":750},"child":[{"type":"Image","props":{"y":-4,"x":-1,"width":756,"skin":"res/game/alert/caopan_panel.png","height":746}},{"type":"RadioGroup","props":{"y":246,"x":90,"width":544,"var":"caopanType","stateNum":2,"space":30,"skin":"res/game/alert/check1.png","selectedIndex":0,"labels":"自动补足操盘金额         次,持续操盘","labelSize":28,"labelPadding":"15,0,0,10","labelColors":"#faecc5","height":172,"direction":"vertical"}},{"type":"Button","props":{"y":36,"x":702,"stateNum":"1","skin":"res/game/alert/close.png","name":"close"}},{"type":"Label","props":{"y":111,"x":89,"width":133,"text":"设置操盘金额","height":37,"fontSize":28,"font":"SimHei","color":"#faecc5"}},{"type":"Image","props":{"y":110,"x":279,"var":"amount","skin":"res/game/alert/bar.png"}},{"type":"Label","props":{"y":163,"x":90,"wordWrap":true,"width":538,"text":"操盘金额大于游戏币总额，余额自动兑入为游戏币","leading":10,"height":108,"fontSize":28,"font":"SimHei","color":"#faecc5"}},{"type":"Image","props":{"y":248,"x":419,"var":"times","skin":"res/game/alert/cheak1.png"}},{"type":"Label","props":{"y":407,"x":90,"wordWrap":true,"width":538,"text":"(操盘金额不足，系统自动扣除金额并补足)","leading":10,"height":33,"fontSize":24,"font":"SimHei","color":"#dfa300"}},{"type":"Button","props":{"y":550,"x":92,"var":"ensure","stateNum":"1","skin":"res/game/alert/sure.png","name":"close"}},{"type":"Button","props":{"y":550,"x":392,"stateNum":"1","skin":"res/game/alert/cancle.png","name":"close"}},{"type":"Label","props":{"y":637,"x":197,"width":313,"text":"操盘时游戏币至少需要","height":36,"fontSize":26,"font":"SimHei","color":"#dfa300"}},{"type":"Label","props":{"y":637,"x":462,"var":"leastAmount","text":"50000","fontSize":26,"font":"SimHei","color":"#ffe742"}},{"type":"Label","props":{"y":113,"x":302,"width":313,"var":"amountValue","height":33,"fontSize":30,"font":"Arial","color":"#ffcd06","align":"center"}},{"type":"Label","props":{"y":262,"x":419,"width":81,"var":"timesValue","text":"5","height":33,"fontSize":30,"font":"Arial","color":"#ffcd06","align":"center"}},{"type":"Label","props":{"y":444,"x":94,"wordWrap":true,"width":538,"var":"maxTime","text":"每次最长操盘时间","leading":10,"height":33,"fontSize":24,"font":"SimHei","color":"#dfa300"}},{"type":"CheckBox","props":{"y":480,"x":90,"width":500,"var":"goon","stateNum":"2","skin":"res/game/alert/check1.png","labelSize":28,"labelPadding":"15,0,0,10","labelColors":"#faecc5","label":"操盘结束后按上述设置继续排队","height":61}}]};
		return caopanUI;
	})(Dialog);
var cardUI=(function(_super){
		function cardUI(){
			

			cardUI.__super.call(this);
		}

		CLASS$(cardUI,'ui.game.cardUI',_super);
		var __proto__=cardUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(cardUI.uiView);
		}
		cardUI.uiView={"type":"View","props":{"width":68,"height":89},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/game/card_back.png","name":"back"}},{"type":"Image","props":{"y":0,"x":0,"skin":"res/game/card_front.png","name":"front"},"child":[{"type":"Clip","props":{"y":32,"x":4,"skin":"res/game/icon.png","name":"icon","index":0,"clipX":4}},{"type":"Clip","props":{"y":6,"x":-1,"skin":"res/game/poker_red.png","name":"num","clipX":13}},{"type":"Image","props":{"y":3,"x":-1,"skin":"res/game/g14.png","name":"joker"}}]}]};
		return cardUI;
	})(View);
var resultUI=(function(_super){
		function resultUI(){
			
		    this.animation=null;
		    this.avatar=null;
		    this.userName=null;
		    this.amount=null;
		    this.continue=null;
		    this.userList=null;
		    this.ticket=null;
		    this.closeBtn=null;

			resultUI.__super.call(this);
		}

		CLASS$(resultUI,'ui.game.resultUI',_super);
		var __proto__=resultUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(resultUI.uiView);
		}
		resultUI.uiView={"type":"Dialog","props":{"width":685,"height":0},"child":[{"type":"SkeletonPlayer","props":{"y":264,"x":343.00000000000006,"var":"animation","url":"res/dragon/result.sk"}},{"type":"Image","props":{"y":191.00000000000003,"x":173.00000000000006,"width":116,"var":"avatar","skin":"res/game/alert/avatar_frame.png","height":116}},{"type":"Label","props":{"y":304,"x":177,"width":111,"var":"userName","text":"粟米雪儿","height":36,"fontSize":24,"color":"#faecc5","align":"center"}},{"type":"Label","props":{"y":218,"x":308,"width":264,"var":"amount","text":12123,"height":85,"fontSize":48,"font":"Microsoft YaHei","color":"#ffd132","bold":true,"align":"left"}},{"type":"Button","props":{"y":490,"width":254,"var":"continue","stateNum":"1","skin":"res/game/alert/continue.png","name":"close","height":76,"centerX":0}},{"type":"List","props":{"y":341,"x":11,"var":"userList","repeatY":1,"repeatX":5},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Image","props":{"y":10,"x":28,"width":70,"name":"avatar","height":70}},{"type":"Image","props":{"x":15,"skin":"res/game/alert/1.png","name":"flag"}},{"type":"Label","props":{"y":93,"width":133,"text":"玩家昵称","name":"userName","height":20,"fontSize":20,"font":"SimHei","color":"#ffba00","align":"center"}},{"type":"Label","props":{"y":119,"x":13,"width":105,"text":"+10万","name":"amount","height":20,"fontSize":20,"font":"SimHei","color":"#ffea00","align":"center"}}]}]},{"type":"Label","props":{"y":304,"x":310,"width":266,"visible":false,"var":"ticket","text":"对局费：1000","height":31,"fontSize":24,"font":"Arial","color":"#ff8a00"}},{"type":"Button","props":{"y":110,"x":622,"visible":true,"var":"closeBtn","stateNum":"1","skin":"res/game/alert/close.png","name":"close"}}]};
		return resultUI;
	})(Dialog);
var tableUI=(function(_super){
		function tableUI(){
			
		    this.area1=null;
		    this.area2=null;
		    this.area3=null;
		    this.area4=null;
		    this.seat0=null;
		    this.seat1=null;
		    this.seat4=null;
		    this.seat5=null;
		    this.seat6=null;
		    this.seat7=null;
		    this.seat2=null;
		    this.seat3=null;
		    this.countdown=null;
		    this.progress=null;
		    this.available=null;
		    this.count=null;
		    this.reminder=null;

			tableUI.__super.call(this);
		}

		CLASS$(tableUI,'ui.game.tableUI',_super);
		var __proto__=tableUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.game.areaUI",ui.game.areaUI);
			View.regComponent("ui.game.avatarUI",ui.game.avatarUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(tableUI.uiView);
		}
		tableUI.uiView={"type":"View","props":{"width":1232,"mouseThrough":true,"height":602},"child":[{"type":"Image","props":{"y":48,"x":138,"skin":"res/game/table_light.png"}},{"type":"area","props":{"y":187.99999999999994,"x":127.99999999999989,"var":"area1","runtime":"ui.game.areaUI"}},{"type":"area","props":{"y":187.99999999999994,"x":377.9999999999999,"var":"area2","runtime":"ui.game.areaUI"}},{"type":"area","props":{"y":187.99999999999994,"x":628,"var":"area3","runtime":"ui.game.areaUI"}},{"type":"area","props":{"y":187.99999999999994,"x":878.0000000000001,"var":"area4","runtime":"ui.game.areaUI"}},{"type":"avatar","props":{"y":29.99999999999999,"x":-19.999999999999964,"var":"seat0","runtime":"ui.game.avatarUI"}},{"type":"avatar","props":{"y":159.99999999999997,"x":-19.999999999999964,"var":"seat1","runtime":"ui.game.avatarUI"}},{"type":"avatar","props":{"y":29.99999999999999,"x":1143.9999999999998,"var":"seat4","runtime":"ui.game.avatarUI"}},{"type":"avatar","props":{"y":159.99999999999997,"x":1143.9999999999998,"var":"seat5","runtime":"ui.game.avatarUI"}},{"type":"avatar","props":{"y":290,"x":1143.9999999999998,"var":"seat6","runtime":"ui.game.avatarUI"}},{"type":"avatar","props":{"y":420,"x":1143.9999999999998,"var":"seat7","runtime":"ui.game.avatarUI"}},{"type":"avatar","props":{"y":290,"x":-19.999999999999964,"var":"seat2","runtime":"ui.game.avatarUI"}},{"type":"avatar","props":{"y":420,"x":-19.999999999999964,"var":"seat3","runtime":"ui.game.avatarUI"}},{"type":"Box","props":{"y":104,"x":393,"visible":false,"var":"countdown"},"child":[{"type":"ProgressBar","props":{"y":32,"x":43,"var":"progress","value":1,"skin":"res/game/progress.png"}},{"type":"Label","props":{"y":41,"x":52,"width":385,"var":"available","text":"当前可投币总额：","height":31,"fontSize":20,"font":"Microsoft YaHei","color":"#ffec49","align":"center"}},{"type":"Image","props":{"y":0,"x":0,"skin":"res/game/clock.png"}},{"type":"Label","props":{"y":24,"x":12,"width":49,"var":"count","height":47,"fontSize":28,"font":"Microsoft YaHei","color":"#5f290a","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":124,"x":398,"width":458,"visible":false,"var":"reminder","text":"等待下局开始...","height":75,"fontSize":30,"font":"Microsoft YaHei","color":"#fbd663","bold":true,"align":"center"}}]};
		return tableUI;
	})(View);
var topUI=(function(_super){
		function topUI(){
			
		    this.panel=null;
		    this.back=null;
		    this.bankerList=null;
		    this.record=null;
		    this.operate=null;
		    this.setting=null;
		    this.bankerName=null;
		    this.gold=null;
		    this.avatar=null;
		    this.caopanText=null;
		    this.poolArea=null;
		    this.pool=null;

			topUI.__super.call(this);
		}

		CLASS$(topUI,'ui.game.topUI',_super);
		var __proto__=topUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(topUI.uiView);
		}
		topUI.uiView={"type":"View","props":{"width":1334,"top":0,"height":200},"child":[{"type":"Image","props":{"y":0,"x":1078,"visible":true,"skin":"res/game/green_label.png"}},{"type":"Image","props":{"var":"panel","top":0,"skin":"res/game/top_new.png","centerX":0}},{"type":"Image","props":{"x":74,"var":"back","top":15,"skin":"res/game/back.png","pivotY":45,"pivotX":44,"name":"soundBtn"}},{"type":"Image","props":{"y":106.71428571428572,"x":1086.142857142857,"width":78,"var":"bankerList","skin":"res/game/list.png","pivotY":0,"pivotX":0,"name":"soundBtn","mouseThrough":false,"mouseEnabled":true,"height":79}},{"type":"Image","props":{"y":56,"x":1125,"width":78,"var":"record","skin":"res/game/record.png","pivotY":39,"pivotX":39,"name":"soundBtn","height":79}},{"type":"Image","props":{"y":78,"x":876,"width":183,"var":"operate","skin":"res/game/operate.png","pivotY":57.402985074626855,"pivotX":19.35820895522386,"name":"soundBtn","height":77}},{"type":"Image","props":{"x":1253,"var":"setting","top":15,"skin":"res/game/setting.png","pivotY":45,"pivotX":44,"name":"soundBtn"}},{"type":"Label","props":{"y":-2,"x":622,"width":150,"var":"bankerName","valign":"middle","rotation":0,"height":50,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"center"}},{"type":"Label","props":{"y":52,"x":635,"width":150,"var":"gold","valign":"middle","rotation":0,"height":50,"fontSize":20,"font":"Microsoft YaHei","color":"#fffb1a","bold":false,"align":"center"}},{"type":"Image","props":{"y":6,"x":496,"width":89,"var":"avatar","height":90}},{"type":"Image","props":{"y":71,"x":544,"var":"caopanText","skin":"res/game/operate_text.png"}},{"type":"Image","props":{"y":0,"x":130,"var":"poolArea","skin":"res/game/pool.png","name":"soundBtn"}},{"type":"Label","props":{"y":89,"x":180,"width":158,"var":"pool","text":"0","height":46,"font":"pool","align":"center"}}]};
		return topUI;
	})(View);
var headUI=(function(_super){
		function headUI(){
			
		    this.backbtn=null;
		    this.homebtn=null;
		    this.avatar=null;
		    this.setBtn=null;
		    this.yubtn=null;
		    this.rechargebtn=null;
		    this.gain=null;
		    this.balance=null;
		    this.gamecoin=null;
		    this.login=null;
		    this.userName=null;

			headUI.__super.call(this);
		}

		CLASS$(headUI,'ui.hall.headUI',_super);
		var __proto__=headUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(headUI.uiView);
		}
		headUI.uiView={"type":"View","props":{"y":0,"width":1334,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1334,"skin":"res/hall/headbg.png","height":120}},{"type":"Button","props":{"y":20,"x":30,"width":77,"visible":false,"var":"backbtn","stateNum":"1","skin":"res/hall/backbtn.png","height":80}},{"type":"Button","props":{"y":20,"x":120,"width":77,"visible":false,"var":"homebtn","stateNum":"1","skin":"res/hall/homebtn.png","height":80}},{"type":"Image","props":{"y":11,"x":209,"width":94,"var":"avatar","skin":"res/hall/avatar.png","height":94}},{"type":"Image","props":{"y":31,"x":930,"skin":"res/hall/logo.png"}},{"type":"Image","props":{"y":30,"x":1232,"var":"setBtn","skin":"res/hall/setbg.png"}},{"type":"Image","props":{"y":48,"x":366,"skin":"res/hall/yubg.png"}},{"type":"Image","props":{"y":44,"x":341,"width":64,"skin":"res/hall/yu.png","height":65}},{"type":"Label","props":{"y":49,"x":337,"width":191,"var":"yubtn","height":55}},{"type":"Image","props":{"y":44,"x":528,"width":64,"var":"rechargebtn","skin":"res/hall/chong.png","height":65}},{"type":"Image","props":{"y":48,"x":609,"skin":"res/hall/yubg.png"}},{"type":"Image","props":{"y":44,"x":786,"width":64,"var":"gain","skin":"res/hall/shou.png","height":65}},{"type":"Image","props":{"y":44,"x":603,"width":64,"skin":"res/hall/you.png","height":65}},{"type":"Label","props":{"y":51,"x":401,"width":132,"var":"balance","valign":"middle","text":"0","height":45,"fontSize":30,"font":"Arial","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":51,"x":662,"width":131,"var":"gamecoin","valign":"middle","text":"0","height":45,"fontSize":30,"font":"Arial","color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":13,"x":394,"var":"login","skin":"res/hall/login.png"}},{"type":"Label","props":{"y":8,"x":394,"width":137,"var":"userName","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]};
		return headUI;
	})(View);
var quickStartUI=(function(_super){
		function quickStartUI(){
			
		    this.start=null;
		    this.hand=null;

			quickStartUI.__super.call(this);
		}

		CLASS$(quickStartUI,'ui.hall.quickStartUI',_super);
		var __proto__=quickStartUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(quickStartUI.uiView);
		}
		quickStartUI.uiView={"type":"View","props":{"width":560,"height":121},"child":[{"type":"Image","props":{"y":72,"x":402,"width":277,"var":"start","skin":"res/hall/start.png","pivotY":51,"pivotX":143,"height":105}},{"type":"Image","props":{"y":89,"x":136,"width":215,"var":"hand","skin":"res/hall/hand.png","pivotY":41,"pivotX":108,"height":77}}]};
		return quickStartUI;
	})(View);
var rankUI=(function(_super){
		function rankUI(){
			
		    this.rankTab=null;
		    this.rankPage=null;
		    this.yinList=null;
		    this.myRecord=null;
		    this.loginbox=null;
		    this.login=null;
		    this.rankNodata=null;

			rankUI.__super.call(this);
		}

		CLASS$(rankUI,'ui.hall.rankUI',_super);
		var __proto__=rankUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(rankUI.uiView);
		}
		rankUI.uiView={"type":"View","props":{"width":488,"height":500},"child":[{"type":"Image","props":{"y":30,"x":0,"width":498,"skin":"res/hall/rankbg.png","height":527}},{"type":"Tab","props":{"y":3,"x":26,"var":"rankTab","selectedIndex":0},"child":[{"type":"Button","props":{"y":-27.000000000000007,"x":236,"width":189,"stateNum":"2","skin":"res/hall/btn_my.png","name":"item1","height":81}},{"type":"Button","props":{"y":-26.000000000000014,"x":64,"width":189,"stateNum":"2","skin":"res/hall/btn_yin.png","name":"item0","height":81}}]},{"type":"ViewStack","props":{"y":80,"x":37,"width":422,"var":"rankPage","selectedIndex":0,"height":429},"child":[{"type":"Box","props":{"y":-9,"x":2,"name":"item0"},"child":[{"type":"List","props":{"y":0,"x":0,"width":422,"var":"yinList","spaceY":2,"height":456},"child":[{"type":"Box","props":{"y":0,"x":-3,"width":422,"name":"render","height":94},"child":[{"type":"Clip","props":{"y":0,"x":0,"width":422,"skin":"res/hall/clip_yinglibg.png","name":"allbg","index":0,"height":94,"clipY":2}},{"type":"Image","props":{"y":5,"x":5,"width":80,"skin":"res/hall/avater0.png","name":"avtar","height":80}},{"type":"Image","props":{"y":-1,"x":353,"skin":"res/hall/numbg.png","name":"rankbg"}},{"type":"Label","props":{"y":5,"x":357,"width":48,"valign":"middle","text":"1","name":"rankNum","height":51,"font":"rankNum","align":"center"}},{"type":"Label","props":{"y":10,"x":99,"width":141,"text":"破产码农","name":"userName","height":30,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":55,"x":95,"width":141,"text":"1234567890","name":"winAll","height":30,"fontSize":22,"font":"Arial","color":"#905211","bold":true}}]}]},{"type":"VScrollBar","props":{"name":"scrollBar"}}]},{"type":"Box","props":{"y":28,"x":-1,"width":422,"name":"item1","height":408},"child":[{"type":"Label","props":{"y":-34,"x":76,"width":55,"text":"时间","height":29,"fontSize":24,"font":"Microsoft YaHei","color":"#fcf3d4"}},{"type":"Label","props":{"y":-34,"x":239,"width":95,"text":"我的中奖","height":29,"fontSize":24,"font":"Microsoft YaHei","color":"#fcf3d4"}},{"type":"List","props":{"y":0,"x":0,"width":422,"var":"myRecord","spaceY":5,"height":415},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"render"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"res/hall/rankt.png"}},{"type":"Label","props":{"y":16,"x":18,"text":"2017-7-18   13:36","name":"addTime","fontSize":20,"font":"Arial","color":"#905211","bold":true}},{"type":"Label","props":{"y":17,"x":209,"width":170,"text":"1000000000000","name":"winAmount","height":20,"fontSize":20,"font":"Arial","color":"#905211","bold":true,"align":"center"}}]}]},{"type":"VScrollBar","props":{"name":"scrollBar"}}]}]},{"type":"Box","props":{"y":237,"x":130,"visible":false,"var":"loginbox"},"child":[{"type":"Label","props":{"y":3,"x":184,"width":41,"var":"login","underline":true,"text":"登录","height":22,"fontSize":20,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"y":4,"x":0,"width":184,"text":"你还未登录噢，请先","height":24,"fontSize":20,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"y":5,"x":233,"width":13,"text":"!","height":23,"fontSize":20,"font":"Arial","color":"#ffffff"}}]},{"type":"Image","props":{"y":231,"x":50,"visible":false,"var":"rankNodata","skin":"res/hall/norecord.png"},"child":[{"type":"Label","props":{"y":5,"x":24,"width":339,"text":"暂无游戏记录,快去玩游戏赢大奖吧！","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]};
		return rankUI;
	})(View);
var roomUI=(function(_super){
		function roomUI(){
			
		    this.roomNum=null;
		    this.userCount=null;
		    this.roomtype=null;

			roomUI.__super.call(this);
		}

		CLASS$(roomUI,'ui.hall.roomUI',_super);
		var __proto__=roomUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(roomUI.uiView);
		}
		roomUI.uiView={"type":"View","props":{"width":332,"height":111},"child":[{"type":"Clip","props":{"y":0,"x":0,"width":332,"var":"roomNum","skin":"res/hall/clip_room.png","index":0,"height":111,"clipY":4}},{"type":"Label","props":{"y":71,"x":212,"width":43,"text":"在线：","height":26,"fontSize":20,"font":"Arial","color":"#2f1702"}},{"type":"Label","props":{"y":71,"x":266,"width":43,"var":"userCount","text":"100","height":26,"fontSize":20,"font":"Arial","color":"#2f1702"}},{"type":"Clip","props":{"y":-7,"x":31,"width":74,"var":"roomtype","skin":"res/hall/flag.png","index":0,"height":65,"clipY":2}}]};
		return roomUI;
	})(View);
var loadingUI=(function(_super){
		function loadingUI(){
			
		    this.percent=null;
		    this.progress=null;

			loadingUI.__super.call(this);
		}

		CLASS$(loadingUI,'ui.start.loadingUI',_super);
		var __proto__=loadingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(loadingUI.uiView);
		}
		loadingUI.uiView={"type":"View","props":{"width":1335,"height":120,"centerX":0},"child":[{"type":"Label","props":{"y":15,"x":641,"width":90,"var":"percent","text":"10%","height":48,"fontSize":45,"font":"Arial","color":"#ffffff"}},{"type":"ProgressBar","props":{"y":64,"x":182,"width":946,"var":"progress","skin":"res/loading/progress_preload.png","height":38}}]};
		return loadingUI;
	})(View);