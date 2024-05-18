
var section1Items = document.getElementsByClassName("section1");

function selected(item) { //also pass in product here
    //this.removeSelections();
    item.classList.add('selected');
}

function removeSelections() {
    for(var i=0; i < section1Items.length; i++) {
        var item = section1Items[i];
        item.classList.remove('selected');
    }
}
