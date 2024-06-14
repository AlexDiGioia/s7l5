//const prodListURL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmQ2MjdjMjM5YzAwMTUyZjRiNTciLCJpYXQiOjE3MTgzNTMyNTAsImV4cCI6MTcxOTU2Mjg1MH0.uo_xzwgqqL1y4WS-2RchZcv7Y67acFOjFKHoLbjnqUA";

const query = new URLSearchParams(window.location.search).get("productId");

console.log("Query:", query);

const prodListURL = query
  ? "https://striveschool-api.herokuapp.com/api/product/" + query
  : "https://striveschool-api.herokuapp.com/api/product/";
console.log("url:", prodListURL);
const method = query ? "PUT" : "POST"; //se esiste già lo modifica se no lo crea

window.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.onsubmit = saveProduct;

  const title=document.getElementById("title");
  
});

const saveProduct = (e) => {
  const newProduct = {
    name: e.target.elements.name.value,
    description: e.target.elements.description.value,
    imgUrl: e.target.elements.imgUrl.value,
    brand: e.target.elements.brand.value,
    price: e.target.elements.price.value,
  };

  fetch(prodListURL, {
    body: JSON.stringify(newAppointment),
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nell'inserimento del prodotto");
      }
    })
    .then((newProd) => {
      if (query) {
        alert(
          `Prodotto ${newProd.name} con id: ${newProd._id} modificato con successo!`
        );
      } else {
        alert(
          `Prodotto ${newProduct.name} con id: ${newProduct._id} aggiunto con successo!`
        );
        e.target.reset();
      }
    })
    .catch((err) => console.log(err));
};
