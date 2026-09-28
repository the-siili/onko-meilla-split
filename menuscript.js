// Define API types for TypeScript using JSDoc annotations: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
/** @typedef {Record<string, { amount: number, unit: string }>} Macros */
/** @typedef {{ diets: string, ingredients: string, macros: Macros | null }} Meal */
/** @typedef {{ [packageName: string]: [mealName: string, Meal | null][] }} MealPackage */
/** @typedef {{ Info: Record<string, string>, Menu: Record<string, MealPackage[]>, Week: number }} MenuApiData */

const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayListFinnish = [
  "Sunnuntai",
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
];
let day = "Wednesday";

let publicData = "";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const date = new Date();
    let dayOfWeek = date.getDay();

    // Saturday and Sunday to Friday
    if (dayOfWeek == 6 || dayOfWeek == 0) {
      dayOfWeek = 5;
    }

    day = dayList[dayOfWeek];

    document.getElementById("day_label").innerText =
      dayListFinnish[dayList.indexOf(day)];

    //on start set public data from memory, the load new data from website to it
    publicData = JSON.parse(localStorage.getItem("menu_data"));

    getMenuData();
  },
  false,
);

function renderDay() {
  document.getElementById("week_count").innerText = `Viikko ${retrieveWeek()}`;

  /** @type {MenuApiData} */
  const parsedData = JSON.parse(publicData);
  const menu = parsedData["Menu"];
  const packages = menu[day].flatMap((val) => Object.entries(val));

  const packagesElem = document.getElementById("meal_packages");
  packagesElem.innerText = ""; // Empty the menu
  packages.forEach(([packageName, meals]) => {
    renderMealPackage(packageName, meals, packagesElem);
  });
}

/**
 * Renders a meal package.
 * @param {string} packageName
 * @param {[mealName: string, Meal | null][]} meals
 * @param {Element} parentElem
 */
function renderMealPackage(packageName, meals, parentElem) {
  const packageElem = document.createElement("div");

  const labelElem = document.createElement("h3");
  labelElem.innerText = packageName;
  packageElem.appendChild(labelElem);
  packageElem.appendChild(document.createElement("hr"));

  const mealsElem = document.createElement("div");
  mealsElem.classList.add("accordion", "accordion-flush");

  meals.forEach(([mealName, meal]) => {
    console.log("Meal:", mealName, meal);
    if (meal != null) {
      renderMeal(
        mealName,
        meal.diets,
        renderMacros(meal.macros),
        mealsElem,
        meal.ingredients,
      );
    } else {
      renderMeal(mealName, "", "", mealsElem, "ei saatavilla");
    }
  });

  packageElem.appendChild(mealsElem);
  parentElem.appendChild(packageElem);
}

/**
 * Renders a meal.
 * @param {string} name - Name of the meal.
 * @param {string} diet - Dietary labels.
 * @param {string} macroHtml - HTML string of the macronutrient information from {@link renderMacros}.
 * @param {Element} parentElem - Parent element.
 * @param {string} ingredients - Ingredient information.
 */
