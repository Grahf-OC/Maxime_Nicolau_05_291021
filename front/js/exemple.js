let getCanap = document.getElementById("items");
const url = "http://localhost:3000/api/products";
let products;

//on récupère avec la méthode GET par défaut les données depuis l'API
const fetchApi = () => {
  return fetch(url).then(function (res) {
    if (res.ok) {
      return res.json();
    }
  });
};

/*on stocke le résultat renvoyé par l'api dans la variable products
la boucle parcoure les produits renvoyés et innerHTML les informations de chaque canapé*/

async function displayProducts() {
  await fetchApi()
    .then(function (response) {
      console.log(response);
      products = response;
    })
    .catch(function (err) {
      console.log("error");
    });

  for (let product of products) {
    getCanap.innerHTML += `
            <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
  }
}

displayProducts();
