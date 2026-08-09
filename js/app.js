// =====================================================
// SHOPZONE - app.js
// Firebase v10 Compat
// Phone OTP Login + Products + Cart
// =====================================================


// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {
  apiKey: "AIzaSyDvRecNPCcfFY7JGMmwMO1w6PsoZbag3nU",
  authDomain: "shopzone-project-7ad08.firebaseapp.com",
  projectId: "shopzone-project-7ad08",
  storageBucket: "shopzone-project-7ad08.firebasestorage.app",
  messagingSenderId: "198355900077",
  appId: "1:198355900077:web:7e0c72cd590f266d8ad824",
  measurementId: "G-M8NLS2F7VQ"
};


// Start Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();


// =====================================================
// VARIABLES
// =====================================================

const app = document.getElementById("app");

let confirmationResult = null;
let recaptchaVerifier = null;


// =====================================================
// PRODUCTS
// =====================================================

const products = [

  {
    id: 1,
    name: "iPhone 16",
    brand: "Apple",
    category: "Mobile",
    price: 74999,
    img: "https://images.unsplash.com/photo-1592286927505-2fd7d2c4f0a4?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 2,
    name: "Galaxy S25",
    brand: "Samsung",
    category: "Mobile",
    price: 79999,
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 3,
    name: "OnePlus 13",
    brand: "OnePlus",
    category: "Mobile",
    price: 69999,
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 4,
    name: "Google Pixel 9",
    brand: "Google",
    category: "Mobile",
    price: 74999,
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 5,
    name: "Redmi Note Series",
    brand: "Xiaomi",
    category: "Mobile",
    price: 17999,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 6,
    name: "Vivo V Series",
    brand: "Vivo",
    category: "Mobile",
    price: 29999,
    img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 7,
    name: "OPPO Reno Series",
    brand: "OPPO",
    category: "Mobile",
    price: 32999,
    img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 8,
    name: "MacBook Air",
    brand: "Apple",
    category: "Laptop",
    price: 99999,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 9,
    name: "Dell Inspiron",
    brand: "Dell",
    category: "Laptop",
    price: 65999,
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 10,
    name: "HP Pavilion",
    brand: "HP",
    category: "Laptop",
    price: 61999,
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 11,
    name: "Lenovo IdeaPad",
    brand: "Lenovo",
    category: "Laptop",
    price: 55999,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 12,
    name: "ASUS ROG Laptop",
    brand: "ASUS",
    category: "Laptop",
    price: 119999,
    img: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 13,
    name: "AirPods Pro",
    brand: "Apple",
    category: "Audio",
    price: 24999,
    img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 14,
    name: "Galaxy Buds",
    brand: "Samsung",
    category: "Audio",
    price: 12999,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 15,
    name: "Apple Watch",
    brand: "Apple",
    category: "Watch",
    price: 44999,
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 16,
    name: "Samsung Smart Watch",
    brand: "Samsung",
    category: "Watch",
    price: 24999,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"
  }

];


// =====================================================
// CART
// =====================================================

let cart = [];

try {
  cart = JSON.parse(
    localStorage.getItem("shopzoneCart") || "[]"
  );
} catch (error) {
  cart = [];
}


// =====================================================
// MONEY
// =====================================================

function money(value) {
  return "₹" + Number(value).toLocaleString("en-IN");
}


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

  const element =
    document.getElementById("cartCount");

  if (!element) return;

  const count =
    cart.reduce(
      (total, item) =>
        total + Number(item.qty || 0),
      0
    );

  element.textContent = count;
}


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

  localStorage.setItem(
    "shopzoneCart",
    JSON.stringify(cart)
  );

  updateCartCount();
}


// =====================================================
// HOME
// =====================================================

function showHome() {

  app.innerHTML = `

    <section class="hero">

      <div>

        <h1>ShopZone</h1>

        <p>
          Online Shopping Website
        </p>

        <p>
          Mobiles • Laptops • Audio • Watches
        </p>

        <button
          class="btn"
          onclick="showProducts()">

          Shop Now

        </button>

      </div>

    </section>


    <section class="section">

      <h2>Popular Categories</h2>

      <div class="categories">

        <div class="category"
             onclick="showProducts()">

          <img
            src="${products[0].img}"
            alt="Mobiles">

          <h3>Mobiles</h3>

        </div>


        <div class="category"
             onclick="showProducts()">

          <img
            src="${products[7].img}"
            alt="Laptops">

          <h3>Laptops</h3>

        </div>


        <div class="category"
             onclick="showProducts()">

          <img
            src="${products[12].img}"
            alt="Audio">

          <h3>Audio</h3>

        </div>


        <div class="category"
             onclick="showProducts()">

          <img
            src="${products[14].img}"
            alt="Watches">

          <h3>Smart Watches</h3>

        </div>

      </div>

    </section>

  `;
}


// =====================================================
// PRODUCTS
// =====================================================

