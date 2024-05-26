var selectedProducts = [6];

function selected(sectionIndex, item, id) {
    removeSelections(sectionIndex);
    item.classList.add('selected');
    setFeaturedProduct(id);
    selectedProducts[sectionIndex-1] = id;
}

function removeSelections(sectionIndex) {
    var sectionItems = document.getElementById('section' + sectionIndex).getElementsByClassName('productcard');
    for (var i = 0; i < sectionItems.length; i++) {
        var item = sectionItems[i];
        item.classList.remove('selected');
    }
}

async function setFeaturedProduct(id){
    console.log("here");
    const product = await getProductById(id);
    document.getElementById("featuredproductimage").src=product.featured_image;
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

function checkout(){
    var prodcutsJson = [];
    for (var i = 0; i < selectedProducts.length; i++) {
        if (selectedProducts[i] != 0){
            var temp =
            {
                'id': selectedProducts[i],
                'quantity': 1
            }
            prodcutsJson.push(temp); 
        }
    }

    let formData = {
    'items': prodcutsJson
    };
       
    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


