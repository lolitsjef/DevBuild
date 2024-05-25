function selected(sectionIndex, item, id) {
    removeSelections(sectionIndex);
    item.classList.add('selected');
    setFeaturedProduct(id);
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

function addAllToCart() {
    var selectedProducts = [];
    var selectedProductIds = [];

    // Loop through each section
    var sectionCount = document.getElementsByClassName('KitBuilder').length;
    for (var sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++) {
        var selectedProduct = document.getElementById('section' + (sectionIndex + 1)).getElementsByClassName('selected')[0];
        if (selectedProduct) {
            var productId = selectedProduct.dataset.productId;
            selectedProductIds.push(productId);
        }
    }

    // Use AJAX to add products to cart
    if (selectedProductIds.length > 0) {
        addToCart(selectedProductIds);
    } else {
        alert("Please select at least one product.");
    }
}

async function addToCart(productIds) {
    var formData = new FormData();
    formData.append('items', JSON.stringify(productIds));

    try {
        const response = await fetch('/cart/add.js', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert("Products added to cart successfully!");
        } else {
            throw new Error('Failed to add products to cart.');
        }
    } catch (error) {
        console.error('Error adding products to cart:', error);
        alert("Failed to add products to cart. Please try again.");
    }
}
