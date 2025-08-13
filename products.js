document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load products.json");
      }
      return response.json();
    })
    .then((data) => {
      const grid = document.getElementById("product-grid");

      data.forEach((product) => {
        const item = document.createElement("div");
        item.classList.add("item");

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

        grid.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
});
