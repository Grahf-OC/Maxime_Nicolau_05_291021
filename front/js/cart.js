const url = "http://localhost:3000/api/products";

const getStorage = () => {
  const cart = JSON.parse(localStorage.getItem("panier")) || [];

  return cart;
};

const saveStorage = (cart) => {
  return localStorage.setItem("panier", JSON.stringify(cart));
};

/*La fonction récupère d'abord le contenu du local storage. Ensuite, à l'aide d'une boucle forEach, 
elle créée un élément article dans le html pour chaque objet que contient le local storage et les ajoute au DOM (appendChild). 
Elle ajoute ensuite une classe à cet article, puis lui passe les attributs data-id et data-color.
Enfin, elle innerHTML les informations de l'article (nom, couleur, prix, image, quantité choisie)*/

const printCart = () => {
  let cart = getStorage();

  cart.forEach((canap) => {
    let cartItems = document.getElementById("cart__items");
    let article = document.createElement("article");
    cartItems.appendChild(article);
    article.classList.add("cart__item");
    article.setAttribute("data-id", `${canap.id}`);
    article.setAttribute("data-color", `${canap.color}`);
    article.innerHTML = /*html*/ `<div class="cart__item__img">
  <img src="${canap.image}" alt="${canap.alt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${canap.name}</h2>
    <p>${canap.color}</p>
    <p>${canap.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>`;
  });
};

printCart();

/*Fonction permettant de changer la quantité du produit depuis la page panier. Ajoute un évènement d'écoute 
de changement d'input sur tous les champs d'input de quantité, qui récupère ensuite le parent le plus proche grâce à son data-id. 
Ensuite une boucle parcoure le contenu du cart pour trouver le produit grâce à son id et sa couleur
 puis change la quantité du produit dans le panier et le localstorage, en lui donnant la nouvelle valeur rentrée par l'utilisateur.*/

const changeQuantity = () => {
  document.querySelectorAll(".itemQuantity").forEach((el) => {
    el.addEventListener("change", (e) => {
      let cart = getStorage();
      let parent = e.target.closest("[data-id]");

      for (let product of cart) {
        if (
          product.id === parent.dataset.id &&
          product.color === parent.dataset.color
        ) {
          product.quantity = e.target.value;
        }
      }
      saveStorage(cart);
      showTotalPrice();
      showQuantity();
      console.log(cart);
    });
  });
};

changeQuantity();

/*Fonction permettant de supprimer un produit du panier. Ajoute un événement d'écoute sur le clic de tous les boutons
supprimer. On récupère ensuite le parent le plus proche grâce à son data-id. Ensuite on récupère un nouvel array qui
ne contient plus le produit qui a été supprimé. On met ensuite le local storage à jour et on supprime également le produit du DOM.*/

const removeProduct = () => {
  document.querySelectorAll(".deleteItem").forEach((el) => {
    el.addEventListener("click", (e) => {
      let cart = getStorage();

      let parent = e.target.closest("[data-id]");

      const newCart = cart.filter(
        (product) =>
          product.id !== parent.dataset.id ||
          product.color !== parent.dataset.color
      );

      saveStorage(newCart);
      showTotalPrice();
      showQuantity();

      console.log(newCart);
      parent.remove();
    });
  });
};

removeProduct();

/*Fonction qui affiche la quantité totale des produits présents dans le panier.*/

const showQuantity = () => {
  let cart = getStorage();
  let totalQuantity = 0;

  for (let product of cart) {
    totalQuantity += parseInt(product.quantity);
  }
  return (document.getElementById("totalQuantity").textContent = totalQuantity);
};

showQuantity();

/*Fonction qui affiche le prix total de la somme des produits présents dans le panier.*/

const showTotalPrice = () => {
  let cart = getStorage();
  let totalPrice = 0;

  for (let product of cart) {
    totalPrice += product.quantity * product.price;
  }
  return (document.getElementById("totalPrice").textContent = totalPrice);
};

showTotalPrice();

//..............................................FORMULAIRE...........................................

