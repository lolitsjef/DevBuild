var selectedProducts = [0,0,0,0,0,0];

function selected(sectionIndex, item, id, idvariant) {
    removeSelections(sectionIndex);
    item.classList.add('selected');
    setFeaturedProduct(id);
    selectedProducts[sectionIndex-1] = idvariant;
}

function removeSelections(sectionIndex) {
    var sectionItems = document.getElementById('section' + sectionIndex).getElementsByClassName('productcard');
    for (var i = 0; i < sectionItems.length; i++) {
        var item = sectionItems[i];
        item.classList.remove('selected');
    }
}

async function setFeaturedProduct(id){
    if(id == 0) {
        //set blank product
    }
    else {
        const product = await getProductById(id);
        document.getElementById("featuredproductimage").src=product.featured_image;
        document.getElementById('featuredproductname').innerHTML = product.title;
        document.getElementById('featuredproductdesc').innerHTML = product.description;
        var num = product.price;
        num /= 100; 
        num.toLocaleString("en-US", {style:"currency", currency:"USD"});
        document.getElementById('featuredproductprice').innerHTML = "$" + num;
        return product;
    }


}

async function getProductById(id) {
	const handle = (await fetch(`/search/suggest.json?q=id:${id}&resources[type]=product&limit=1`)
		.then(response => response.json())
		.then(response => response.resources.results.products.shift())).handle;

	return await fetch(`/products/${handle}.js`).then(response => response.json());
}

async function checkout(){
    var cartContents = await fetch(window.Shopify.routes.root + 'cart.js')
    .then(response => response.json())
    .then(data => {         
        var formData = new FormData();
        for(let i = 0; i < selectedProducts.length; i++){
            if(selectedProducts[i] != 0 && selectedProducts[i]){
                if(selectedProducts[i] != 0){
                    let quantity = 1;
                    for(let k = 0; k < data.items.length; k++){
                        if(data.items[k].id == selectedProducts[i]){
                            quantity = data.items[k].quantity + 1;
                        }
                    }
                    formData.append("updates[" + selectedProducts[i] + "]", quantity);
                }
            }
        } 
        addToCart(formData);
    });
}

async function addToCart(formData){
    console.log(selectedProducts);

    console.log(formData);
    fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
    
}



