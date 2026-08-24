// Copy range B12:K22 from the Sheets here
let split = `lmay01A.5ef AMä	29	lyh04.4f VKo	21	läi05.6 JJu	27	lyh05.1ABI VKo	29	lmaa13.3ABI HNo	30
lmay01A.3f HNo	30	lke07.1ABI HHu	15	läi05.4 HTe	26	lena09.5ABI RKo	30	lbi07.2ABI POj	25
lmay01A.6ef PRu	31	lsaa03 JSn	11	läi05.1 TLy	22	lena09.4ABI PAu	23	lmaa05.5f PRu	23
lke07.2ABI HHu	19	lhi05.1f SHi	28	ls205 MAl	16	lbi07.1ABI POj	15	lmaa05.3f NNu	30
lhi01.1f SHi	30	lfy05.1fe JMa	31	lrua09.1ABI/lrub09.1ABI MPa	31	läi05.5 HTe	30	lmaa05.1f AMä	27
lge01.4f MMe	31	let07.ABI/lue07.ABI NMä	11	lhi02.5ef SHi	32	läi05.2 JJu	31	lfi05.ABI LLa	8
lfi02.1f EHä	32	lps01.6ef MiV	31	lfi02.2f LLa	31	lte01.3f OVi	36	let02.2ef VeA	32
lena09.2ABI PSk	22	lena01+02.2 RKo	31	lena09.2ABI PSk	22	lrua09.1ABI/lrub09.1ABI MPa	31	lena09.1ABI RKo	33
lena05.6 MHu	33	lbi04.3ef CFr	25	lena04.3 MHu	32	lmaa05.4f NNu	30	lmay01A.2f EMa	30
				lbi01.4f ARa	26
									`;

// Copy range B27:K38 from the Sheets  here
let normal = `lyh05.1ABI VKo	29	lli02.2fe JWi	26	lmu01.5e MMc	26	lps01.2f MiV	31	läi01.4 JJu	23
lena09.5ABI RKo	30	lku02.1f EPe	25	lmu01.2e TTu	26	lke07.2ABI HHu	19	lyh01.5f ATa	31
lena09.4ABI PAu	23	lyh01.3f ATa	31	lli01.6ef PBo	27	lhi01.1f SHi	30	lue02.3f NMä	32
lbi07.1ABI POj	15	läi01.5 MHe	30	lku01.7ef KEs	27	lge01.4f MMe	31	lss201.1+2 MAl	1
läi05.5 HTe	30	lrub09.2ABI MPa	22	lku01.1f EPe	26	lfi02.1f EHä	32	lrub04.2 JSn	31
läi05.2 JJu	31	lena09.3ABI PSk	27	lke01+02.3f EMa	26	lmay01A.5ef AMä	29	lrub01+02.6 TNu	28
lte01.3f OVi	36	lmay01A.4f AMä	31	lyh05.1ABI VKo	29	lmay01A.3f HNo	30	lrub01+02.3 APa	26
lrua09.1ABI/lrub09.1ABI MPa	31	lmay01A.1f EMa	29	lena09.5ABI RKo	30	lmay01A.6ef PRu	31	lrub01+02.1 MPa	25
lps01.2f MiV	31	leaa04 MHu	10	lbi07.1ABI POj	15	lena09.2ABI PSk	22	lrua01+02 MiV	16
lmaa05.4f NNu	30			lena09.4ABI PAu	23	lena05.6 MHu	33	lraa08/lrab206/lrab308 IWi	18
				lke07.2ABI HHu	19			lmab08.1f JMa	28
									`;

/**
 * Transposes the given array, swapping columns and rows.
 * @template T
 * @param {T[][]} array
 * @param {T} def - Default value to fill cells with if the rows are not even
 * @returns {T[][]}
 */
function transpose(array, def) {
  // Source - https://stackoverflow.com/a/17428705
  // Posted by Fawad Ghafoor, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-08-19, License - CC BY-SA 4.0

  return array[0].map((_, colIndex) =>
    array.map((row) => (colIndex < row.length ? row[colIndex] : def)),
  );
}

