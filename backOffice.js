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

const saveProduct = (e) => {
  e.preventDefault();

  //const newProduct = {
  //  name: e.target.elements.name.value,
  //  description: e.target.elements.description.value,
  //  brand: e.target.elements.brand.value,
  //  imgUrl: e.target.elements.imgUrl.value,
  //  price: e.target.elements.price.value
  //};

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };
  console.log(newProduct);

  fetch(prodListURL, {
    body: JSON.stringify(newProduct),
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((resp) => {
      console.log("resp", resp);

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
          `Prodotto ${newProd.name} con id: ${newProd._id} aggiunto con successo!`
        );
        e.target.reset();
      }
    })
    .catch((err) => console.log(err));
};

const deleteProduct = () => {
  console.log("elimina");
  const hasConfirmed = confirm(
    "sei sicuro di voler eliminare questo prodotto??"
  );

  if (hasConfirmed) {
    fetch(prodListURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedProduct) => {
        alert("Hai eliminato il prodotto " + deletedProduct.name);
        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};

window.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.onsubmit = saveProduct;

  const title = document.getElementById("title");
  const submitBtn = document.getElementById("submitBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  if (query) {
    title.innerText = "Modifica Dati Prodotto";
    submitBtn.innerText = "Modifica";
    deleteBtn.classList.remove("d-none");
    deleteBtn.onclick = deleteProduct;

    fetch(prodListURL, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((productObj) => {
        const { name, brand, description, imageUrl, price } = productObj;

        document.getElementById("name").value = name;
        document.getElementById("brand").value = brand;
        document.getElementById("description").value = description;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch((err) => console.log(err));
  } else {
    title.innerText = "Inserisci i dati del Prodotto:";
  }
});
