// ======================================================
// SHOPZONE - app.js
// Web Development Practical
// Firebase Phone OTP + Products + Cart
// ======================================================


// ======================================================
// FIREBASE CONFIGURATION
// ======================================================

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
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


// ======================================================
// GLOBAL VARIABLES
// ======================================================

let confirmationResult = null;
let recaptchaVerifier = null;

const app = document.getElementById("app");


// ======================================================
// PRODUCTS
// ======================================================

const products = [

  {
    id: 1,
    name: "iPhone 16",
    brand: "Apple",
    price: 74999,
    category: "Mobile",
    img: "https://images.unsplash.com/photo-1592286927505-2fd7d2c4f0a4?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 2,
    name: "Galaxy S25",
    brand: "Samsung",
    price: 79999,
    category: "Mobile",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 3,
    name: "OnePlus 13",
    brand: "OnePlus",
    price: 69999,
    category: "Mobile",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 4,
    name: "Google Pixel 9",
    brand: "Google",
    price: 74999,
    category: "Mobile",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 5,
    name: "Redmi Note Series",
    brand: "Xiaomi",
    price: 17999,
    category: "Mobile",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 6,
    name: "Vivo V Series",
    brand: "Vivo",
    price: 29999,
    category: "Mobile",
    img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 7,
    name: "OPPO Reno Series",
    brand: "OPPO",
    price: 32999,
    category: "Mobile",
    img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 8,
    name: "MacBook Air",
    brand: "Apple",
    price: 99999,
    category: "Laptop",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 9,
    name: "Dell Inspiron",
    brand: "Dell",
    price: 65999,
    category: "Laptop",
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 10,
    name: "HP Pavilion",
    brand: "HP",
    price: 61999,
    category: "Laptop",
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 11,
    name: "Lenovo IdeaPad",
    brand: "Lenovo",
    price: 55999,
    category: "Laptop",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 12,
    name: "ASUS ROG Laptop",
    brand: "ASUS",
    price: 119999,
    category: "Laptop",
    img: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 13,
    name: "AirPods Pro",
    brand: "Apple",
    price: 24999,
    category: "Audio",
    img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 14,
    name: "Galaxy Buds",
    brand: "Samsung",
    price: 12999,
    category: "Audio",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 15,
    name: "Apple Watch",
    brand: "Apple",
    price: 44999,
    category: "Watch",
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 16,
    name: "Samsung Smart Watch",
    brand: "Samsung",
    price: 24999,
    category: "Watch",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"
  }

];


// ======================================================
// CART
// ======================================================

let cart = JSON.parse(
  localStorage.getItem("shopzoneCart") || "[]"
);


// ======================================================
// MONEY FORMAT
// ======================================================

function money(number) {

  return "₹" +
    Number(number).toLocaleString("en-IN");

}


// ======================================================
// SAVE CART
// ======================================================

function saveCart() {

  localStorage.setItem(
    "shopzoneCart",
    JSON.stringify(cart)
  );

  updateCartCount();

}


// ======================================================
// UPDATE CART COUNT
// ======================================================

function updateCartCount() {

  const cartCount =
    document.getElementById("cartCount");

  if (!cartCount) return;

  const total =
    cart.reduce(
      (sum, item) => sum + item.qty,
      0
    );

  cartCount.textContent = total;

}


// ======================================================
// HOME PAGE
// ======================================================

function showHome() {

  app.innerHTML = `

    <section class="hero">

      <div>

        <h1>ShopZone</h1>

        <p>
          Online Shopping Website
        </p>

        <p>
          Mobiles • Laptops • Audio • Smart Watches
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


        <div
          class="category"
          onclick="showProducts()">

          <img
            src="${products[0].img}"
            alt="Mobile">

          <h3>Mobiles</h3>

        </div>


        <div
          class="category"
          onclick="showProducts()">

          <img
            src="${products[8].img}"
            alt="Laptop">

          <h3>Laptops</h3>

        </div>


        <div
          class="category"
          onclick="showProducts()">

          <img
            src="${products[12].img}"
            alt="Audio">

          <h3>Audio</h3>

        </div>


        <div
          class="category"
          onclick="showProducts()">

          <img
            src="${products[14].img}"
            alt="Watch">

          <h3>Smart Watches</h3>

        </div>


      </div>

    </section>

  `;

}


// ======================================================
// PRODUCT PAGE
// ======================================================

function renderProducts() {

  const searchBox =
    document.getElementById("search");

  const search =
    searchBox
      ? searchBox.value.toLowerCase()
      : "";


  const filteredProducts =
    products.filter(product => {

      const text =
        product.name +
        " " +
        product.brand +
        " " +
        product.category;

      return text
        .toLowerCase()
        .includes(search);

    });


  app.innerHTML = `

    <section class="section">

      <h2>All Products</h2>

      <div class="products">

        ${
          filteredProducts.map(product => `

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
        }

      </div>

    </section>

  `;

}


function showProducts() {

  renderProducts();

}


// ======================================================
// ADD TO CART
// ======================================================

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


// ======================================================
// CHANGE QUANTITY
// ======================================================

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


// ======================================================
// CART PAGE
// ======================================================

function showCart() {

  if (cart.length === 0) {

    app.innerHTML = `

      <section class="section">

        <div class="cart-card empty">

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Add products to your cart.
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
              onclick="changeQty(${item.id}, -1)">

              −

            </button>


            <span>
              ${item.qty}
            </span>


            <button
              onclick="changeQty(${item.id}, 1)">

              +

            </button>

          </div>

        `).join("")}


        <h2 class="total">

          Total:
          ${money(total)}

        </h2>


        <button
          onclick="checkout()">

          Proceed to Checkout

        </button>

      </div>

    </section>

  `;

}


