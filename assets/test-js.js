
var section1Items = document.getElementsByClassName("section1");

function selected(item) { //also pass in product here
    this.clear();
    item.style.selected = 'true';
}

function clear() {
    for(var i=0; i < section1Items.length; i++) {
        var item = section1Items[i];
        item.style.selected = 'false';
    }
}
