const prodListURL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmQ2MjdjMjM5YzAwMTUyZjRiNTciLCJpYXQiOjE3MTgzNTMyNTAsImV4cCI6MTcxOTU2Mjg1MH0.uo_xzwgqqL1y4WS-2RchZcv7Y67acFOjFKHoLbjnqUA";

const isLoading = (bool) => {
  const spinner = document.querySelector(".spinner-border");

  if (bool) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  //GET
  fetch(prodListURL, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((products) => {
      console.log("prod", products);
      isLoading(false);

      const list = document.getElementById("products-list");
      const row = document.getElementById("prod-row");

      products.forEach((prod) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm h-100";
        //card.style= "height: 40rem;"

        card.innerHTML = `
        <img src="${prod.imageUrl}" class=" card-img-top " style="height=40rem"; />
        <div class="card-body">
            <h5 class="card-title"><span>${prod.name}</span> </h5>
            <span class="badge ms-auto me-2 ${
              prod.price ? "text-bg-dark" : "text-bg-success"
            }">${prod.price ? prod.price + "€" : "gratis"}</span> 

            <a href="./details.html?productId=${prod._id}">
              <button type="button" class="btn btn-warning rounded-pill" >VEDI DETTAGLI</button>
            </a>
        </div>
        `;
        col.appendChild(card);
        row.appendChild(col);

        /*const listItem = document.createElement("li");
        //listItem.className = "list-group-item d-flex align-items-center";
        listItem.className =
          "list-group-item d-flex justify-content-between align-items-center";

        listItem.innerHTML = `
        <div class="ms-2 me-auto">
            <div class="fw-bold"><span>${prod.name}</span> </div>
            <span class="badge ms-auto me-2 ${
            prod.price ? "text-bg-dark" : "text-bg-success"
            }">${prod.price ? prod.price + "€" : "gratis"}</span> 
        </div>
        <a href="./details.html?productId=${prod._id}">
            <button type="button" class="btn btn-warning rounded-pill" >VEDI DETTAGLI</button>
        </a>
        `;
    
        //
        list.appendChild(listItem);*/
      });
    })
    .catch((err) => console.log(err));
});