/**
 * Zips the given arrays.
 * @template T
 * @param {T[]} array1
 * @param {T[]} array2
 * @returns {[T, T][]}
 */
function zip(array1, array2) {
  if (array1.length != array2.length)
    throw new Error(`Lengths inequal: ${array1.length} != ${array2.length}`);

  return array1.map((val, i) => [val, array2[i]]);
}

/**
 * Extracts the courses on the days of the week from a TSV (tab-separated values) string.
 * @param {string} text
 * @returns {string[][]} Array of days of week containing arrays of courses.
 */
function parseTSV(text) {
  const rows = text.split("\n").map((row) => row.split("\t"));
  const columns = transpose(rows, "");

  // remove odd indices
  const daysOfWeek = columns.filter((_, index) => index % 2 === 0);

  return daysOfWeek;
}

const splitDays = parseTSV(split);
const normalDays = parseTSV(normal);
/** @type {[splitCourses: string[], normalCourses: string[]][]} */
const dayStacks = zip(splitDays, normalDays);

console.log(
  "Old string format:",
  dayStacks
    .map((lunchtimes) =>
      lunchtimes.map((courses) => courses.join(",")).join("*"),
    )
    .join("?"),
);

// Note: Sunday is the first day of week due to Date.getDay()
const dayNamesEnglish = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayNamesFinnish = [
  "Sunnuntai",
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
];

/** @type {string[]} */
let splits = [];
/** @type {string[]} */
let normals = [];
/** @type {string[]} */
let allCourses = [];

let chosenDayIdx = 0;
let onkoVklp = () => {
  let chosenDayName = dayNamesEnglish[chosenDayIdx];
  return chosenDayName == "Saturday" || chosenDayName == "Sunday";
};

const courseSelect = document.getElementById("dd");
const resultLbl = document.getElementById("resultLbl");
const dayLbl = document.getElementById("dayLbl");

function previousDay() {
  // +7 is required because JavaScript's remainder operator doesn't wrap -1 to 6 (unlike a modulo operator).
  chosenDayIdx = (chosenDayIdx - 1 + 7) % 7;
  loadDay();
}

function nextDay() {
  chosenDayIdx = (chosenDayIdx + 1) % 7;
  loadDay();
}

function loadDay() {
  loadDayVariables();

  courseSelect.textContent = "";
  allCourses.forEach(addCourseToSelect);

  dayLbl.textContent = dayNamesFinnish[chosenDayIdx];
  loadCourseFromStorage();
  showResult();
}

window.addEventListener("load", () => {
  chosenDayIdx = new Date().getDay();
  loadDay();
});

function loadDayVariables() {
  const mondayFirstIndex = (chosenDayIdx + 6) % 7;

  let dayStack = dayStacks[mondayFirstIndex];
  splits = dayStack?.[0] ?? [];
  normals = dayStack?.[1] ?? [];

  allCourses = [...splits, ...normals];
}

function showResult() {
  if (onkoVklp()) {
    resultLbl.textContent = "VKLP!";
  } else if (courseSelect.value && splits.includes(courseSelect.value)) {
    resultLbl.textContent = "SPLIT";
  } else if (courseSelect.value && normals.includes(courseSelect.value)) {
    resultLbl.textContent = "NORMAALI";
  } else {
    resultLbl.textContent = "?";
  }
}

function showUnknownResult() {
  if (onkoVklp()) {
    resultLbl.textContent = "VKLP!";
  } else {
    resultLbl.textContent = "?";
  }
}

function addCourseToSelect(item) {
  if (item.length === 0) {
    return;
  }

  let opt = document.createElement("option");
  opt.value = item;
  opt.textContent = item;
  courseSelect.appendChild(opt);
}

function saveCourseToStorage() {
  if (!onkoVklp())
    localStorage.setItem(dayNamesEnglish[chosenDayIdx], courseSelect.value);
}

function loadCourseFromStorage() {
  if (!onkoVklp())
    courseSelect.value = localStorage.getItem(dayNamesEnglish[chosenDayIdx]);
}

function courseSelectHandler() {
  showUnknownResult();
}

function showHandler() {
  showResult();
  saveCourseToStorage();
}
