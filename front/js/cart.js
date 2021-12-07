// récuperer les données du localStorage
/*let storedProduct = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProduct);*/

let storedProduct = JSON.parse(localStorage.getItem('product'));
console.table(storedProduct);
const positionEmptyCart = document.querySelector('#cart__items');
//let product = storedProduct[product(0)];
//console.log(product);

function getCart() {
if(storedProduct === null || storedProduct == 0) {
    let emptyCart = `<p>Votre panier est vide </p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {
    for (let product in storedProduct) {
        //création article
        let cartArticle = document.createElement('article');
        document.querySelector('#cart__items').appendChild(cartArticle);
        cartArticle.className = 'cart__item';
        cartArticle.setAttribute('data-id', storedProduct[product].id);
        cartArticle.dataset.color = '{product-color}';
        

        //creation div
        let cartDiv = document.createElement('div');
        document.querySelector('.cart__item').appendChild(cartDiv);
        cartDiv.className = 'cart__item__img';

        //creation img
        let cartImg = document.createElement('img');
        document.querySelector('.cart__item__img').appendChild(cartImg);
        cartImg.src = storedProduct[product].productImg;
        cartImg.alt = storedProduct[product].productAlt;

        //creation second div
        let cartDiv2 = document.createElement('div');
        document.querySelector('.cart__item').appendChild(cartDiv2);
        cartDiv2.className = "cart__item__content";

        //creation troisieme div
        let CartDiv3 = document.createElement('div');
        document.querySelector('.cart__item__content').appendChild(CartDiv3);
        CartDiv3.className = 'cart__item__content__description';

        //creation h2
        let cartName = document.createElement('h2');
        document.querySelector('.cart__item__content__description').appendChild(cartName);
        cartName.innerHTML = storedProduct[product].productName;

        //creation couleur
        let cartColor = document.createElement('p');
        document.querySelector('.cart__item__content__description').appendChild(cartColor);
        cartColor.innerHTML = storedProduct[product].colorsProduct;

        //creation prix
        let cartPrice = document.createElement('p');
        document.querySelector('.cart__item__content__description').appendChild(cartPrice);
        cartPrice.innerHTML = storedProduct[product].productPrice + ' €';

        //insérer div
        let cartDiv4 = document.createElement('div');
        document.querySelector('.cart__item__content').appendChild(cartDiv4);
        cartDiv4.className = 'cart__item__content__settings';

        //insérer div
        let cartDiv5 = document.createElement('div');
        document.querySelector('.cart__item__content__settings').appendChild(cartDiv5);
        cartDiv5.className = 'cart__item__content__settings__quantity';

        //insérer p
        let cartQuantity = document.createElement('p');
        document.querySelector('.cart__item__content__settings__quantity').appendChild(cartQuantity);
        cartQuantity.innerHTML = "Qté : ";

        //insérer input
        let cartInput = document.createElement('input');
        document.querySelector('.cart__item__content__settings__quantity').appendChild(cartInput);
        cartInput.setAttribute('type', 'number');
        cartInput.className = 'itemQuantity';
        cartInput.setAttribute('min', '1');
        cartInput.setAttribute('max', '100');
        cartInput.value = storedProduct[product].productQuantity;

        //insérer div
        let cartDiv6 = document.createElement('div');
        document.querySelector('.cart__item__content__settings').appendChild(cartDiv6);
        cartDiv6.className = 'cart__item__content__settings__delete';

        //insérer p
        let cartSupp = document.createElement('p');
        document.querySelector('.cart__item__content__settings__delete').appendChild(cartSupp);
        cartSupp.className = 'deleteItem';
        cartSupp.innerHTML = 'Supprimer';

    }
}
}
getCart();

function getTotals(){

    //récuperer le total des quantitées
    let productQty = document.getElementsByClassName('itemQuantity');
    let length = productQty.length, 
    totalQty = 0;

    for (var i = 0; i < length; ++i) {
        totalQty += productQty[i].valueAsNumber;
    }

    let productTotalQty = document.querySelector('#totalQuantity');
    productTotalQty.innerHTML = totalQty;
    console.log(totalQty);

    //récupérer le prix total
    let totalPrice = 0;

    for (var i = 0; i < length; ++i) {
        totalPrice += (productQty[i].valueAsNumber * storedProduct[i].productPrice);
    }

    let productTotalPrice = document.querySelector('#totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

//modification de la quantité
function modifyQty() {
    let modifQty = document.querySelectorAll('.itemQuantity');

    for (let k = 0; k < modifQty.length; k++) {
        modifQty[k].addEventListener('change' , (event) => {
            event.preventDefault();

            let modifyQuantity = storedProduct[k].productQuantity;
            let quantityModifValue = modifQty[k].valueAsNumber;

            let result = storedProduct.find((el) => el.quantityModifValue !== modifyQuantity);

            result.productQuantity = quantityModifValue;
            storedProduct[k].productQuantity = result.productQuantity;

            localStorage.setItem('product', JSON.stringify(storedProduct));

            location.reload();
        })
    }
}
modifyQty();


// fonction pour supprimer un produit
function deleteProduct() {
let btnSupprimer = document.querySelectorAll('.deleteItem');
console.log(btnSupprimer);

for (let l = 0; l < btnSupprimer.length; l++){
    btnSupprimer[l].addEventListener('click' , (event) => {
        event.preventDefault();
        console.log(event);

        let idSelectionnerSuppression = storedProduct[l].id;
        console.log('idSelectionnerSuppression');
        console.log(idSelectionnerSuppression);

        // methode filter pour selectionner les éléments à garder et supprimer le reste
        storedProduct = storedProduct.filter( el => el.id !== idSelectionnerSuppression);
        console.log(storedProduct);

        //on envoie la variable dans lo localStorage
        localStorage.setItem('product', JSON.stringify(storedProduct));

        //alerte pour avertir que le produit a été supprimé
        alert('Ce produit a bien été supprimé du panier');
        window.location.href = 'cart.html';
        
    })
}
}
deleteProduct();
//------------------------------------------------------------
/*//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

//Envoi des informations client au localstorage
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.id);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();*/





