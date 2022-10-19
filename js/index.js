const elForm = document.getElementById("js-form");
const elInput = document.getElementById("js-input");
const elBtnAdd = document.getElementById("addBtn");
const elUl = document.getElementById("js-list");

// Bu yerda local storageda ma'lumot bo'lsa sh ma'lumotni parse qilib oladi, bo'lmasa bo'sh string
let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

elBtnAdd.style.display = "none";

// Input ichidagi ma'lumot talabga javob berishini tekshirish, listeneri pastroqda
const checkForValue = (evt) => {
  evt.target.value.trim().length > 2
    ? (elBtnAdd.style.display = "block")
    : (elBtnAdd.style.display = "none");
};

const renderLoop = (evt) => {
  elUl.innerHTML = null;
  evt.forEach((todo) => {
    // O'zgaruvchilar
    let elLi = document.createElement("li");
    let elCheck = document.createElement("input");
    let elP = document.createElement("p");
    let elBtnEdit = document.createElement("button");
    let elBtnDel = document.createElement("button");
    let elImgEdit = document.createElement("img");
    let elImgTrash = document.createElement("img");

    // Classlar
    elLi.classList = "p-2 d-flex align-items-center border-bottom px-3";
    elCheck.classList = "form-check-input me-1 p-0 m-0";
    elP.classList = "me-1 p-0 m-0";
    elBtnEdit.classList = "btn btn-danger ms-auto";
    elBtnDel.classList = "btn btn-success ms-1";
    elImgEdit.classList = "edit";
    elImgTrash.classList = "trash";

    // Src lar
    elImgEdit.src = "images/png/edit.png";
    elImgTrash.src = "images/png/trash.png";

    // Textar
    elP.textContent = todo.title;

    // Types
    elCheck.type = "checkbox"

    // Appendlar
    elBtnEdit.appendChild(elImgEdit);
    elBtnDel.appendChild(elImgTrash);
    elLi.append(elCheck, elP, elBtnEdit, elBtnDel);
    elUl.appendChild(elLi);
  });
};

// Forma submit yoki input enter bosilganda render funksiya
const adder = (evt) => {
  evt.preventDefault();

  // Yangi todo yaratish
  if (elInput.value.trim().length > 2) {
    let todo = {
      id: 1,
      title: elInput.value,
      isComp: false,
    };

    // Todosga yangi todo ni qo'shish; local storage ga set;
    todos.unshift(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderLoop(JSON.parse(localStorage.getItem("todos")));
    elInput.value = null;
    elBtnAdd.style.display = "none";
  }
};

elInput.addEventListener("keyup", checkForValue);
elForm.addEventListener("submit", adder);

renderLoop(todos);
