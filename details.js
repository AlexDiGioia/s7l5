const prodListURL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmQ2MjdjMjM5YzAwMTUyZjRiNTciLCJpYXQiOjE3MTgzNTMyNTAsImV4cCI6MTcxOTU2Mjg1MH0.uo_xzwgqqL1y4WS-2RchZcv7Y67acFOjFKHoLbjnqUA";

const query = new URLSearchParams(window.location.search).get("productId");
console.log("Product ID:", query);


window.addEventListener("DOMContentLoaded", function () {
    fetch(prodListURL + query, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nel get prodotto");
        }
      })
      .then(productObj => {
        const container = document.getElementById("products-details");
        const { name, description, price, imageUrl, _id, brand, createdAt, updatedAt } = productObj;
        container.innerHTML = `
                      <h1 class="display-4 text-danger">${name}</h1>
                      <p class="lead">${description}</p>
                      <p class="display-6 text-warning">Prezzo: ${price}</p>
                      <p class="small">Link Immagine: <a href="${imageUrl}">${imageUrl}</a></p>

  
                      <h6 class="bg-light ps-2 py-3">Server Details:</h6>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item ps-2"><strong>id:</strong> ${_id}</li>
                          <li class="list-group-item ps-2"><strong>createdAt:</strong> ${new Date(createdAt).toLocaleString("it-IT")}</li>
                          <li class="list-group-item ps-2"><strong>updatedAt:</strong> ${new Date(updatedAt).toLocaleString("it-IT")}</li>
                      </ul>
                      <button class="btn btn-warning mt-4" onclick="pagModifica()">Modifica Prodotto</button>
      `;
      })
      .catch(err => console.log(err));
  });

  
const pagModifica = () => {
    window.location.assign("./backoffice.html?productId=" + query);
  };