function renderProducts() {

  const searchElement =
    document.getElementById("search");

  const query =
    searchElement
      ? searchElement.value.toLowerCase().trim()
      : "";


  const list =
    products.filter(product => {

      const text =
        product.name +
        " " +
        product.brand +
        " " +
        product.category;

      return text
        .toLowerCase()
        .includes(query);

    });


  app.innerHTML = `

    <section class="section">

      <h2>Products</h2>

      <div class="products">

        ${
          list.length
            ? list.map(product => `

              <div class="product-card">

                <img
                  src="${product.img}"
                  alt="${product.name}"
                >

                <small>
                  ${product.brand}
                </small>

                <h3>
                  ${product.name}
                </h3>

                <p>
                  ${product.category}
                </p>

                <strong>
                  ${money(product.price)}
                </strong>

                <button
                  onclick="addToCart(${product.id})">

                  Add to Cart

                </button>

              </div>

            `).join("")
            : `
              <p>
                No products found.
              </p>
            `
        }

      </div>

    </section>

  `;
}


function showProducts() {
  renderProducts();
}


// =====================================================
// ADD CART
// =====================================================

function addToCart(id) {

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      ...product,
      qty: 1
    });

  }


  saveCart();


  alert(
    product.name +
    " added to cart!"
  );
}


// =====================================================
// CART
// =====================================================

function changeQty(id, change) {

  const item =
    cart.find(
      product => product.id === id
    );

  if (!item) return;


  item.qty += change;


  if (item.qty <= 0) {

    cart =
      cart.filter(
        product => product.id !== id
      );

  }


  saveCart();

  showCart();
}


function showCart() {

  if (!cart.length) {

    app.innerHTML = `

      <section class="section">

        <div class="cart-card">

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Add products to continue.
          </p>

          <button
            onclick="showProducts()">

            Browse Products

          </button>

        </div>

      </section>

    `;

    return;
  }


  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );


  app.innerHTML = `

    <section class="section">

      <div class="cart-card">

        <h2>
          Your Cart
        </h2>


        ${cart.map(item => `

          <div class="cart-item">

            <img
              src="${item.img}"
              alt="${item.name}"
              width="70"
            >

            <div>

              <h3>
                ${item.name}
              </h3>

              <p>
                ${money(item.price)}
              </p>

            </div>

            <button
              onclick="changeQty(${item.id},-1)">
              −
            </button>

            <span>
              ${item.qty}
            </span>

            <button
              onclick="changeQty(${item.id},1)">
              +
            </button>

          </div>

        `).join("")}


        <h2>
          Total: ${money(total)}
        </h2>


        <button
          onclick="checkout()">

          Proceed to Checkout

        </button>

      </div>

    </section>

  `;
}


// =====================================================
// CHECKOUT
// =====================================================

function checkout() {

  if (!auth.currentUser) {

    alert(
      "Please login before checkout."
    );

    showLogin();

    return;
  }


  app.innerHTML = `

    <section class="section">

      <div class="cart-card">

        <h2>
          Checkout
        </h2>

        <p>
          Logged in as:
          ${auth.currentUser.phoneNumber}
        </p>

        <input
          id="address"
          type="text"
          placeholder="Delivery Address"
          style="
            width:100%;
            padding:13px;
            margin:12px 0;
            border:1px solid #ccc;
            border-radius:7px;
          "
        >

        <button
          onclick="placeOrder()">

          Place Demo Order

        </button>

      </div>

    </section>

  `;
}


// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder() {

  const address =
    document
      .getElementById("address")
      .value.trim();


  if (!address) {

    alert(
      "Please enter delivery address."
    );

    return;
  }


  cart = [];

  saveCart();


  app.innerHTML = `

    <section class="section">

      <div class="cart-card">

        <h2>
          Order Placed Successfully
        </h2>

        <p>
          ShopZone college project demo.
        </p>

        <button
          onclick="showProducts()">

          Continue Shopping

        </button>

      </div>

    </section>

  `;
}


// =====================================================
// LOGIN PAGE
// =====================================================

function showLogin() {

  app.innerHTML = `

    <section class="login-page">

      <div class="login-card">

        <h2>
          Login to ShopZone
        </h2>

        <p>
          Enter your Indian mobile number.
        </p>


        <input
          id="phone"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          placeholder="+91 9876543210"
        >


        <div
          id="recaptcha-container">
        </div>


        <button
          id="sendOtpBtn"
          onclick="sendOTP()">

          Send OTP

        </button>


        <div
          id="otpArea">
        </div>

      </div>

    </section>

  `;


  // Wait for DOM
  setTimeout(
    initializeRecaptcha,
    300
  );
}


// =====================================================
// INITIALIZE RECAPTCHA
// =====================================================

function initializeRecaptcha() {

  const container =
    document.getElementById(
      "recaptcha-container"
    );


  if (!container) {

    console.error(
      "reCAPTCHA container missing."
    );

    return;
  }


  // Clear previous verifier

  if (recaptchaVerifier) {

    try {
      recaptchaVerifier.clear();
    } catch (error) {
      console.log(error);
    }

    recaptchaVerifier = null;
  }


  try {

    /*
      Firebase v10 COMPAT API

      Correct constructor:
      RecaptchaVerifier(
        container,
        parameters
      )
    */

    recaptchaVerifier =
      new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",

          callback: function () {

            console.log(
              "reCAPTCHA completed."
            );

          },

          "expired-callback":
            function () {

              console.log(
                "reCAPTCHA expired."
              );

            }
        }
      );


    recaptchaVerifier
      .render()
      .then(function () {

        console.log(
          "reCAPTCHA loaded."
        );

      })
      .catch(function (error) {

        console.error(
          "reCAPTCHA render error:",
          error
        );

      });


  } catch (error) {

    console.error(
      "reCAPTCHA initialization error:",
      error
    );

    recaptchaVerifier = null;
  }
}


