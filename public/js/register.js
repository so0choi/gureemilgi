const confirmPwd = document.querySelector("#confirm_password");
const pwd = document.querySelector("#password");
const pwdMessage = document.querySelector("#pwd_message");
const cPwdMessage = document.querySelector("#cpwd_message");
const email = document.querySelector("#email");
const emailMessage = document.querySelector("#email_message");
const btnValidation = document.querySelector("#btn_validation");
const btnSubmit = document.querySelector("#btn_submit");

let isEmailChecked = false;
// btnValidation.addEventListener("click", async () => {
//   let result = await fetch("/user/validation");
//   result = JSON.parse(result);
//   if (result) {
//     alert("You can use this email");
//     btnSubmit.disabled = true;
//   } else {
//     alert("This email is already in use");
//     email.value = "";
//     isEmailChecked = false;
//   }
// });

const verifyPassword = () => {
  const pwdVal = pwd.value;
  // check empty pwd field
  if (pwdVal === "") {
    return "Fill the password please";
  }

  // check pwd length
  if (pwdVal.length < 5 || pwdVal.length > 10) {
    return "Password must be 5-10 characters long";
  }

  if (!pwdVal.match(/^[A-Za-z0-9]/)) {
    return "Use only numbers or letters";
  }

  return "";
};
const isPasswordSame = () => {
  if (confirmPwd.value === pwd.value) {
    return "";
  } else return "Password is different";
};

const isEmail = () => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.toLowerCase())) {
    return "";
  } else return "Wrong email type";
};

email.addEventListener("focusout", () => {
  emailMessage.innerText = isEmail();
});

pwd.addEventListener("focusout", () => {
  pwdMessage.innerText = verifyPassword();
});

confirmPwd.addEventListener("change", () => {
  cPwdMessage.innerText = isPasswordSame();
});
