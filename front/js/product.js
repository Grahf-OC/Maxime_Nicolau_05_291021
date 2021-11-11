// variable canadId stocke l'id de la page actuelle
let url = new URL(window.location.href);
let canapId = url.searchParams.get("id");
let urlProduct = `http://localhost:3000/api/products/${canapId}`;
let canap;

const fetchApi = () => {
  return fetch(urlProduct).then(function (res) {
    if (res.ok) {
      return res.json();
    }
  });
};

/*On récupère les informations du canapé sur lequel l'utilisateur a cliqué.
On stocke le résultat renvoyé par l'API dans la variable canap.
On innerHTML ensuite les informations du canapé */

async function getProduct() {
  await fetchApi()
    .then(function (response) {
      console.log(response);
      canap = response;
    })
    .catch(function (err) {
      console.log("error");
    });

  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${canap.imageUrl}" alt="${canap.altTxt}">`;
  document.getElementById("title").innerHTML = canap.name;
  document.getElementById("price").innerHTML = canap.price;
  document.getElementById("description").innerHTML = canap.description;
  document.getElementById(
    "colors"
  ).innerHTML = `<option value="">--SVP, choisissez une couleur --</option><option value=${canap.colors[0]}>${canap.colors[0]}</option>
  <option value=${canap.colors[1]}>${canap.colors[1]}</option>`;
}

getProduct();