// =====================================================
// SEND OTP
// =====================================================

async function sendOTP() {

  const phoneElement =
    document.getElementById("phone");

  const button =
    document.getElementById("sendOtpBtn");


  if (!phoneElement) {

    alert(
      "Phone number field not found."
    );

    return;
  }


  const phone =
    phoneElement.value.trim();


  // Indian number validation

  if (!/^\+91[6-9]\d{9}$/.test(phone)) {

    alert(
      "Enter valid Indian mobile number.\n\n" +
      "Example:\n+919876543210"
    );

    return;
  }


  if (!recaptchaVerifier) {

    alert(
      "Please wait for reCAPTCHA to load."
    );

    initializeRecaptcha();

    return;
  }


  button.disabled = true;

  button.textContent =
    "Sending OTP...";


  try {

    confirmationResult =
      await auth.signInWithPhoneNumber(
        phone,
        recaptchaVerifier
      );


    document.getElementById(
      "otpArea"
    ).innerHTML = `

      <input
        id="otp"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="6"
        placeholder="Enter 6-digit OTP"
      >

      <button
        onclick="verifyOTP()">

        Verify OTP

      </button>

    `;


    alert(
      "OTP sent successfully to " +
      phone
    );


  } catch (error) {

    console.error(
      "Firebase OTP Error:",
      error
    );


    alert(
      "OTP Error\n\n" +
      error.code +
      "\n\n" +
      error.message
    );


    // Reset reCAPTCHA

    try {

      recaptchaVerifier.clear();

    } catch (e) {

      console.log(e);

    }


    recaptchaVerifier = null;


    setTimeout(
      initializeRecaptcha,
      500
    );

  }


  button.disabled = false;

  button.textContent =
    "Send OTP";
}


// =====================================================
// VERIFY OTP
// =====================================================

async function verifyOTP() {

  const otpElement =
    document.getElementById("otp");


  if (!otpElement) {

    alert(
      "Please request OTP first."
    );

    return;
  }


  const otp =
    otpElement.value.trim();


  if (!/^\d{6}$/.test(otp)) {

    alert(
      "Enter valid 6-digit OTP."
    );

    return;
  }


  if (!confirmationResult) {

    alert(
      "OTP session not found. " +
      "Please request OTP again."
    );

    return;
  }


  try {

    const result =
      await confirmationResult.confirm(
        otp
      );


    console.log(
      "User logged in:",
      result.user.phoneNumber
    );


    alert(
      "Login successful!"
    );


    showAccount();


  } catch (error) {

    console.error(
      "OTP verification error:",
      error
    );


    alert(
      "OTP verification failed.\n\n" +
      error.message
    );
  }
}


// =====================================================
// ACCOUNT
// =====================================================

function showAccount() {

  const user =
    auth.currentUser;


  app.innerHTML = `

    <section class="section">

      <div class="cart-card">

        <h2>
          Login Successful
        </h2>

        <p>
          Phone:
          ${user ? user.phoneNumber : ""}
        </p>


        <button
          onclick="showProducts()">

          Continue Shopping

        </button>


        <button
          onclick="logout()"
          style="background:#555;margin-left:8px;">

          Logout

        </button>

      </div>

    </section>

  `;


  updateLoginButton();
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

  auth.signOut()
    .then(function () {

      console.log(
        "User logged out."
      );

      confirmationResult = null;

      updateLoginButton();

      showHome();

    })
    .catch(function (error) {

      console.error(
        "Logout error:",
        error
      );

    });
}


// =====================================================
// LOGIN BUTTON
// =====================================================

function updateLoginButton() {

  const button =
    document.getElementById(
      "loginBtn"
    );


  if (!button) return;


  if (auth.currentUser) {

    button.textContent =
      "Account";

    button.onclick =
      showAccount;

  } else {

    button.textContent =
      "Login";

    button.onclick =
      showLogin;
  }
}


// =====================================================
// AUTH STATE
// =====================================================

auth.onAuthStateChanged(
  function (user) {

    updateLoginButton();

    updateCartCount();


    if (user) {

      console.log(
        "User logged in:",
        user.phoneNumber
      );

    } else {

      console.log(
        "User logged out."
      );

    }
  }
);


// =====================================================
// SEARCH
// =====================================================

const searchBox =
  document.getElementById("search");


if (searchBox) {

  searchBox.addEventListener(
    "input",
    function () {

      renderProducts();

    }
  );
}


// =====================================================
// START WEBSITE
// =====================================================

updateCartCount();

updateLoginButton();

showHome();
