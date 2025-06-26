// fetch json file
const data = [
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
  ];

// select parents to easy traverse through thier children .
const nav = document.querySelector("nav");
const cardContainer = document.querySelector(".card-container");
const filterBTNsContainer = document.querySelector(".filter-btns");
const heroContainer = document.querySelector(".container");

/***************/

function getCardIndex(card, allCards) {
  const index = allCards.indexOf(card);

  return index;
}
function deleteCard(currentFilterButton, card, allCards) {
  // remove card
  const index = getCardIndex(card, allCards);
  allCards.splice(index, 1);

  console.log("index is" + index);

  currentFilterButton.click();
}

let allCards = [];
let activeCards = [];
let inactiveCards = [];
// points on image index to be rendered in nav --> button .

function showAllCards(allCards, container) {
  container.replaceChildren();
  allCards.forEach((card) => {
    container.append(card);
  });
}
function showActiveCards(allCards, container) {
  // active cards marked with active class .

  // removes all childs(cards)
  container.replaceChildren();
  activeCards = allCards.filter((card) =>
    card.querySelector(".switch-btn").classList.contains("active")
  );

  activeCards.forEach((card) => {
    container.append(card);
  });
  console.log(activeCards);
}
function showInactiveCards(allCards, container) {
  // active cards marked with active class .

  // removes all childs(cards)
  container.replaceChildren();
  inactiveCards = allCards.filter(
    (card) => !card.querySelector(".switch-btn").classList.contains("active")
  );

  inactiveCards.forEach((card) => {
    container.append(card);
  });
  console.log(inactiveCards);
}

const imageSRC = [
  "./assets/images/icon-sun.svg",
  "./assets/images/icon-moon.svg"
];

(function createCards(cardsNum = 1) {
  for (let i = 0; i < cardsNum; i++) {
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const par = document.createElement("p");

    img.classList.add("extension-avatar");
    title.classList.add("extension-title");
    par.classList.add("extension-desc");

    const removeBTN = document.createElement("button");
    const switchBTN = document.createElement("button");
    const circleDIV = document.createElement("div");
    removeBTN.innerHTML = "Remove";
    removeBTN.classList.add("remove-btn");
    switchBTN.classList.add("switch-btn", "active", "btn");

    circleDIV.classList.add("switch-circle");

    const card = document.createElement("div");
    const textContainer = document.createElement("div");
    card.classList.add("card");
    textContainer.classList.add("card-text");

    card.append(img);
    card.append(textContainer);
    textContainer.append(title);
    textContainer.append(par);
    card.append(removeBTN);
    switchBTN.append(circleDIV);
    card.append(switchBTN);

    // cardContainer.append(card);
    allCards.push(card);
  }
})(12);
showAllCards(allCards, cardContainer);

function populateCards(data, cards) {
  console.log(cards);

  cards.forEach((element, index) => {
    const image = element.querySelector("img");
    const title = element.querySelector(".card-text>h2");
    const desc = element.querySelector(".card-text>p");
    console.log("aces");
    image.setAttribute("src", data[index].logo);
    title.innerText = data[index].name;
    desc.innerText = data[index].description;
    element.setAttribute("data-isActive", data[index].isActive);
  });
}
 populateCards(data, cardContainer.querySelectorAll(".card"));

function switchTheme(parent, elements) {
  if (parent) {
    elements.forEach((element) => {
      element.classList.toggle("dark-mode-parent");
    });
    nav.querySelector("img").classList.toggle("filter-image");
  } else {
    elements.forEach((element) => {
      element.classList.toggle("dark-mode-child");
    });
  }
}

// flip background image for nav --> button
function flipButtonBG(isThemeChange = true) {
  const button = nav.querySelector(".nav-btn");
  if (isThemeChange) {
    button.classList.add("change-background-image");
  } else {
    button.classList.remove("change-background-image");
  }
  return !isThemeChange;
}

let isThemeChange = true;
nav.querySelector(".nav-btn").addEventListener("click", () => {
  // elements that will have parent style --- it's not mandatory its a parent ---
  const parents = [
    heroContainer.querySelector(".title"),
    document.body,
    cardContainer
  ];
  // elements that will have parent child --- it's not mandatory its a child ---
  const children = [
    nav,
    nav.querySelector(".nav-btn"),
    ...allCards,
    ...[...filterBTNsContainer.querySelectorAll(".filter-btns-btn")]
  ];

  switchTheme(true, parents);
  switchTheme(false, children);
  isThemeChange = flipButtonBG(isThemeChange);
});
let currentActive = filterBTNsContainer.querySelectorAll(".filter-btns-btn")[0];

// returns button status all active  or inactive
function getButtonStatus(button, classIndex = 0) {
  const buttonStatues = button.classList[classIndex].substring(
    classIndex,
    button.classList[classIndex].indexOf("-")
  );
  return buttonStatues;
}
// change active filter-button on click .(via event propagation , which is cleaner than using foreach)
filterBTNsContainer.addEventListener("click", (el) => {
  const clicked = el.target;

  if (el.target.tagName == "BUTTON") {
    currentActive.classList.remove("active");
    clicked.classList.add("active");
    currentActive = clicked;
    filterCards(getButtonStatus(clicked), allCards);
  }
});
// recieve the index of the class which have the status ex: active-btn --> returns active

cardContainer.addEventListener("click", (el) => {
  const clicked = el.target;
  if (clicked.classList.contains("remove-btn")) {
    deleteCard(currentActive, clicked.parentElement, allCards);
  } else if (clicked.parentElement.classList.contains("switch-btn")) {
    clicked.classList.toggle("move-circle");
    clicked.parentElement.classList.toggle("disabled-switch-btn");
    clicked.parentElement.classList.toggle("active");

    // prevent auto click the button when all extensions shown .
    !currentActive.classList.contains("all-btn") ? currentActive.click() : null;
  }
});

function filterCards(active, allCards) {
  switch (active) {
    case "all":
      showAllCards(allCards, cardContainer);
      break;
    case "active":
      showActiveCards(allCards, cardContainer);

      break;
    case "inactive":
      showInactiveCards(allCards, cardContainer);

      break;

    default:
      console.log("No Case Found");
  }
}

function fillt(status, cards) {
  switch (status) {
    case "all": {
    }
  }
}