// ======================================================
// CHECKOUT
// ======================================================

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


        <p class="notice">

          Logged in as:
          ${auth.currentUser.phoneNumber}

        </p>


        <input
          id="address"
          type="text"
          placeholder="Enter delivery address"
          style="
            width:100%;
            padding:13px;
            margin:12px 0;
            border:1px solid #ccd2da;
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


// ======================================================
// PLACE ORDER
// ======================================================

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

        <div class="success">

          <h2>
            Order Placed Successfully!
          </h2>

          <p>
            This is a college-project
            demo checkout.
          </p>

        </div>

      </div>

    </section>

  `;

}


// ======================================================
// LOGIN PAGE
// ======================================================

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


  setTimeout(
    setupRecaptcha,
    500
  );

}


// ======================================================
// FIREBASE RECAPTCHA
// ======================================================

function setupRecaptcha() {

  try {

    const container =
      document.getElementById(
        "recaptcha-container"
      );


    if (!container) {

      console.log(
        "reCAPTCHA container not found."
      );

      return;

    }


    if (recaptchaVerifier) {

      try {

        recaptchaVerifier.clear();

      } catch (error) {

        console.log(error);

      }

      recaptchaVerifier = null;

    }


    recaptchaVerifier =
      new firebase.auth.RecaptchaVerifier(

        "recaptcha-container",

        {

          size: "normal",

          callback: function () {

            console.log(
              "reCAPTCHA verified."
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
          "reCAPTCHA loaded successfully."
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
      "reCAPTCHA setup error:",
      error
    );

  }

}


// ======================================================
// SEND OTP
// ======================================================

async function sendOTP() {

  const phoneInput =
    document.getElementById("phone");

  const button =
    document.getElementById("sendOtpBtn");


  if (!phoneInput) {

    alert(
      "Phone input not found."
    );

    return;

  }


  const phone =
    phoneInput.value.trim();


  // Correct Indian phone validation

  if (!/^\+91[6-9]\d{9}$/.test(phone)) {

    alert(
      "Enter a valid Indian mobile number.\n\n" +
      "Example:\n" +
      "+919876543210"
    );

    return;

  }


  // Check reCAPTCHA

  if (!recaptchaVerifier) {

    alert(
      "reCAPTCHA is not ready.\n\n" +
      "Please wait 2 seconds and try again."
    );

    setupRecaptcha();

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

      <div
        style="
          margin-top:15px;
        "
      >

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

      </div>

    `;


    alert(
      "OTP sent successfully to " +
      phone
    );


  } catch (error) {

    console.error(
      "OTP ERROR:",
      error
    );


    alert(

      "OTP could not be sent.\n\n" +

      "Error Code: " +
      error.code +

      "\n\n" +

      error.message

    );


    if (recaptchaVerifier) {

      try {

        recaptchaVerifier.clear();

      } catch (e) {

        console.log(e);

      }

    }


    recaptchaVerifier = null;


    setTimeout(
      setupRecaptcha,
      500
    );

  }


  button.disabled = false;

  button.textContent =
    "Send OTP";

}


// ======================================================
// VERIFY OTP
// ======================================================

async function verifyOTP() {

  const otpInput =
    document.getElementById("otp");


  if (!otpInput) {

    alert(
      "Please request OTP first."
    );

    return;

  }


  const otp =
    otpInput.value.trim();


  if (!/^\d{6}$/.test(otp)) {

    alert(
      "Enter the 6-digit OTP."
    );

    return;

  }


  if (!confirmationResult) {

    alert(
      "Please request OTP first."
    );

    return;

  }


  try {

    const result =
      await confirmationResult.confirm(
        otp
      );


    console.log(
      "Login successful:",
      result.user.phoneNumber
    );


    alert(
      "Login successful!"
    );


    showAccount();


  } catch (error) {

    console.error(
      "VERIFY ERROR:",
      error
    );


    alert(

      "OTP verification failed.\n\n" +
      error.message

    );

  }

}


// ======================================================
// ACCOUNT PAGE
// ======================================================

function showAccount() {

  const user =
    auth.currentUser;


  app.innerHTML = `

    <section class="section">

      <div class="cart-card">

        <div class="success">

          <h2>
            Login Successful
          </h2>


          <p>

            Phone:
            ${user ? user.phoneNumber : ""}

          </p>

        </div>


        <br>


        <button
          onclick="showProducts()">

          Continue Shopping

        </button>


        <button
          onclick="logout()"
          style="
            background:#555;
            margin-left:8px;
          ">

          Logout

        </button>

      </div>

    </section>

  `;


  updateLoginButton();

}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

  auth.signOut()

    .then(function () {

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


// ======================================================
// UPDATE LOGIN BUTTON
// ======================================================

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


// ======================================================
// FIREBASE AUTH STATE
// ======================================================

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


// ======================================================
// START SHOPZONE
// ======================================================

updateCartCount();

showHome();
