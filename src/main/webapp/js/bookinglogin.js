import { BASE_URL } from "./urlMapper.js";
import { setCookie } from "./cookie.js";

const loginButton = document.getElementsByClassName("login_btn")[0];

loginButton.addEventListener("click", () => {
	const loginEmailInput = document.getElementsByClassName("login_input")[0];
	const loginEmail = loginEmailInput.value;
	
	setCookie("email", loginEmail);
	location.href = BASE_URL + "myreservation.html"; 
})