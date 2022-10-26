const elForm = document.getElementById("js-form");
const elInput = document.getElementById("js-input");
const elBtnAdd = document.getElementById("addBtn");
const elUl = document.getElementById("js-list");
const elDivModal = document.getElementById("exampleModal");
const elInputEdit = document.getElementById("newEdited");
const elBtnSave = document.getElementById("saveBtn");

// Bu yerda local storageda ma'lumot bo'lsa sh ma'lumotni parse qilib oladi, bo'lmasa bo'sh string
let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

elBtnAdd.style.display = "none";

// Input ichidagi ma'lumot talabga javob berishini tekshirish, listeneri pastroqda
const checkForValue = (evt) => {
  evt.target.value.replace(/ /g, "").length > 2
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
    elBtnEdit.classList = "btn btn-success ms-auto";
    elBtnDel.classList = "btn btn-danger ms-1";
    elImgEdit.classList = "edit";
    elImgTrash.classList = "trash";

    // Src lar
    elImgEdit.src = "images/png/edit.png";
    elImgTrash.src = "images/png/trash.png";

    // Dataset
    elLi.dataset.id = todo.id;
    elBtnEdit.dataset.bsToggle = "modal";
    elBtnEdit.dataset.bsTarget = "#exampleModal";

    // Textlar
    elP.textContent = todo.title;

    // Types
    elCheck.type = "checkbox";

    // Styles
    if (todo.isComp) {
      elP.classList.add("text-decoration-line-through");
      elCheck.checked = "true";
    }

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
  if (elInput.value.replace(/ /g, "").length > 2) {
    let todo = {
      id: uuid.v4(),
      title: elInput.value.trim(),
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

const separate = (evt) => {
  let forShort = evt.target;
  // Delete
  if (forShort.matches(".trash") || forShort.matches(".btn-danger")) {
    todos = JSON.parse(localStorage.getItem("todos")).filter(
      (element) => element.id != forShort.closest("li").dataset.id
    );
    localStorage.setItem("todos", JSON.stringify(todos));
    renderLoop(JSON.parse(localStorage.getItem("todos")));
  }

  // Edit
  else if (forShort.matches(".edit") || forShort.matches(".btn-success")) {
    let foundItem = JSON.parse(localStorage.getItem("todos")).find(
      (element) => element.id == forShort.closest("li").dataset.id
    );
    elInputEdit.value = foundItem.title;

    const modalSeperate = (evt) => {
      if (
        evt.target.matches("#exampleModal") ||
        evt.target.matches(".modal-dialog") ||
        evt.target.matches(".btn-close")
      ) {
        elBtnSave.setAttribute("disabled", "true");
        elDivModal.removeEventListener("click", modalSeperate);
      } else if (evt.target.matches("#saveBtn")) {
        if (elInputEdit.value.replace(/ /g, "").length > 2) {
          foundItem.title = elInputEdit.value;
          todos.find((element) => element.id === foundItem.id).title =
            foundItem.title;

          localStorage.setItem("todos", JSON.stringify(todos));
          renderLoop(JSON.parse(localStorage.getItem("todos")));
          elDivModal.removeEventListener("click", modalSeperate);
          elBtnSave.setAttribute("disabled", "true");
        }
      }
      elInputEdit.addEventListener("keyup", (evt) => {
        if (evt.target.value.replace(/ /g, "").length > 2) {
          elBtnSave.removeAttribute("disabled");
        } else elBtnSave.setAttribute("disabled", "true");
      });
    };

    elDivModal.addEventListener("click", modalSeperate);
  }

  // CheckMark
  else if (forShort.matches(".form-check-input")) {
    let checkedItem = JSON.parse(localStorage.getItem("todos")).find(
      (element) => element.id === forShort.closest("li").dataset.id
    );
    todos.find((element) => element.id === checkedItem.id).isComp =
      !checkedItem.isComp;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderLoop(JSON.parse(localStorage.getItem("todos")));
  }
};

elInput.addEventListener("keyup", checkForValue);
elForm.addEventListener("submit", adder);
elUl.addEventListener("click", separate);

renderLoop(todos);
