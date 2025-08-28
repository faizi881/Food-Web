// Cart data
let cart = [];
let total = 0;

// DOM elements
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const checkoutButton = document.getElementById("checkout");

// Bill elements
const billSection = document.getElementById("bill");
const billItems = document.getElementById("bill-items");
const billTotal = document.getElementById("bill-total");

// Function: Add to cart
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCartUI();
}

// Function: Update cart UI
function updateCartUI() {
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Rs ${item.price}`;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => removeFromCart(index);

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
}

// Function: Remove item
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCartUI();
}

// Checkout
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    // Bill section show karo
    billSection.style.display = "block";
    billItems.innerHTML = "";

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - Rs ${item.price}`;
      billItems.appendChild(li);
    });

    billTotal.textContent = total;

    // Cart clear karna (optional)
    cart = [];
    total = 0;
    updateCartUI();
  }
});

// Add to cart buttons
addToCartButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".food-card");
    const name = card.querySelector("h3").textContent;
    const price = parseInt(card.querySelector(".price").textContent.replace("Rs ", ""));
    addToCart(name, price);
  });
});
