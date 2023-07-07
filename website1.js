const productContainer = document.getElementById("product-container");

// Fetch product data from the API
fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    // Render the products
    data.forEach(product => {
      const productElement = createProductElement(product);
      productContainer.appendChild(productElement);
    });
  })
  .catch(error => {
    console.error("Error fetching product data:", error);
  });

// Create a product element
function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const imageElement = document.createElement("img");
  imageElement.src = product.image;
  productElement.appendChild(imageElement);

  const titleElement = document.createElement("h3");
  titleElement.textContent = product.title;
  productElement.appendChild(titleElement);

  const priceElement = document.createElement("p");
  priceElement.textContent = `$${product.price}`;
  productElement.appendChild(priceElement);

  return productElement;
}
