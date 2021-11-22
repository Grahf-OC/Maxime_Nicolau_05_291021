// variable canadId stocke l'id de la page actuelle
const url = new URL(window.location.href);
const canapId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${canapId}`;
let canap;

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
  document.getElementById(
    "colors"
  ).innerHTML = /*html*/ `<option value="">--SVP, choisissez une couleur --</option><option value=${canap.colors[0]}>${canap.colors[0]}</option>
  <option value=${canap.colors[1]}>${canap.colors[1]}</option>`;
};
getProduct();

//On créée l'objet canap contenant les infos choisies par l'utilisateur, afin d'ensuite l'envoyer vers le local storage

const clickCart = document.getElementById("addToCart");
const getColor = document.getElementById("colors");
const getQty = document.getElementById("quantity");
let cart = [];

const addToCart = () => {
  clickCart.addEventListener("click", () => {
    let canapColor = getColor.value;
    let canapQty = getQty.value;
    let canapInfos = {
      id: canapId,
      quantity: canapQty,
      color: canapColor,
    };
    console.log(canapId);
    console.log(canapColor);

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

      localStorage.setItem("produit", cart);
      JSON.stringify(canapInfos);
      console.log(cart);
    }
  });
};

addToCart();
