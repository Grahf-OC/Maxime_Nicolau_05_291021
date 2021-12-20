const url = "http://localhost:3000/api/products";

const getStorage = () => {
  const cart = JSON.parse(localStorage.getItem("panier")) || [];

  return cart;

  /*if (cart == null) {
    return [];
  } else {
    return cart;
  }*/
};

const saveStorage = (cart) => {
  return localStorage.setItem("panier", JSON.stringify(cart));
};

/*Fonction qui innerHTML tous les objets présents dans le panier*/
const printCart = () => {
  let cart = getStorage();
  console.log(cart);

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

/*Fonction permettant de changer la quantité du produit depuis la page panier. Ajoute un évènement d'écoute de changement d'input sur tous les objets, 
qui récupère ensuite le parent le plus proche avec data-id, récupère ensuite l'ID de l'objet, puis change la quantité du produit dans le panier et le 
localstorage, en lui donnant la nouvelle valeur rentrée par l'utilisateur.*/

const changeQuantity = () => {
  document.querySelectorAll(".itemQuantity").forEach((el) => {
    el.addEventListener("change", (e) => {
      let cart = getStorage();
      let parent = e.target.closest("[data-id]");
      let id = parent.dataset.id;
      let color = parent.dataset.color;

      for (let product of cart) {
        if (product.id === id && product.color === color) {
          product.quantity = e.target.value;
        }
      }
      saveStorage(cart);
      showTotalPrice();
    });
  });
};

changeQuantity();

const removeProduct = () => {
  document.querySelectorAll(".deleteItem").forEach((el) => {
    el.addEventListener("click", (e) => {
      let cart = getStorage();

      let parent = e.target.closest("[data-id]");
      let id = parent.dataset.id;
      let color = parent.dataset.color;
      console.log(color);

      const newCart = cart.filter(
        (product) => product.id !== id || product.color !== color
      );

      saveStorage(newCart);
      showTotalPrice();

      console.log(newCart);
      parent.remove();
    });
  });
};

removeProduct();

const showQuantity = () => {
  let cart = getStorage();
  let totalQuantity = 0;

  for (let product of cart) {
    totalQuantity += parseInt(product.quantity);
    console.log(totalQuantity);
  }
  return (document.getElementById("totalQuantity").textContent = totalQuantity);
};

showQuantity();

const showTotalPrice = () => {
  let cart = getStorage();
  let totalPrice = 0;

  for (let product of cart) {
    totalPrice += product.quantity * product.price;
  }
  return (document.getElementById("totalPrice").textContent = totalPrice);
};

showTotalPrice();