function renderMeal(name, diet, macroHtml, parentElem, ingredients) {
  const elementId = Math.floor(Math.random() * 90000000).toString();

  const container = document.createElement("div");
  container.classList.add("accordion-item");

  const accordionHeader = `<h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${elementId}" aria-expanded="false" aria-controls="flush-collapseOne">
    ${name}${diet == "" ? "" : ` (${diet})`}
    </button>
  </h2>`;

  const macroElementWrapper =
    macroHtml == ""
      ? ""
      : `<div class="card fs-6">
    <div class="card-header text-start container bg-body-secondary">
      <div class="row">
        <div class="col text-start">
          <b>Ravintosisältö</b>
        </div>
        <div class="col text-end">
          per 100g
        </div>
      </div>
    </div>

    <div class="card-body container">
      <div class="row">
        <div class="col text-start">
          <p class="card-text ruoka-kortti">
            Energia
          </p>
          <p class="card-text ruoka-kortti">
            Rasva
          </p>
          <p class="card-text ruoka-kortti" style="text-indent: 2ch; ">
            Tyydyttynyt
          </p>
          <p class="card-text ruoka-kortti">
            Hiilihydraatit
          </p>
          <p class="card-text ruoka-kortti" style="text-indent: 2ch;">
            Sokeri
          </p>
          <p class="card-text ruoka-kortti">
            Proteiini
          </p>
          <p class="card-text ruoka-kortti">
            Suola
          </p>
          <p class="card-text ruoka-kortti">
            Kuitu
          </p>
        </div>
        ${macroHtml}
      </div>
    </div>
  </div>`;

  // Give the parent element an ID
  if (parentElem.id == "")
    parentElem.id = Math.floor(Math.random() * 90000000).toString();

  const accordionBody = `<div id="${elementId}" class="accordion-collapse collapse" data-bs-parent="#${parentElem.id}">
    <div class="accordion-body" style="padding-left: 0px; padding-right: 0px;">
      ${macroElementWrapper}
      <div class="card fs-6" style="margin-top: 5px;">
        <div class="card-header text-start container bg-body-secondary">
          <div class="col"><strong>Ainesosat</strong></div>
        </div>

        <div class="card-body container">
          <div class="col">
           ${ingredients}
          </div>
        </div>
      </div>


    </div>
  </div>`;

  container.innerHTML = accordionHeader + accordionBody;
  parentElem.appendChild(container);
}

/**
 * Renders macronutrients.
 * @param {Macros | null} macros - Map of macronutrients.
 * @returns {string}
 */
function renderMacros(macros) {
  const renderMacro = (name) => {
    try {
      return `${macros[name]["amount"]} ${macros[name]["unit"]}`;
    } catch {
      return "ei tiedossa";
    }
  };

  console.log("Macros:", macros);
  if (macros == null) {
    return "";
  }

  const output = `<div class="col text-end" style="font-weight: 200;">
    <p class="card-text ruoka-kortti">
    ${renderMacro("EnergyKj")}, ${renderMacro("EnergyKcal")}
    </p>
    <p class="card-text ruoka-kortti">
    ${renderMacro("Fat")}
    </p>
    <p class="card-text ruoka-kortti">
    ${renderMacro("FatSaturated")}
    </p>
    <p class="card-text ruoka-kortti">
    ${renderMacro("Carbohydrates")}
    </p>
    <p class="card-text ruoka-kortti">
    ${renderMacro("Sugar")}
    </p>
    <p class="card-text ruoka-kortti">
    ${renderMacro("Protein")}
    </p>
    <p class="card-text ruoka-kortti">
    ${renderMacro("Salt")}
    </p>
    <p class="card-text ruoka-kortti">
    ${renderMacro("Fiber")}
    </p>
  </div>`;

  return output;
}

function getMenuData() {
  fetch("https://ksyk-menu-scraper.onrender.com/")
    .then(resp => resp.text())
    .then(function (output) {
      publicData = output;
      localStorage.setItem("menu_data", output);
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong!", err);
    });
}

function retrieveWeek() {
  /** @type {MenuApiData} */
  const parsedData = JSON.parse(publicData);
  var week = parsedData["Week"];
  console.log("Current week:", week);
  return week;
}

function test() {
  alert("bruh");
}

function openNextDay() {
  if (dayList.indexOf(day) < 5) {
    day = dayList[dayList.indexOf(day) + 1];
    document.getElementById("day_label").innerText =
      dayListFinnish[dayList.indexOf(day)];
    renderDay();
  } else {
    day = dayList[1];
    document.getElementById("day_label").innerText =
      dayListFinnish[dayList.indexOf(day)];
    renderDay();
  }
}

function openPreviousDay() {
  if (dayList.indexOf(day) > 1) {
    day = dayList[dayList.indexOf(day) - 1];
    document.getElementById("day_label").innerText =
      dayListFinnish[dayList.indexOf(day)];
    renderDay();
  } else {
    day = dayList[5];
    document.getElementById("day_label").innerText =
      dayListFinnish[dayList.indexOf(day)];
    renderDay();
  }
}
