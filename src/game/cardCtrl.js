{   let Pool = Laya.Pool;
    class cardControl{
    }
    cardControl.create5cards = function(cardsValue, pos){
        let cardX;
        let cardY = 130;
        if(pos>0){
            cardY = 370;
        }
        switch(pos){
            case 0 :
            cardX = 570;
            break;
            case 1 :
            cardX = 150;
            break;
            case 2 :
            cardX = 400;
            break;
            case 3 :
            cardX = 650;
            break;
            case 4 :
            cardX = 900;
            break;
        }
        let cardSet = Pool.getItemByClass('cardSet',Com.Game.CardSet);
        cardSet.setCardsVlaue(cardsValue);
        cardSet.pos(cardX,cardY);
        if(pos == 0 && tbnn.dom.top){
            tbnn.dom.top.addChild(cardSet);
        }else if(tbnn.dom.table){
            tbnn.dom.table.addChild(cardSet);
        }
        cardSet.showCards();
        return cardSet;
    }
    Sail.class(cardControl,'Com.Game.CardCtrl');
}