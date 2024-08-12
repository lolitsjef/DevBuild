var selectedProducts = [0,0,0,0,0,0];
var selectedProductIDs = [0,0,0,0,0,0];

async function selected(sectionIndex, item, id, idvariant, description, featured_image, title, sectionName) {
    removeSelections(sectionIndex);
    if(idvariant == selectedProducts[sectionIndex-1]){
        selectedProducts[sectionIndex-1] = 0;
        selectedProductIDs[sectionIndex-1] = 0;

        document.getElementById("selectedItem" + sectionIndex).innerHTML = "No " + sectionName;
        document.getElementById("selectedItemPrice" + sectionIndex).innerHTML = "$0.00";
    }
    else{
        item.classList.add('selected');

        document.getElementById("featuredproductimage").src = "//devbuild.digital/cdn/shop/" + featured_image;
        document.getElementById('featuredproductname').innerHTML = title;
        document.getElementById('featuredproductdesc').innerHTML = description;

        const product = await getProductById(id);
        var dollar = product.price / 100;
        var cents = product.price % 100;
        console.log(product.price);
        console.log(dollar);
        console.log(cents);
        if (cents == 0){
            cents = "00"
        }
        else{
            cents = cents.toString();
        }
        let price = "$".concat(dollar.toString(), ".", cents);
        document.getElementById('featuredproductprice').innerHTML = price;

        selectedProducts[sectionIndex-1] = idvariant;
        selectedProductIDs[sectionIndex-1] = id;
        document.getElementById("selectedItem" + sectionIndex).innerHTML = title;
        document.getElementById("selectedItemPrice" + sectionIndex).innerHTML = price;
    }

    var totalPrice = 0;
        for(var i = 0; i < selectedProductIDs.length; i++){
            if(selectedProductIDs[i] != 0){
                const product = await getProductById(selectedProductIDs[i]);
                totalPrice += product.price;
            }
        }

        var dollar = product.totalPrice / 100;
        var cents = product.totalPrice % 100;
        console.log(product.totalPrice);
        console.log(dollar);
        console.log(cents);
        if (cents == 0){
            cents = "00"
        }
        else{
            cents = cents.toString();
        }
        let total = "$".concat(dollar.toString(), ".", cents);
        document.getElementById('featuredproductprice').innerHTML = total;

}

function removeSelections(sectionIndex) {
    var sectionItems = document.getElementById('section' + sectionIndex).getElementsByClassName('productcard');
    for (var i = 0; i < sectionItems.length; i++) {
        var item = sectionItems[i];
        item.classList.remove('selected');
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
    document.getElementById("cButton").classList.add("hide");
    document.getElementById("cMessage").classList.remove("hide");
}

async function addToCart(formData){
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





