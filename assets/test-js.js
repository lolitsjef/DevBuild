var selectedProducts = [];

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
        document.getElementById('featuredproductprice').innerHTML = product.price;
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
    console.log(selectedProducts);
    console.log("api request");

    var items = [];
    for(let i = 0; i < selectedProducts.length; i++){
        if(selectedProducts[i] != 0){
        var temp = {
            'id': selectedProducts[i],
            'quantity': 1
            }
        }
        items.push(temp);
    }
    let formData = {
        'items' : items
    };
    console.log(formData);
    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {

    })
    .catch((error) => {
        console.error('Error:', error);
    });

    //update cart
    const res = await fetch("/cart.json");
    const cart = await res.json();
    document.querySelectorAll(".cart-count").forEach((el) => {
        el.textContent = cart.item_count;
    });

    jQuery.getJSON('/cart.js', function (cart, textStatus) {
        //the cart info is in the callback. the item_count is available as part of the callback
        //below I set my cartcount div with the current cart item_count
        var carttext=cart.item_count;
        jQuery("#cartcount").text(carttext);
    });
}



