let url = new URL(window.location.href);
let canapId = url.searchParams.get("id");
let urlProduct = `http://localhost:3000/api/products/${canapId}`;
console.log(urlProduct);

const fetchApi = async () => {
  let res = await fetch(urlProduct);
  return await res.json();
};

function getProduct() {
  fetchApi().then((result) => {
    let canap = result;
    console.log(canap);

    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src="${canap.imageUrl}" alt="${canap.altTxt}">`;
    document.getElementById("title").innerHTML = canap.name;
    document.getElementById("price").innerHTML = canap.price;
    document.getElementById("description").innerHTML = canap.description;
  });
}
getProduct();
