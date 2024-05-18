
var section1Items = document.getElementsByClassName("section1");

function selected(item) { //also pass in product here
    this.clear();
    item.classList.add('selected');
}

function clear() {
    for(var i=0; i < section1Items.length; i++) {
        var item = section1Items[i];
        item.classList.remove('selected');
    }
}
