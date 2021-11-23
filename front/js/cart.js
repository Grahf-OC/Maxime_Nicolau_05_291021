const url = "http://localhost:3000/api/products";
let cartJson = localStorage.getItem("panier");
let cart = JSON.parse(cartJson);

console.log(cart);


const printCart = () => {
  for (let canap of cart) {

    document.getElementById("cart__items").innerHTML +=
      /*html*/
      `<article class="cart__item" data-id=${canap.id} data-color=${canap.color}>
    <div class="cart__item__img">
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
    </div>
  </article>;`
  }
};

printCart();
