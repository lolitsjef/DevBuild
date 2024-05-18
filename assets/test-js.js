
var section1Items =document.getElementById('section1').getElementsByTagName('productcard');  //get all divs from div called container

function selected(item) { //also pass in product here
    //this.removeSelections();
   //item.style.backgroundColor = 'green';

    item.classList.add('selected');
}

function removeSelections() {
    for(var i=0; i < section1Items.length; i++) {
        var item = section1Items[i];
        item.style.backgroundColor = 'red';
        //item.classList.remove('selected');
    }
}
