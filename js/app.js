// ================= Firebase configuration =================
// This is the web configuration from your ShopZone Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyDvRecNPCcfFYJGJGMmwM01W6PsoZbag3nU",
  authDomain: "shopzone-project-7ad08.firebaseapp.com",
  projectId: "shopzone-project-7ad08",
  storageBucket: "shopzone-project-7ad08.firebasestorage.app",
  messagingSenderId: "198355900077",
  appId: "1:198355900077:web:7e0c72cd590f266d8ad824",
  measurementId: "G-M0NLS2F7VQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const products = [
 {id:1,name:"iPhone 16",brand:"Apple",price:74999,img:"https://images.unsplash.com/photo-1592286927505-2fd7d2c4f0a4?auto=format&fit=crop&w=700&q=85"},
 {id:2,name:"Galaxy S25",brand:"Samsung",price:79999,img:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=85"},
 {id:3,name:"OnePlus 13",brand:"OnePlus",price:69999,img:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85"},
 {id:4,name:"Pixel 9",brand:"Google",price:74999,img:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85"},
 {id:5,name:"Redmi Note Series",brand:"Xiaomi",price:17999,img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85"},
 {id:6,name:"Vivo V Series",brand:"Vivo",price:29999,img:"https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=85"},
 {id:7,name:"OPPO Reno Series",brand:"OPPO",price:32999,img:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=85"},
 {id:8,name:"MacBook Air",brand:"Apple",price:99999,img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=85"},
 {id:9,name:"Dell Inspiron",brand:"Dell",price:65999,img:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=700&q=85"},
 {id:10,name:"HP Pavilion",brand:"HP",price:61999,img:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=85"},
 {id:11,name:"Lenovo IdeaPad",brand:"Lenovo",price:55999,img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85"},
 {id:12,name:"ASUS ROG Laptop",brand:"ASUS",price:119999,img:"https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=700&q=85"},
 {id:13,name:"AirPods Pro",brand:"Apple",price:24999,img:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85"},
 {id:14,name:"Galaxy Buds",brand:"Samsung",price:12999,img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=85"},
 {id:15,name:"Apple Watch",brand:"Apple",price:44999,img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85"},
 {id:16,name:"Smart Watch",brand:"Samsung",price:24999,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"}
];

let cart = JSON.parse(localStorage.getItem("shopzoneCart") || "[]");
let confirmationResult = null;
let recaptchaVerifier = null;

const app = document.getElementById("app");

function money(n){ return "₹" + n.toLocaleString("en-IN"); }

function saveCart(){
  localStorage.setItem("shopzoneCart",JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  document.getElementById("cartCount").textContent =
    cart.reduce((s,i)=>s+i.qty,0);
}

function showHome(){
  app.innerHTML = `
    <section class="hero">
      <div>
        <h1>ShopZone</h1>
        <p>Real products. Simple shopping. Secure phone OTP login.</p>
        <button class="btn" onclick="showProducts()">Shop Now</button>
      </div>
    </section>
    <section class="section">
      <h2>Popular Categories</h2>
      <div class="categories">
        <div class="category"><img src="${products[0].img}"><h3>Mobiles</h3></div>
        <div class="category"><img src="${products[8].img}"><h3>Laptops</h3></div>
        <div class="category"><img src="${products[12].img}"><h3>Audio</h3></div>
        <div class="category"><img src="${products[14].img}"><h3>Smart Watches</h3></div>
      </div>
    </section>`;
}

function renderProducts(){
  const q = (document.getElementById("search")?.value || "").toLowerCase();
  const list = products.filter(p =>
    (p.name+" "+p.brand).toLowerCase().includes(q)
  );
  app.innerHTML = `
    <section class="section">
      <h2>Products</h2>
      <div class="products">
        ${list.map(p=>`
          <article class="card">
            <img src="${p.img}" alt="${p.brand} ${p.name}">
            <div class="card-body">
              <div class="brand-name">${p.brand}</div>
              <h3>${p.name}</h3>
              <div class="price">${money(p.price)}</div>
              <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
          </article>`).join("")}
      </div>
    </section>`;
}

function showProducts(){ renderProducts(); }

function addToCart(id){
  const p = products.find(x=>x.id===id);
  const item = cart.find(x=>x.id===id);
  if(item) item.qty++;
  else cart.push({...p,qty:1});
  saveCart();
  alert(p.name+" added to cart");
}

function changeQty(id,delta){
  const item = cart.find(x=>x.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(x=>x.id!==id);
  saveCart();
  showCart();
}

function showCart(){
  if(!cart.length){
    app.innerHTML = `<section class="section"><div class="cart-card empty"><h2>Your cart is empty</h2><p>Choose a product to start shopping.</p><br><button onclick="showProducts()">Browse Products</button></div></section>`;
    return;
  }
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  app.innerHTML = `
    <section class="section">
      <div class="cart-card">
        <h2>Your Cart</h2>
        ${cart.map(i=>`
          <div class="cart-row">
            <img src="${i.img}">
            <div class="grow"><b>${i.name}</b><br><span>${money(i.price)}</span></div>
            <div class="qty">
              <button onclick="changeQty(${i.id},-1)">−</button>
              ${i.qty}
              <button onclick="changeQty(${i.id},1)">+</button>
            </div>
          </div>`).join("")}
        <div class="total">Total: ${money(total)}</div>
        <button onclick="checkout()">Proceed to Checkout</button>
      </div>
    </section>`;
}

function checkout(){
  if(!auth.currentUser){
    alert("Please login with your phone number before checkout.");
    showLogin();
    return;
  }
  app.innerHTML = `
    <section class="section">
      <div class="cart-card">
        <h2>Checkout</h2>
        <p class="notice">Logged in as ${auth.currentUser.phoneNumber}</p>
        <input id="address" placeholder="Delivery address" style="width:100%;padding:13px;margin:12px 0;border:1px solid #ccd2da;border-radius:7px">
        <button onclick="placeOrder()">Place Demo Order</button>
      </div>
    </section>`;
}

function placeOrder(){
  const address = document.getElementById("address").value.trim();
  if(!address){ alert("Enter delivery address"); return; }
  cart=[]; saveCart();
  app.innerHTML=`<section class="section"><div class="cart-card"><div class="success"><h2>Order placed successfully</h2><p>This is a college-project demo checkout.</p></div></div></section>`;
}

function showLogin(){
  app.innerHTML = `
    <section class="login-page">
      <div class="login-card">
        <h2>Login to ShopZone</h2>
        <p>Use your real Indian mobile number to receive an OTP.</p>
        <input id="phone" type="tel" inputmode="numeric" placeholder="+91 9876543210">
        <div id="recaptcha-container"></div>
        <button id="sendOtpBtn" onclick="sendOTP()">Send OTP</button>
        <div id="otpArea"></div>
      </div>
    </section>`;
  setupRecaptcha();
}

function setupRecaptcha(){
  try{
    if(recaptchaVerifier) recaptchaVerifier.clear();
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",{
      size:"normal",
      callback:()=>console.log("reCAPTCHA solved")
    });
    recaptchaVerifier.render();
  }catch(e){
    console.error(e);
  }
}

async function sendOTP(){
  const phone = document.getElementById("phone").value.trim();
  if(!/^\+91[6-9]\d{9}$/.test(phone)){
    alert("Enter a valid Indian number, e.g. +919876543210");
    return;
  }
  try{
    confirmationResult = await auth.signInWithPhoneNumber(phone,recaptchaVerifier);
    document.getElementById("otpArea").innerHTML=`
      <input id="otp" type="text" inputmode="numeric" maxlength="6" placeholder="Enter 6-digit OTP">
      <button onclick="verifyOTP()">Verify OTP</button>`;
    alert("OTP sent to "+phone);
  }catch(error){
    console.error(error);
    alert(error.message);
    if(recaptchaVerifier) setupRecaptcha();
  }
}

async function verifyOTP(){
  const otp = document.getElementById("otp").value.trim();
  if(!/^\d{6}$/.test(otp)){ alert("Enter the 6-digit OTP"); return; }
  try{
    await confirmationResult.confirm(otp);
    showAccount();
  }catch(error){
    console.error(error);
    alert("OTP verification failed: "+error.message);
  }
}

function showAccount(){
  const u = auth.currentUser;
  app.innerHTML=`
    <section class="section">
      <div class="cart-card">
        <div class="success">
          <h2>Login successful</h2>
          <p>Phone: ${u.phoneNumber || ""}</p>
        </div>
        <br>
        <button onclick="showProducts()">Continue Shopping</button>
        <button onclick="logout()" style="background:#555;margin-left:8px">Logout</button>
      </div>
    </section>`;
  updateLoginButton();
}

function logout(){
  auth.signOut().then(()=>{updateLoginButton();showHome();});
}

function updateLoginButton(){
  const btn=document.getElementById("loginBtn");
  if(auth.currentUser) btn.textContent="Account";
  else btn.textContent="Login";
}

auth.onAuthStateChanged(user=>{
  updateLoginButton();
  updateCartCount();
});

updateCartCount();
showHome();
