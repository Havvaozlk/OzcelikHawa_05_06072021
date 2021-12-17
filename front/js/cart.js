// récuperer les données du localStorage
/*let storedProduct = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProduct);*/

let products = [];
let storedProduct = JSON.parse(localStorage.getItem('product'));
console.table(storedProduct);
//const positionEmptyCart = document.querySelector('#cart__items');
let itemCart = document.getElementById('cart__items');
let itemCards = [];
//let product = storedProduct[product(0)];
//console.log(product);

//function getCart() {
if(storedProduct === null || storedProduct == 0) {
    //let emptyCart = `<p>Votre panier est vide </p>`;
    //itemCart.innerHTML = `<p>Votre panier est vide </p>`;
} else {
    // itemCards = [];


    for (i = 0; i < storedProduct.length; i++) {
        products.push(storedProduct[i].id);

        itemCards = itemCards + `
        <article class="cart__item" data-id="${storedProduct[i].id}" data-color="${storedProduct.color}">
                <div class="cart__item__img">
                  <img src="${storedProduct[i].productImg}" alt="${storedProduct[i].productAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${storedProduct[i].productName}</h2>
                    <p>${storedProduct[i].colorsProduct}</p>
                    <p>${storedProduct[i].productPrice} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storedProduct[i].productQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;
    }
    if (i === storedProduct.length) {
        //const itemCart = document.getElementById('cart__items');
       itemCart.innerHTML += itemCards;
    }
    

}


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

deleteProduct();
}
//---------------------------------------------------------------------
//j'envoie le formulaire dans le serveur
function postForm() {
    let order = document.querySelector('#order');
    order.addEventListener('click', (event) => {
        event.preventDefault();

        //je récupère les données du formulaire dans un objet 
        let contact = {
            firstName : document.querySelector('#firstName').value,
            lastName : document.querySelector('#lastName').value,
            address : document.querySelector('#address').value,
            city : document.querySelector('#city').value,
            email : document.querySelector('#email').value,
        }

        //vérifier la validation des entrées
        //prénom
        function controlFirstName() {
            let validFirstName = contact.firstName;
            if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
                return true;

            } else {
                let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
                firstNameErrorMsg.innerHTML = "Merci de vérifier le prénom, 3 caractères minimum";
            }
        }

        //controle nom
        function controlName() {
            const validName = contact.lastName;
            if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
              return true;
            } else {
              let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
              lastNameErrorMsg.innerHTML = "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";
            }
          }

          //controle adresse
          function controlAddress() {
            const validAddress = contact.address;
             if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validAddress)) {
              return true;
            } else {
              let addressErrorMsg = document.getElementById('addressErrorMsg');
              addressErrorMsg.innerHTML = "Merci de vérifier l'adresse, alphanumérique et sans caractères spéciaux";
            }
          } 

         // contrôle ville
  function controlCity() {
    const validAddress = contact.city;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(validAddress)) {
      return true;
    } else {
      let cityErrorMsg = document.getElementById('cityErrorMsg');
      cityErrorMsg.innerHTML = "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
    }
  } 
// contrôle email
function controlEmail() {
    const validEmail = contact.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
      return true;
    } else {
      let emailErrorMsg = document.getElementById('emailErrorMsg');
      emailErrorMsg.innerHTML = "Erreur ! Email non valide";
    }
  }

  //Envoie dans le localStorage
  function validControl() {
    if (controlFirstName() && controlName() && controlAddress() && controlCity() && controlEmail()) {
        localStorage.setItem('contact', JSON.stringify(contact));
        return true;
      } else {
          alert('Merci de revérifier les données du formulaire')
        }
    }
    validControl();

    //ajouter dans un objet
    let sendFormData = {
        contact,
        products,
    }

    let options = {
        method: 'POST',
        body: JSON.stringify(sendFormData),
        headers: {
            'Content-Type' : 'application/json',
        }
    }

    fetch("http://localhost:3000/api/products/order", options)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = 'confirmation.html?id=' + data.orderId;
        }
    })

    })
}
postForm();





