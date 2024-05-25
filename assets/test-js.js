var a = [];

function selected(sectionIndex, item, id, image) {
    removeSelections(sectionIndex);
    item.classList.add('selected');
    setFeaturedProduct(id, image);
    a
}

function removeSelections(sectionIndex) {
    var sectionItems = document.getElementById('section' + sectionIndex).getElementsByClassName('productcard');
    for (var i = 0; i < sectionItems.length; i++) {
        var item = sectionItems[i];
        item.classList.remove('selected');
    }
}

async function setFeaturedProduct(id, image){
    console.log("here");
    //const product = await getProductById(id);
    document.getElementById("featuredproductimage").src=image;
    document.getElementById('featuredproductname').innerHTML = product.title;
    document.getElementById('featuredproductdesc').innerHTML = product.description;
    document.getElementById('featuredproductprice').innerHTML = product.price;

}

async function getProductById(id) {
	const handle = (await fetch(`/search/suggest.json?q=id:${id}&resources[type]=product&limit=1`)
		.then(response => response.json())
		.then(response => response.resources.results.products.shift())).handle;

	return await fetch(`/products/${handle}.js`).then(response => response.json());
}