/*Vérifie à l'aide d'une expression régulière que les informations écrites par l'utilisateur 
dans les différents champs correspondent à ce qui est demandé*/

const isInputValid = (inputId, regex) => {
  let doc = document.getElementById(inputId);
  if (regex.test(doc.value)) {
    return true;
  } else {
    return false;
  }
};

//Vérification du firstName

let docFirstName = document.getElementById("firstName");

docFirstName.addEventListener("change", () => {
  let messFirstName = document.getElementById("firstNameErrorMsg");
  const isFirstNameValid = isInputValid("firstName", /^[a-zA-Z\.\-\s]+$/);
  if (isFirstNameValid) {
    messFirstName.textContent = "";
  } else {
    messFirstName.textContent = "Prénom non valide";
  }
});

//Vérification du lastName

let docLastName = document.getElementById("lastName");

docLastName.addEventListener("change", () => {
  let messLastName = document.getElementById("lastNameErrorMsg");
  const isLastNameValid = isInputValid("lastName", /^[a-zA-Z\.\-\s]+$/);
  if (isLastNameValid) {
    messLastName.textContent = "";
  } else {
    messLastName.textContent = "Nom non valide";
  }
});

//Vérification adresse

let docAddress = document.getElementById("address");

docAddress.addEventListener("change", () => {
  let messAddress = document.getElementById("addressErrorMsg");
  const isAddressValid = isInputValid("address", /^[\w-\.\-\s,]+$/);
  if (isAddressValid) {
    messAddress.textContent = "";
  } else {
    messAddress.textContent = "Adresse non valide";
  }
});

//Vérification code postal + ville

let docCity = document.getElementById("city");

docCity.addEventListener("change", () => {
  let messCity = document.getElementById("cityErrorMsg");
  const isCityValid = isInputValid(
    "city",
    /^([\d\s]{5,6})+[,\s]+[\w-\.\-\s,]+$/
  );
  if (isCityValid) {
    messCity.textContent = "";
  } else {
    messCity.textContent =
      " Code postal de 5 chiffres puis un espace suivi de ville";
  }
});

//Vérification du mail

let docMail = document.getElementById("email");

docMail.addEventListener("change", () => {
  let messMail = document.getElementById("emailErrorMsg");
  const isEmailValid = isInputValid(
    "email",
    /^([\w-\.]{1,15})+@([\w-]+\.)+[\w-]{2,4}$/g
  );
  if (isEmailValid) {
    messMail.textContent = "";
  } else {
    messMail.textContent = "Mail non valide";
  }
});

/*Ajoute un événement d'écoute sur le bouton commander, au  clic. 
Vérifie si les informations du formulaire sont correctes. Si oui, créée l'objet contact qui contient
 les informations du formulaire. Créée ensuite la variable order qui contient l'objet contact
  et les id du contenu du panier. Envoie ensuite une requête POST à l'api contenant l'objet order en JSON.
   L'api renvoie un réponse contenant l'id de commande, qu'on passe à l'url de confirmation. 
   Puis on vide le local storage avant de renvoyer l'utilisateur sur la page de confirmation.
*/

const sendCommand = () => {
  document.getElementById("order").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      isInputValid("firstName", /^[a-zA-Z\.\-\s]+$/) &&
      isInputValid("lastName", /^[a-zA-Z\.\-\s]+$/) &&
      isInputValid("address", /^[\w-\.\-\s,]+$/) &&
      isInputValid("city", /^([\d\s]{5,6})+[,\s]+[\w-\.\-\s,]+$/) &&
      isInputValid("email", /^([\w-\.]{1,15})+@([\w-]+\.)+[\w-]{2,4}$/g)
    ) {
      let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };

      let cart = getStorage();
      let products = cart.map((product) => product.id);
      let order = {
        contact,
        products,
      };

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())

        .then((data) => {
          localStorage.clear();
          window.location.href = `confirmation.html?id=${data.orderId}`;
        })
        .catch(() => {
          console.log("FetchError");
        });
    }
  });
};

sendCommand();
