// Allowing JSON to be fetched, to get product data.
// In case there is an Error, it will load the string instead.
document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load products.json");
      }
// Converting response to array.
      return response.json();
    })
    .then((data) => {
      const grid = document.getElementById("product-grid");

// Looping through each product in the array, as well as creating a div for each product.
      data.forEach((product) => {
        const item = document.createElement("div");
        item.classList.add("item");

// Adding the product HTML inside the div.
        item.innerHTML = `
                    <div class="item-img">
                        <a href="${product.Link}" target="_blank">
                            <img src="${product.Photo}" alt="${product.Name}">
                        </a>
                        <div class="item-action">
                            <a href="#" class="buy"><span><i class="fas fa-cart-plus"></i></span></a>
                            <a href="#" class="wishlist"><span><i class="fas fa-heart"></i></span></a>
                        </div>
                    </div>
                    <div class="item-details">
                        <p class="price">${product.Name}</p>
                        <p class="name">${product.Price}</p>
                        <p class="price">${product.Description}</p>
                    </div>
                `;
// Adding each item into the grid.
        grid.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
});
