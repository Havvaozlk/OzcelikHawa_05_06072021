// création d'une nouvelle URL en ajoutant l'id à celle ci
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// création d'une fonction pour insérer les détails du produit et l'ajouter au panier
const getProducts = async function () {
//
    try {
        let response = await fetch("http://localhost:3000/api/products/" + id);
        if (response.ok) {
            let product = await response.json();

            //insérer l'image du produit
            let productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.setAttribute('src', product.imageUrl);
            productImg.setAttribute('alt', product.altTxt);

            //Insérer le titre
            let productName = document.querySelector("#title");
            productName.innerHTML = product.name;

            //Insérer la description
            let productDescription = document.querySelector('#description');
            productDescription.innerHTML = product.description;

            //Insérer le prix
            let productPrice = document.querySelector('#price');
            productPrice.innerHTML = product.price;

            //Choix des couleurs
            let colorsProduct = document.querySelector('#colors');
            for (let i = 0; i < product.colors.length; i++) {
                let color = document.createElement('option');
                color.setAttribute('value', product.colors[i]);
                color.innerHTML = product.colors[i];
                colorsProduct.appendChild(color);
        
            }
            
            //bouton "ajouter au panier"

            let addToCart = document.querySelector('#addToCart');
            let productQuantity = document.querySelector('#quantity');
            let productAlt = product.altTxt;
            //lorsque je clique sur le bouton "ajouter au panier"
            addToCart.addEventListener('click', (event) => {
                //si la quantité est supérieur à 0, inférieur à 100 et que la couleur a été sélectionner
                if (productQuantity.value > 0 && productQuantity.value <= 100 && productQuantity.value != 0 && colorsProduct.value != "") {
                    event.preventDefault();

                    // création de l'objet pour les produits ajouter au panier
                    let productAdded = {
                        productName: product.name,
                        id: product._id,
                        colorsProduct: colorsProduct.value,
                        productQuantity: productQuantity.value,
                        productPrice: product.price,
                        productImg: product.imageUrl,
                        productAlt: product.altTxt,
                    }

                    // déclaration d'une variable dans laquelle on met les valeurs du local storage
                    let storedProduct = JSON.parse(localStorage.getItem('product'));
                    const color = colorsProduct.value;

                    //fenetre popup pour la redirection au panier
                    const popupConfirmation = () => {
                        //Si le visiteur clique sur 'OK' il sera rediriger au panier
                        if (confirm(`${product.name} ${colorsProduct.value} a bien été ajouté au panier
                    Souhaitez-vous consulter le panier ?`)) {
                            window.location.href = 'cart.html';
                            //Si il clique sur annuler il sera rediriger vers la page index.html
                        } else {
                            window.location.href = 'index.html';
                        }
                    }
                    if (storedProduct) {
                        //Si le panier contient des articles
                        let result = storedProduct.find((el) => el.id === product._id && el.colorsProduct === colorsProduct.value);
                        if (result) {
                            let newQuantite = parseInt(productAdded.productQuantity) + parseInt(result.productQuantity);
                            result.productQuantity = newQuantite;
                            localStorage.setItem('product', JSON.stringify(storedProduct));
                            console.table(storedProduct);
                            popupConfirmation();
                        }
                        else {
                            storedProduct.push(productAdded);
                            localStorage.setItem('product', JSON.stringify(storedProduct));
                            popupConfirmation();

                        }
                    } else {
                        storedProduct = [];
                        storedProduct.push(productAdded);
                        localStorage.setItem('product', JSON.stringify(storedProduct));
                        popupConfirmation();
                    }
                } else {
                    alert('Veuillez préciser la couleur et la quantité du produit choisi');
                }

            });
        } else {
            document.querySelector('.item__content').style.display = 'none';
            let indisponible = document.querySelector('.item__img');
            indisponible.innerHTML = `Ce produit n'est pas disponible pour le moment`;
        }
    } catch (error) {
        alert("Erreur : " + error);
    }
};

getProducts();

