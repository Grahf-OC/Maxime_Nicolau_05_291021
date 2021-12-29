/*Récupère l'id présent dans l'url qui correspond au numéro de commande et l'affiche sur la page.*/

const printOrderId = () => {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("id");
  document.getElementById("orderId").innerText = orderId;
};

printOrderId();
