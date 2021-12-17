const getProducts = async function() {
    var items_selector = document.querySelector('.items');

    try {
        let response = await fetch('http://localhost:3000/api/products');
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
    
             
            } else {
                document.querySelector(".titles").querySelector("h2").innerText = "Pas de produits disponibles pour le moment.";
                    } 
    } catch (error) {
        document.querySelector(".titles").querySelector("h2").innerText = "Pas de produits disponibles pour le moment.";
}
}

getProducts();
