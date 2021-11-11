let getCanap = document.getElementById("items");
const url = "http://localhost:3000/api/products";

//on récupère avec la méthode GET par défaut les données depuis l'API et on passe la réponse à notre fonction displayProducts
fetch(url)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (response) {
    console.log(response);

    displayProducts(response);
  })
  .catch(function (err) {
    console.log("error");
  });

/*on utilise la fonction qui a récupéré la réponse de l'API pour créer
une boucle qui parcoure les produits renvoyés et innerHTML les informations de chaque canapé*/

function displayProducts(product) {
  for (let i in product) {
    getCanap.innerHTML += `
            <a href="./product.html?id=${product[i]._id}">
            <article>
              <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
              <h3 class="productName">${product[i].name}</h3>
              <p class="productDescription">${product[i].description}</p>
            </article>
          </a>`;
  }
}

displayProducts();
