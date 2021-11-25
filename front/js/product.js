// variable canadId stocke l'id de la page actuelle
const url = new URL(window.location.href);
const canapId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${canapId}`;
let canap;
let cartJson = localStorage.getItem("panier");
console.log(cartJson);
let cart;

if (cartJson == null) {
  cart = [];
} else {
  cart = JSON.parse(cartJson);
}

console.log(cart);

//Cette fonction envoie une requête GET à l'API pour récupérer les données du produit.
const fetchApi = () => {
  return fetch(urlProduct).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

/*On récupère les informations du canapé sur lequel l'utilisateur a cliqué.
On stocke le résultat renvoyé par l'API dans la variable canap.
On innerHTML ensuite les informations du canapé */

const getProduct = async () => {
  await fetchApi()
    .then((response) => {
      console.log(response);
      canap = response;
      addToCart(response);
    })
    .catch((err) => {
      console.log("error");
    });

  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${canap.imageUrl}" alt="${canap.altTxt}">`;
  document.getElementById("title").innerHTML = canap.name;
  document.getElementById("price").innerHTML = canap.price;
  document.getElementById("description").innerHTML = canap.description;
  document.getElementById("colors").innerHTML =
    "<option value=>--SVP, choisissez une couleur --</option>";

  for (let color of canap.colors) {
    document.getElementById(
      "colors"
    ).innerHTML += /*html*/ `<option value=${color}>${color}</option>`;
  }
};
getProduct();

const clickCart = document.getElementById("addToCart");
const getColor = document.getElementById("colors");
const getQty = document.getElementById("quantity");
const getImage = document.querySelector(".item__img");
const getName = document.getElementById("title");
const getPrice = document.getElementById("price");
const getDescription = document.getElementById("description");

/* cart est l'array du panier. La fonction addToCart écoute le clic sur le bouton addToCart, puis elle
récupère la quantité du produit définie par l'utilisateur, sa couleur et toutes les informations le concernant, puis les stocke
dans l'objet canapInfos.*/

const addToCart = (canap) => {
  clickCart.addEventListener("click", () => {
    let canapColor = getColor.value;
    let canapQty = getQty.value;
    let canapImage = canap.imageUrl;
    let canapAlt = canap.altTxt;
    let canapName = canap.name;
    let canapPrice = canap.price;
    let canapDescription = canap.description;
    console.log(canap);

    let canapInfos = {
      id: canapId,
      quantity: canapQty,
      color: canapColor,
      image: canapImage,
      alt: canapAlt,
      name: canapName,
      price: canapPrice,
      description: canapDescription,
    };
    console.log(canapInfos);

    /* Cette fonction vérifie si l'id du produit est déjà présent avec cette couleur dans l'array panier. Si oui, elle augmente sa quantité de 1.
    Sinon, elle le push vers l'array cart. */
    const checkIfPresent = cart.find((product) => {
      console.log(product);
      return product.id === canapId && product.color === canapColor;
    });
    console.log(checkIfPresent);

    if (canapQty == 0 || canapColor == 0) {
      alert("Veuillez choisir une couleur et une quantité svp.");
    } else {
      if (checkIfPresent != undefined) {
        //même chose que if (checkIfPresent)
        for (let product of cart) {
          if (product.id === canapId && product.color === canapColor) {
            product.quantity++;
            console.log(product.quantity);
          }
        }

        console.log(canapQty);
      } else {
        cart.push(canapInfos);
      }

      // L'array cart est ensuite transformé en JSON, puis envoyé vers le local storage

      let jsonCart = JSON.stringify(cart);
      localStorage.setItem("panier", jsonCart);
      

      console.log(jsonCart);
    }
  });
};

addToCart();


