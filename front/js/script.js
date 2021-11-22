let getCanap = document.getElementById("items");
const url = "http://localhost:3000/api/products";

//on récupère avec la méthode GET par défaut les données depuis l'API et on passe la réponse à notre fonction displayProducts
fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    displayProducts(response);
  })
  .catch((err) => {
    console.log("error");
  });

/*on utilise la fonction qui a récupéré la réponse de l'API pour créer
une boucle qui parcoure les produits renvoyés et innerHTML les informations de chaque canapé*/

const displayProducts = (products) => {
  for (let product of products) {
    getCanap.innerHTML += /*html*/ `
            <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
  }
}

window.setTimeout(function () {
  console.log("ok");
}, 1000);

window.setTimeout(() => {
  console.log("ok");
}, 1000);

window.setTimeout(function (bonjour, coucou, salut) {
  console.log(bonjour, coucou, salut);
}, 1000);

window.setTimeout((bonjour, coucou, salut) => {
  console.log(bonjour, coucou, salut);
}, 1000);

window.setTimeout(function (bonjour) {
  console.log(bonjour);
}, 1000);

window.setTimeout((bonjour) => {
  console.log(bonjour);
}, 1000);

window.setTimeout((bonjour) => {
  console.log(bonjour);
}, 1000);



/*fetch(url)
  .then((res)=> res.json())
  .then((response)=> {
    displayProducts(response);
  });*/
