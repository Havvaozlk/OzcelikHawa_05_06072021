// Récuperer les articles de l'API

//const url="http://localhost:3000/api/products";

/*async function getProducts () {
    const requete = await fetch(url)
    return await requete.json();
}

async function fillSection() {
    var result = await getProducts ()
    .then(function (resultatAPI){
        console.table(articles);
        for (let article in articles) {

            //Inserer l'élément "a"
            let insererLien = document.createElement('a');



        }
    }
}*/
/*try{
async function getProducts() {
    const requete = await fetch(url, {
        method: 'GET'
      });
      
      if(!requete.ok) {
        alert('Un problème est survenu.');
      } else {
        let donnees = await requete.json();
        /*console.log(donnees);
      }
    }*/

const getProducts = async function() {

    try {
        let response = await fetch('http://localhost:3000/api/products');
            if (response.ok) {
                let products = await response.json();
                console.log(products);
            
    
            for (let product in products) {
                    /*const productsSection = document.getElementById('items');*/

                    //Insertion du lien
                    let productLink = document.createElement("a");
                    document.querySelector(".items").appendChild(productLink);
                    productLink.href=`./product.html?id=${products[product]._id}`;

                    //Insertion de l'élément article
                    let productArticle = document.createElement("article");
                    productLink.appendChild(productArticle);

                    //Insertion de l'image
                    let productImg = document.createElement("img");
                    productArticle.appendChild(productImg);
                    productImg.src = products[product].imageUrl;
                    productImg.alt = products[product].altTxt;

                    //Insertion du titre
                    let productName = document.createElement("h3");
                    productArticle.appendChild(productName);
                    productName.classList.add("productName");
                    productName.innerHTML = products[product].name;
                    console.log(productName);

                    //Insertion de la description
                    let productDescription = document.createElement("p");
                    productArticle.appendChild(productDescription);
                    productDescription.classList.add("productDescription");
                    productDescription.innerHTML = products[product].description;
                    console.log(productDescription);
                } 
            } else {
                console.error('Retour du serveur : ', response.status);
                alert('Erreur rencontrée : ' + response.status);
                    } 
    } catch (error) {
    alert("Erreur : " + error);
}
}

getProducts();


/*
}
catch(error) {
        console.error();
};



    /*fetch(url).then((response) => 
    response.json() .then((data) => console.log(data))
    );*/


