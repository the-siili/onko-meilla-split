// Copy range B12:K22 from the Sheets here
let split = `läi10.1ABI HTe	29	lyh03.6fe ATa	26	lrub01+02.3 APa	27	lmaa06.4f/lmaa09.4f NNu	31	lmaa10.1f EHä	34
läi01.6 STa	22	ls208 MAl	21	lrub01+02.1 MPa	26	lmaa10.3f HNo	29	lmaa06.5f/lmaa09.5f NNu	29
läi01.1 JJu	21	lrub01+02.4 TNu	28	lrua01+02 MiV	14	lhi03.4fe SHi	30	läi08.3 HTe	28
lyh03.4fe VKo	29	lhi03.2f SHi	27	läi10.6ABI HTe	29	lhi02.2f ATa	31	lyh03.2fe VKo	31
lte01.1f ALa	31	lfy06.2fe JMa	21	läi08.5 JJu	28	lge01.3f MMe	32	lue02.1f NMä	31
lena01+02.4 PSk	22	lena01+02.6 RKo	28	läi05.3 MHe	30	lfy08.2fe JMa	23	lsab207/lsab309 JSn	12
ls201 MAl	26	lraa03 OVi	15	läi02+06.4 STa	23	lfi02.6ef LLa	30	lrub04.5 TNu	22
lrub01+02.5 PAu	30	lps03.2ef LLa	29	lena05.2 PAu	29	lena05.5 MHu	28	lrua07 PAu	12
lrub01+02.2 MPa	31	lmaa17.fe AMä	9	lfy09.e MSl	6	lena01+02.3 RKo	25	lena05.4 RKo	29
lmab09.1f EMa	27			lfy08.3fe JMa	18	lsaa07 JSn	8	lbi01.5fe POj	26
				lena05.1 PSk	31				`;

// Copy range B27:K38 from the Sheets  here
let normal = `lmaa06.4f/lmaa09.4f NNu	31	lmaa03.2f HNo	26	lmab09.2f NNu	26	läi10.1ABI HTe	29	lli01.2fe RKi	26
lfy08.2fe JMa	23	läi02+06.3 MHe	33	lmaa10.4f AMä	19	läi01.6 STa	22	lku01.4f EPe	25
lmaa10.3f HNo	29	lke03.3fe HHu	28	lke06.1fe HHu	22	läi01.1 JJu	21	lke01+02.6ef HHu	26
lhi03.4fe SHi	30	lke03.2fe EMa	27	lps01.5ef LLa	29	lyh03.4fe VKo	29	lmu01.3e TTu	26
lhi02.2f ATa	31	lsab203/lsab305 JSn	8	lrub01+02.6 TNu	30	lte01.1f ALa	31	lmu01.1e MMc	27
lge01.3f MMe	32	läi08.4 HTe	25	lte01.6ef OVi	28	lena01+02.4 PSk	22	lmaa06.3f/lmaa09.3f PRu	22
lfi02.6ef LLa	30	läi06.1/läi07.1 JJu	11	lss201.1+2 MAl	6	ls201 MAl	26	lmab04.2f JMa	26
lena05.5 MHu	28	lrab203/lrab305 IWi	4	lyh03.3fe VKo	19	lrub01+02.5 PAu	30	lhi03.5ef ATa	31
lena01+02.3 RKo	25	lena01+02.5 MHu	28	lyh01.2f ATa	31	lrub01+02.2 MPa	31	lfy01+02.7ef MSl	26
lsaa07 JSn	8	lena01+02.1 PAu	27	lfi02.5ef EHä	29	lmab09.1f EMa	27	let02.1f LVä	27
				lhi02.4f SHi	24
				leaa07/leab207/leab309 SaT	14				`;

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
