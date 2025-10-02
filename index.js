// Loading a few products for the homepage
document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load products.json");
      }
      return response.json();
    })
    .then((data) => {
      const grid = document.getElementById("products__grid--items");

      if (!grid) {
        console.error("Grid container not found: #products__grid--items");
        return;
      }

      // Grabbing the products
      const featuredProducts = data.slice(0, 3);

      featuredProducts.forEach((product) => {
        const item = document.createElement("div");
        item.classList.add("item");

        item.innerHTML = `
          <div class="item__img">
            <a href="products.html" aria-label="View ${product.Name}">
              <img src="${product.Photo}" alt="${product.Name}">
            </a>
          </div>
          <div class="item__details">
            <p class="item__name">${product.Name}</p>
            <p class="item__price">${product.Price}</p>
            <p class="item__desc">${product.Description}</p>
          </div>
        `;

        grid.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error loading homepage products:", error);
    });
});