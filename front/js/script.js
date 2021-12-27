// Récupération des données de l'API
const getProducts = async function () {
    let items_selector = document.querySelector('.items');
    try {
        //j'utilise fetch pour récupérer les données de l'API
        let response = await fetch('http://localhost:3000/api/products');
        //lorsque l'API est lancé les produits sont affichés
        if (response.ok) {
            let products = await response.json();

            products.forEach(function (product) {
                items_selector.innerHTML += `<a href="./product.html?id=${product._id}">
                    <article>
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p>
                    </article>
                  </a>`;
            });

            //lorsque l'API n'est pas lancé un texte "pas de produits disponible..." apparaît 
        } else {
            document.querySelector(".titles").querySelector("h2").innerText = "Pas de produits disponibles pour le moment.";
        }
    } catch (error) {
        document.querySelector(".titles").querySelector("h2").innerText = "Pas de produits disponibles pour le moment.";
    }
}

getProducts();
