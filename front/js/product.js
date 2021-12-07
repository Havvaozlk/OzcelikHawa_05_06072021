let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

const getProducts = async function() {

    try {
        let response = await fetch("http://localhost:3000/api/products/" + id);
        if (response.ok) {
            let product = await response.json();
            console.log(product);

            //insérer l'image du produit
            let productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.setAttribute('src', product.imageUrl);
            productImg.setAttribute('alt', product.altTxt);

            console.log(productImg);

            //Insérer le titre
            let productName = document.querySelector("#title");
            productName.innerHTML = product.name;

            console.log(productName);

            //Insérer la description
            let productDescription = document.querySelector('#description');
            productDescription.innerHTML = product.description;

            console.log(productDescription);

            //Insérer le prix
            let productPrice = document.querySelector('#price');
            productPrice.innerHTML= product.price;

            console.log(productPrice);

            //Choix des couleurs
            let colorsProduct = document.querySelector('#colors');
            for (let i=0; i < product.colors.length; i++) {
                let color = document.createElement('option');
                color.setAttribute('value', product.colors[i]);
                color.innerHTML = product.colors[i];
                colorsProduct.appendChild(color);
            }


            //bouton panier
            
            let addToCart = document.querySelector('#addToCart');
            let productQuantity = document.querySelector('#quantity');
            let productAlt = product.altTxt;
            addToCart.addEventListener('click', (event) => {
                if (productQuantity.value > 0 && productQuantity.value <= 100 && productQuantity.value !=0) {
                event.preventDefault();
                
                let productAdded = {
                    productName : product.name,
                    id : product._id,
                    colorsProduct : colorsProduct.value,
                    productQuantity : productQuantity.value,
                    productPrice : product.price,
                    productImg : product.imageUrl,
                    productAlt : product.altTxt,
                }
                console.log(productAdded);

                let storedProduct = JSON.parse(localStorage.getItem('product'));
                const color = colorsProduct.value;

                //fenetre popup
                const popupConfirmation = () => {
                    if(window.confirm( `${product.name} ${colorsProduct.value} a bien été ajouté au panier
                    Souhaitez-vous consulter le panier ?`)){
                        window.location.href = 'cart.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }
                if(storedProduct) {
                    let result = storedProduct.find((el) => el.id === product._id && el.colorsProduct === colorsProduct.value );
                    if(result) { 
                        let newQuantite = parseInt(productAdded.productQuantity) + parseInt(result.productQuantity);
                        result.productQuantity = newQuantite;
                        localStorage.setItem('product', JSON.stringify(storedProduct));
                        console.table(storedProduct);
                        popupConfirmation();
                    }
                    else {
                    storedProduct.push(productAdded);
                    localStorage.setItem('product', JSON.stringify(storedProduct));
                    console.log(storedProduct);
                    popupConfirmation();
                    
                    }
                } else {
                    storedProduct = [];
                    storedProduct.push(productAdded);
                    localStorage.setItem('product', JSON.stringify(storedProduct));
                    console.log(storedProduct);
                    popupConfirmation();
                }}
                
            });
        } else {
        console.error('Retour du serveur : ', response.status);
        alert('Erreur rencontrée : ' + response.status);
        }
    } catch (error) {
        alert("Erreur : " + error);
    }
};

getProducts();

