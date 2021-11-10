let getCanap = document.getElementById("items");

const fetchApi = async () => {
  let res = await fetch("http://localhost:3000/api/products");
  return await res.json();
};

function displayProducts() {
  fetchApi().then((results) => {
    let products = results;

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
  });
}

displayProducts();
