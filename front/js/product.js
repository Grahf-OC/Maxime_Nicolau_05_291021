// constante canapId stocke l'id de la page actuelle que l'on récupère avec searchParams.get
const url = new URL(window.location.href);
const canapId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${canapId}`;
let canap;

/*Si cart est égal à null, la fonction créée un array vide qu'elle stocke dans la constante cart. Si le localStorage n'est pas vide, 
son contenu est stocké dans la constante cart après avoir été parse car il était en JSON. Enfin, la fonction renvoie cart.*/
const getStorage = () => {
  const cart = JSON.parse(localStorage.getItem("panier")) || [];
  return cart;
};

//La fonction ajoute au local storage un objet qu'on passe en paramètre après l'avoir converti en JSON.
const saveStorage = (cart) => {
  return localStorage.setItem("panier", JSON.stringify(cart));
};

//Cette fonction envoie une requête GET à l'API pour récupérer les données du produit.
const fetchApi = () => {
  return fetch(urlProduct).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

/*On récupère les informations du canapé sur lequel l'utilisateur a cliqué.
On stocke le résultat renvoyé par l'API dans la variable canap et on la passe également en paramètre de la fonction addToCart.
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

/* La fonction addToCart écoute le clic sur le bouton addToCart, puis elle
récupère la quantité du produit définie par l'utilisateur, sa couleur et toutes les informations le concernant, puis les stocke
dans l'objet canapInfos.*/

const addToCart = (canap) => {
  document.getElementById("addToCart").addEventListener("click", () => {
    let canapInfos = {
      id: canapId,
      quantity: document.getElementById("quantity").value,
      color: document.getElementById("colors").value,
      image: canap.imageUrl,
      alt: canap.altTxt,
      name: canap.name,
      price: canap.price,
      description: canap.description,
    };
    console.log(canapInfos);

    let cart = getStorage();

    /* Cette fonction vérifie si l'id du produit est déjà présent avec cette couleur dans l'array panier. Si oui, elle augmente sa quantité de 1.
    Sinon, elle le push vers l'array cart. */
    const checkIfPresent = cart.find((product) => {
      return product.id === canapId && product.color === canapInfos.color;
    });
    //Vérifie si l'utilisateur a bien choisi une quantité et une couleur, sinon lui demande de le faire.
    if (canapInfos.quantity == 0 || canapInfos.color == 0) {
      alert("Veuillez choisir une couleur et une quantité svp.");
    } else {
      if (checkIfPresent != undefined) {
        //même chose que if (checkIfPresent)
        for (let product of cart) {
          if (product.id === canapId && product.color === canapInfos.color) {
            product.quantity++;
          }
        }
      } else {
        cart.push(canapInfos);
      }
      // L'array cart est ensuite converti en JSON, puis envoyé vers le local storage
      saveStorage(cart);
    }
  });
};
