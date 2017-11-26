{   let inconIndex = {
        D:0,
        C:1,
        H:2,
        S:3
    }
    class Cardclass extends ui.game.cardUI{
        constructor(){
            super();
            this.init();
        }
        init(){
        };

        setValue(value){
            let front = this.getChildByName('front');
            let icon = value.substring(0,1);
            let num = value.substring(1);
            if(icon=='G'){
                front.getChildByName('joker').visible = true;
                front.getChildByName('icon').visible = false;
                front.getChildByName('num').visible = false;
                front.getChildByName('joker').skin = 'res/game/' + value.toLowerCase() + '.png';
            }else{
                front.getChildByName('joker').visible = false;
                front.getChildByName('icon').visible = true;
                front.getChildByName('num').visible = true;
                front.getChildByName('icon').index = inconIndex[icon];
                if(icon == 'S' || icon == 'C'){
                    front.getChildByName('num').skin = 'res/game/poker_black.png';
                }else{
                    front.getChildByName('num').skin = 'res/game/poker_red.png';
                }
                front.getChildByName('num').index = parseInt(num) - 1;
            }
        }

        showBack(){
            this.getChildByName('back').visible = true;
            this.getChildByName('front').visible = false;
        }
        showFront(){
            this.getChildByName('back').visible = false;
            this.getChildByName('front').visible = true;
        }
    }
    Sail.class(Cardclass, 'Com.Game.Card');

    class CardSet extends Laya.Box{
        constructor(){
            super();
            this.init();
        }
        init(){
            this.cards = [];
            for(let i = 0 ; i < 5 ; i++){
                let card = new Com.Game.Card();
                card.x = i*30;
                card.visible = false;
                this.cards.push(card);
                this.addChild(card);
            }
            this.typeBg = new Laya.Image('res/game/type_bg.png');
            this.typeBg.pos(-15, 30);
            this.type = new Laya.Image();
            this.type.centerX = this.type.centerY = 0;
            this.typeBg.addChild(this.type);
            this.addChild(this.typeBg);
        }
        showCards(){
            let delay = 200;
            this.typeBg.visible = false;
            this.cards.forEach((card,index)=>{
                card.visible = false;
                card.showBack();
                this.timerOnce(delay*index,this,()=>{
                    card.visible = true;
                });
            });
        }
        setCardsVlaue(cardsValue){
            this.cards.forEach((card,index)=>{
                card.setValue(cardsValue.num[index]);
            });
            let typeValue = this.typeValue = cardsValue.type.substring(10);
            this.type.skin = 'res/game/' + typeValue + '.png';
        }
        showResult(){
            this.cards.forEach((card,index)=>{
                card.showFront();
            });
            this.typeBg.visible = true; 
            let soundSrc = 'sound/';
            switch(this.typeValue){
                case 'NIU_NULL' :
                    soundSrc += 'wu_niu';
                    break;
                case 'SI_HUA' :
                    soundSrc += 'si_hua';
                    break;
                case 'WU_HUA' :
                    soundSrc += 'wu_hua';
                    break;
                case 'ZHA_DANG' :
                    soundSrc += 'si_zha';
                    break;
                default :
                    soundSrc += this.typeValue;
                    soundSrc = soundSrc.toLowerCase();
                    // soundSrc += 'you_niu';
                    break;
            }
            soundSrc += '.mp3';
            Laya.SoundManager.playSound(soundSrc);
        }
        reset(){
            this.removeSelf();
            Laya.Pool.recover('cardSet', this);
        }

    }
    Sail.class(CardSet, 'Com.Game.CardSet');
}