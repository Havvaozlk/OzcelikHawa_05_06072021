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
            //productImg.src = product.imageUrl;
            //productImg.alt = product.altTxt;
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
            addToCart.addEventListener('click', function(event) {
                event.preventDefault();

                let productAdded = {
                    productName : product.name,
                    id : product._id,
                    colorsProduct : colorsProduct.value,
                    productQuantity : productQuantity.value,
                    productPrice : product.price,
                };
                console.log(productAdded);

                let storedProduct = JSON.parse(localStorage.getItem('newArticle'));
                const color = colorsProduct.value;
                if(storedProduct) {
                    storedProduct.push(productAdded);
                    localStorage.setItem('newArticle', JSON.stringify(storedProduct));
                    console.log(storedProduct);
                    if (window.confirm(product.name + ' ' + colorsProduct + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) {window.location.href = 'panier.html';
                } else {
                    window.location.href = 'index.html';
                }

                } else {
                    storedProduct = [];
                    storedProduct.push(productAdded);
                    localStorage.setItem('newArticle', JSON.stringify(storedProduct));
                    console.log(storedProduct);
                    if (window.confirm(product.name + ' ' + colorsProduct + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) {
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }
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
//productAdded();


/*function addToCart() {
    let addToCartBtn = document.querySelector('#addToCart');
    let productQuantity = document.querySelector('#quantity');
    
    addToCartBtn.addEventListener('click', () =>
    if(quantity.value > 0 && quantity.value < 100) {


      
      };

    }
  }
          addToCart();*/
