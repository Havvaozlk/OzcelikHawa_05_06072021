// récuperer les données du localStorage
let storedProduct = JSON.parse(localStorage.getItem('product'));
console.table(storedProduct);
let itemCart = document.getElementById('cart__items');
let itemCards = [];
let products = [];

//Si le local storage est null ou égale à 0
if (storedProduct === null || storedProduct == 0) {
  //Le message 'votre panier est vide' apparait et le formulaire disparait
  let emptyCart = `<p>Votre panier est vide </p>`;
  itemCart.innerHTML = `<p>Votre panier est vide </p>`;
  document.querySelector('.cart__order').style.display = 'none';

} else {
  //si i est plus petit que le nombre de produit stocké on incrémente
  //la boucle se répète donc pour chaque produit stocké
  for (i = 0; i < storedProduct.length; i++) {
    products.push(storedProduct[i].id);

    itemCards = itemCards + `
        <article class="cart__item" data-id="${storedProduct[i].id}" data-color="${storedProduct[i].colorsProduct}">
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
  } //si i est égale au nombre de produits stockés 
  if (i === storedProduct.length) {
    itemCart.innerHTML += itemCards;
  }
}

//fonction pour le total des quantitées
function getTotals() {

  //récuperer le total des quantitées
  let productQty = document.getElementsByClassName('itemQuantity');
  let qtyLength = productQty.length,
    totalQty = 0;

    //si i est inférieur à la quantité de produits 
  for (var i = 0; i < qtyLength; ++i) {
    totalQty += productQty[i].valueAsNumber;
  }

  let productTotalQty = document.querySelector('#totalQuantity');
  productTotalQty.innerHTML = totalQty;

  //récupérer le prix total
  let totalPrice = 0;

  for (var i = 0; i < length; ++i) {
    totalPrice += (productQty[i].valueAsNumber * storedProduct[i].productPrice);
  }

  let productTotalPrice = document.querySelector('#totalPrice');
  productTotalPrice.innerHTML = totalPrice;
}
getTotals();

//modification de la quantité
function modifyQty() {
  let modifQty = document.querySelectorAll('.itemQuantity');

  for (let k = 0; k < modifQty.length; k++) {
    modifQty[k].addEventListener('change', (event) => {
      event.preventDefault();

      let modifyQuantity = storedProduct[k].productQuantity;
      let quantityModifValue = modifQty[k].valueAsNumber;
      storedProduct[k].productQuantity = quantityModifValue;
      localStorage.setItem('product', JSON.stringify(storedProduct));
      getTotals();
    })
  }
}
modifyQty();


// fonction pour supprimer un produit
function deleteProduct() {
  let btnSupprimer = document.querySelectorAll('.deleteItem');

  for (let l = 0; l < btnSupprimer.length; l++) {

    btnSupprimer[l].addEventListener('click', (event) => {
      //  alert('Voulez-vous supprimer ce produit ?')
      if (confirm('Voulez-vous supprimer ce produit ?')) {
        event.preventDefault();

        let idSelectionnerSuppression = storedProduct[l].id;

        // methode filter pour selectionner les éléments à garder et supprimer le reste
        storedProduct = storedProduct.filter(el => el.id !== idSelectionnerSuppression);

        //on envoie la variable dans le localStorage
        localStorage.setItem('product', JSON.stringify(storedProduct));

        //alerte pour avertir que le produit a été supprimé
        alert('Ce produit a bien été supprimé du panier');
        window.location.href = 'cart.html';

      } else {

      }
    })
  }



}
deleteProduct();
//---------------------------------------------------------------------
//j'envoie le formulaire dans le serveur
function postForm() {
  let order = document.querySelector('#order');
  order.addEventListener('click', (event) => {
    event.preventDefault();

    //je récupère les données du formulaire dans un objet 
    let contact = {
      firstName: document.querySelector('#firstName').value,
      lastName: document.querySelector('#lastName').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value,
      email: document.querySelector('#email').value,
    }

    //vérifier la validation des entrées
    //prénom
    function controlFirstName() {
      let validFirstName = contact.firstName;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
        let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
        firstNameErrorMsg.style.display = 'none';
        return true;



      } else {
        //let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champs";
      }
    }

    //controle nom
    function controlName() {
      const validName = contact.lastName;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        lastNameErrorMsg.style.display = 'none';
        return true;
      } else {
        lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champs";
      }
    }

    //controle adresse
    function controlAddress() {
      const validAddress = contact.address;
      if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(validAddress)) {
        let addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.style.display = 'none';
        return true;
      } else {
        addressErrorMsg.innerHTML = "Veuillez renseigner ce champs";
      }
    }

    // contrôle ville
    function controlCity() {
      const validAddress = contact.city;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(validAddress)) {
        let cityErrorMsg = document.getElementById('cityErrorMsg');
        cityErrorMsg.style.display = 'none';
        return true;
      } else {
        cityErrorMsg.innerHTML = "Veuillez renseigner ce champs";
      }
    }
    // contrôle email
    function controlEmail() {
      const validEmail = contact.email;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
        let emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.style.display = 'none';
        return true;
      } else {
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


    //ajouter dans un objet
    let sendFormData = {
      contact,
      products,
    }

    let options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: {
        'Content-Type': 'application/json',
      }
    }


    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        //localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = 'confirmation.html?id=' + data.orderId;
        }
      })

  })
}
postForm();





