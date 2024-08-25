'use strict';

// element toggle function
const elementToggleFunc = (elem) => { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// achievements variables
const achievementsItems = document.querySelectorAll("[data-achievements-item]");

// modal toggle function
const achievementsModalFunc = function (modalContainer, overlay) {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
achievementsItems.forEach(item => {
  item.addEventListener("click", function () {
    const itemId = this.getAttribute("data-achievements-item");
    const modalContainer = document.querySelector(`[data-modal-container="${itemId}"]`);
    const modalCloseBtn = modalContainer.querySelector(`[data-modal-close-btn="${itemId}"]`);
    const overlay = modalContainer.querySelector(`[data-overlay="${itemId}"]`);
    const modalImg = modalContainer.querySelector(`[data-modal-img="${itemId}"]`);
    const modalTitle = modalContainer.querySelector(`[data-modal-title="${itemId}"]`);
    const modalText = modalContainer.querySelector(`[data-modal-text="${itemId}"]`);

    modalImg.src = this.querySelector("[data-achievements-avatar]").src;
    modalImg.alt = this.querySelector("[data-achievements-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-achievements-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-achievements-text]").innerHTML;

    achievementsModalFunc(modalContainer, overlay);

    // add click event to modal close button and overlay
    modalCloseBtn.addEventListener("click", function () { achievementsModalFunc(modalContainer, overlay); }, { once: true });
    overlay.addEventListener("click", function () { achievementsModalFunc(modalContainer, overlay); }, { once: true });
  });
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}