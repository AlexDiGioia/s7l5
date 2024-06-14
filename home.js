const prodListURL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmQ2MjdjMjM5YzAwMTUyZjRiNTciLCJpYXQiOjE3MTgzNTMyNTAsImV4cCI6MTcxOTU2Mjg1MH0.uo_xzwgqqL1y4WS-2RchZcv7Y67acFOjFKHoLbjnqUA";


  const isLoading = bool => {
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

      products.forEach((prod) => {
        const listItem = document.createElement("li");
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
            <button type="button" class="btn btn-warning rounded-pill" >VEDI DETTAGLIaaaaaaaaaa</button>
        </a>
        `;
    
        //
        list.appendChild(listItem);
      });
    })
    .catch((err) => console.log(err));
});
