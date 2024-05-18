
var divItems = document.getElementsByClassName("radiodiv");

function selected(item) {
    this.clear();
    item.style.backgroundColor = 'red';
}

function clear() {
    for(var i=0; i < divItems.length; i++) {
        var item = divItems[i];
        item.style.backgroundColor = 'white';
    }
}
