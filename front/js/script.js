const url = "http://localhost:3000/api/products";
let cartJson = localStorage.getItem("panier");
console.log(cartJson);

//on récupère avec la méthode GET par défaut les données depuis l'API et on passe la réponse à notre fonction displayProducts
fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    displayProducts(response);
    
    console.log(response);
  })
  .catch((err) => {
    console.log("error");
  });

/*on utilise la fonction qui a récupéré la réponse de l'API pour créer
une boucle qui parcoure les produits renvoyés et innerHTML les informations de chaque canapé*/

const displayProducts = (products) => {
  for (let product of products) {
    let productClick = document.createElement("a");
    productClick.href = `./product.html?id=${product._id}`;
    document.getElementById("items").appendChild(productClick);
    productClick.innerHTML = /*html*/`<article>
<img src="${product.imageUrl}" alt="${product.altTxt}">
<h3 class="productName">${product.name}</h3>
<p class="productDescription">${product.description}</p>
</article>`;

  } 
};

