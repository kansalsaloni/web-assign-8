const apiUrl = "https://fakestoreapi.com/products";
const productContainer = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-products");
const checkoutButton = document.getElementById("checkout-btn");
const singleProductContainer = document.getElementById("single-product-container");

let cartProducts = [];

// Fetch product data from the API
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.log("Error fetching products:", error);
    showError("Failed to fetch products. Please try again later.");
  }
}

// Display products in the UI
function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

// Create a product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;
  card.appendChild(image);

  const title = document.createElement("h3");
  title.textContent = product.title;
  card.appendChild(title);

  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  card.appendChild(price);

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.classList.add("add-to-cart-btn");
  addToCartButton.addEventListener("click", () => addToCart(product));
  card.appendChild(addToCartButton);

  card.addEventListener("click", () => showSingleProduct(product));

  return card;
}

// Add product to the cart
function addToCart(product) {
  cartProducts.push(product);
  displayCartProducts();
}

// Display cart products in the UI
function displayCartProducts() {
  cartContainer.innerHTML = "";

  cartProducts.forEach((product) => {
    const card = createCartProductCard(product);
    cartContainer.appendChild(card);
  });

  updateCheckoutButton();
}

// Create a cart product card
function createCartProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("cart-product-card");

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;
  card.appendChild(image);

  const title = document.createElement("h4");
  title.textContent = product.title;
  card.appendChild(title);

  const buyButton = document.createElement("button");
  buyButton.textContent = "Buy";
 


  buyButton.classList.add("buy-btn");
  buyButton.addEventListener("click", () => buyProduct(product));
  card.appendChild(buyButton);

  return card;
}

// Buy a product from the cart
function buyProduct(product) {
  alert(`You have successfully bought the product: ${product.title}`);
}

// Update the state of the checkout button
function updateCheckoutButton() {
  if (cartProducts.length > 0) {
    checkoutButton.removeAttribute("disabled");
  } else {
    checkoutButton.setAttribute("disabled", true);
  }
}

// Checkout function
function checkout() {
  alert("Checkout Successful!");
  cartProducts = [];
  displayCartProducts();
}

// Show error message
function showError(message) {
  const errorContainer = document.createElement("div");
  errorContainer.textContent = message;
  errorContainer.classList.add("error");
  productContainer.appendChild(errorContainer);
}

// Show single product page
function showSingleProduct(product) {
  singleProductContainer.innerHTML = "";

  const card = createSingleProductCard(product);
  singleProductContainer.appendChild(card);

  productContainer.style.display = "none";
  cartContainer.style.display = "none";
  singleProductContainer.style.display = "block";
}

// Create a single product card
function createSingleProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("single-product-card");

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;
  card.appendChild(image);

  const title = document.createElement("h2");
  title.textContent = product.title;
  card.appendChild(title);

  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  card.appendChild(price);

  const description = document.createElement("p");
  description.textContent = product.description;
  card.appendChild(description);

  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.classList.add("buy-btn");
  backButton.addEventListener("click", () => {
    singleProductContainer.style.display = "none";
    productContainer.style.display = "block";
    cartContainer.style.display = "block";
  });
  card.appendChild(backButton);

  return card;
}

// Event listener for checkout button
checkoutButton.addEventListener("click", checkout);

// Fetch and display products
fetchProducts();
