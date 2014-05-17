function createDeck() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
    var ranks = ["A", "K" , "Q", "J"]; // Limit to royals.
    var suits = ["♣", "♦", "♥", "♠"]; // Add the unicode signs of the cards eg. ♠,♥,♦,♣
    var j, k, index=0;
    var pack_size;

    // Set array of cards.
    // total number of cards
    pack_size = ranks.length * suits.length;
    var cards = [];


    // Fill the array with 'n' packs of cards.
    while (index < (pack_size)){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
    console.log(cards.length);
    return cards;
}



function showDeck(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            showCards(deck[idx], idx);
    }
}



// Arranges the cards on the document and creates covers for them
function layout_cards(){
    var  cards = [].slice.call(document.getElementsByClassName('card'));
    console.log(cards);
    var shuffled = shuffle(cards);
    console.log(cards);
    var index= 0;
    for (var h =0; h<4;h++) {
        for (var w =0; w<8;w++){
            cards[index].style.top= (h*2.6)+"em";
            cards[index].style.left= (w*2.1)+"em"; 
            cards[index].id = index;
            cover = document.createElement("div");
            cover.classList.add("cover");
            cover.classList.add(index);
            // console.log("the cover is linked to " + cover.classList[1])
            document.querySelector(".sideBox").appendChild(cover);
            cover.style.top= (h*2.6)+"em";
            cover.style.left= (w*2.1)+"em";
            index++;
        };
    };

   
}
