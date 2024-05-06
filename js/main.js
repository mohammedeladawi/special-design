const colorsLi = document.querySelectorAll(".colors-list li");
const randomBackgroundSpans = document.querySelectorAll(
  ".random-backgrounds span"
);
const bulletsOptions = document.querySelectorAll(".bullets-options span");

// Check If Color Is Existed In Local Storage
let localStorageColor = localStorage.getItem("color");
if (localStorageColor) {
  // Change --main-color Form :root Element
  document.documentElement.style.setProperty("--main-color", localStorageColor);
  // Set Acive Class In Colors List Item
  colorsLi.forEach((li) => {
    li.classList.remove("active");
    li.dataset.color === localStorageColor && li.classList.add("active");
  });
}

// Check If There Is A Random Item In The Local Storge
let localStorageRandomBackground = localStorage.getItem("randomBackground");
if (localStorageRandomBackground) {
  randomBackgroundSpans.forEach((span) => {
    span.classList.remove("active");
    span.classList.contains("yes") && span.classList.add("active");
  });
}

// Check If Show Bullets Is Active In Local Storage
let localStorageShowBullets = localStorage.getItem("showBullets");
if (!localStorageShowBullets) {
  bulletsOptions.forEach((btn) => {
    btn.classList.contains("no")
      ? btn.classList.add("active")
      : btn.classList.remove("active");
  });
  document.querySelector(".nav-bullets").style.display = "none";
}

// Open Settings Box
const settingsIcon = document.querySelector(".settings-box .icon");
settingsIcon.onclick = function () {
  this.firstElementChild.classList.toggle("fa-spin");
  this.parentElement.classList.toggle("opened");
};

// Change Color
colorsLi.forEach((listItem) => {
  listItem.onclick = function (e) {
    // Change The Active Class
    handleActive(e);
    // Change --main-color Form :root Element
    document.documentElement.style.setProperty(
      "--main-color",
      this.dataset.color
    );
    // Add It To Local Storage
    window.localStorage.setItem("color", this.dataset.color);
  };
});

// If User Clicked On The Toggle Menu Show The Links
let toggleMenu = document.querySelector(".header-area .toggle-menu");
let tLinks = document.querySelector(".header-area .links");
toggleMenu.addEventListener("click", function (e) {
  e.stopPropagation();
  this.nextElementSibling.classList.toggle("open");
});

// If I Clicked On Element Inside tLinks Conider It As tLinks
tLinks.onclick = (e) => e.stopPropagation();

// If User Clicked Any Where While Menu Links Is Opened
document.addEventListener("click", (e) => {
  if (
    e.target !== toggleMenu &&
    e.target !== tLinks &&
    tLinks.classList.contains("open")
  ) {
    document.querySelector(".header-area .links").classList.remove("open");
  }
});

// Change Landing Page Background Image Randomly
const landingPage = document.querySelector(".landing-page");
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let backgroundInterval;
function changeBackground() {
  // If Local Storage Random Background Is Existed And True
  if (localStorage.getItem("randomBackground")) {
    backgroundInterval = setInterval((_) => {
      let randomIndex = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url(../imgs/${imgsArray[randomIndex]})`;
    }, 1000);
  }
}

// Turn On Or Of Random Background Images
randomBackgroundSpans.forEach((btn) => {
  btn.onclick = function (e) {
    handleActive(e);
    clearInterval(backgroundInterval);
    if (this.classList.contains("no")) {
      window.localStorage.removeItem("randomBackground");
    } else {
      window.localStorage.setItem("randomBackground", true);
      changeBackground();
    }
  };
});

// Show Or Hide Nav Bullets
bulletsOptions.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.classList.contains("yes")) {
      document.querySelector(".nav-bullets").style.display = "block";
      localStorage.setItem("showBullets", true);
    } else {
      document.querySelector(".nav-bullets").style.display = "none";
      localStorage.showBullets && localStorage.removeItem("showBullets");
    }
  });
});

// Reset Local Storage When I Click On Reset Options Button
let resetBtn = document.querySelector(".settings-box .reset-options");
resetBtn.onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// Navigation Bullets Scroll
let bullets = document.querySelectorAll(".nav-bullets .bullets>li");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document
      .querySelector("." + e.currentTarget.dataset.section)
      .scrollIntoView({
        // behavior: "smooth",
      });
  });
});

// Dispaly Skill Progress When I Arrive
let skills = document.querySelector(".skills");
let progSpan = document.querySelectorAll(".skills .progress>span");
window.onscroll = function () {
  if (this.scrollY >= skills.offsetTop - 400) {
    progSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// Show Image Popup When Clicked On Image
let images = document.querySelectorAll(".gallery img");
images.forEach((img) => {
  img.addEventListener("click", () => {
    // Overlay Behind Image
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);
    // Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    document.body.appendChild(popupBox);
    // Check If There Is Alt Text Add Them To The Frame
    if (img.alt) {
      let imageHeading = document.createElement("h3");
      let imageAlt = document.createTextNode(img.alt);
      imageHeading.appendChild(imageAlt);
      popupBox.appendChild(imageHeading);
    }
    // Image Popup
    let popupImage = document.createElement("img");
    popupImage.className = "popup-image";
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    // Close Popup Window And OverLay;
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.textContent = "X";
    popupBox.appendChild(closeButton);

    closeButton.onclick = () => {
      popupBox.previousSibling.remove();
      popupBox.remove();
    };
  });
});

// Handle Active Buttons
function handleActive(event) {
  event.currentTarget.parentElement
    .querySelector(".active")
    .classList.remove("active");
  event.currentTarget.classList.add("active");
}

changeBackground();
