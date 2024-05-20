function selected(sectionIndex, item, name, desc, price) {
    removeSelections(sectionIndex);
    item.classList.add('selected');
    setFeaturedProduct(name, desc, price);
}

function removeSelections(sectionIndex) {
    var sectionItems = document.getElementById('section' + sectionIndex).getElementsByClassName('productcard');
    for (var i = 0; i < sectionItems.length; i++) {
        var item = sectionItems[i];
        item.classList.remove('selected');
    }

function setFeaturedProduct(name, desc, price){

    document.getElementById('featuredproductname').innerHTML = name;
    document.getElementById('featuredproductdesc').innerHTML = desc;
    document.getElementById('featuredproductprice').innerHTML = price;

}
}