const prodListURL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmQ2MjdjMjM5YzAwMTUyZjRiNTciLCJpYXQiOjE3MTgzNTMyNTAsImV4cCI6MTcxOTU2Mjg1MH0.uo_xzwgqqL1y4WS-2RchZcv7Y67acFOjFKHoLbjnqUA";

const query = new URLSearchParams(window.location.search).get("productId");
console.log("Product ID:", query);
