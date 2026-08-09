const firebaseConfig = {
  apiKey: "તમારી API key",
  authDomain: "shopzone-project-7ad08.firebaseapp.com",
  projectId: "shopzone-project-7ad08",
  storageBucket: "shopzone-project-7ad08.firebasestorage.app",
  messagingSenderId: "198355900077",
  appId: "1:198355900077:web:7e0c72cd590f266d8ad824",
  measurementId: "G-M8NLS2F7VQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function setupRecaptcha() {
  try {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
    }

    recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: function () {
          console.log("reCAPTCHA verified");
        },
        "expired-callback": function () {
          console.log("reCAPTCHA expired");
        }
      },
      auth
    );

    recaptchaVerifier.render();
  } catch (error) {
    console.error("reCAPTCHA Error:", error);
  }
}
async function sendOTP() {
  const phone = document.getElementById("phone").value.trim();

  // Valid Indian mobile number
  if (!/^\+91[6-9]\d{9}$/.test(phone)) {
    alert("Enter valid number like +919876543210");
    return;
  }

  const btn = document.getElementById("sendOtpBtn");
  btn.disabled = true;
  btn.textContent = "Sending OTP...";

  try {
    if (!recaptchaVerifier) {
      setupRecaptcha();
      await recaptchaVerifier.render();
    }

    confirmationResult = await auth.signInWithPhoneNumber(
      phone,
      recaptchaVerifier
    );

    document.getElementById("otpArea").innerHTML = `
      <input
        id="otp"
        type="text"
        inputmode="numeric"
        maxlength="6"
        placeholder="Enter 6-digit OTP"
      >
      <button onclick="verifyOTP()">Verify OTP</button>
    `;

    alert("Real OTP sent successfully to " + phone);

  } catch (error) {
    console.error("OTP ERROR:", error);
    
    alert(
      "OTP could not be sent.\n\n" +
      error.code + "\n" +
      error.message
    );

    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }

    setupRecaptcha();

  } finally {
    btn.disabled = false;
    btn.textContent = "Send OTP";
  }
}
async function verifyOTP() {
  const otp = document.getElementById("otp").value.trim();

  if (!/^\d{6}$/.test(otp)) {
    alert("Enter the 6-digit OTP");
    return;
  }

  if (!confirmationResult) {
    alert("Please request OTP first.");
    return;
  }

  try {
    const result = await confirmationResult.confirm(otp);

    console.log("Login successful:", result.user.phoneNumber);

    alert("Login successful!");
    showAccount();

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    alert("OTP verification failed:\n" + error.message);
  }
}
