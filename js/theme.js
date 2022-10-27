const elBtnTheme = document.querySelector(".theme");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
const elModalContent = document.querySelector(".myModal");

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

const themeSetter = (evt) => {
  if (evt === "light") {
    document.body.classList.add("thLight");
    elUl.classList.add("ulLight");
    sun.style.display = "none";
    moon.style.display = "block";
    elBtnTheme.classList.add("btnLight");
    elModalContent.classList.add("modalBg");
  } else if (evt === "dark") {
    document.body.classList.remove("thLight");
    elUl.classList.remove("ulLight");
    sun.style.display = "block";
    moon.style.display = "none";
    elBtnTheme.classList.remove("btnLight");
    elModalContent.classList.remove("modalBg");
  }
};

const themeSwitcher = () => {
  if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");

    themeSetter(localStorage.getItem("theme"));
  } else if (localStorage.getItem("theme") === "light") {
    localStorage.setItem("theme", "dark");

    themeSetter(localStorage.getItem("theme"));
  }
};

elBtnTheme.addEventListener("click", themeSwitcher);

themeSetter(localStorage.getItem("theme"));
