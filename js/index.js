/*-----------------------------------------------------------------------------mk--
| Switch Bookmark
|----------------------------------------------------------------------------------
| 
*/
const btnBookmarks = document.querySelectorAll(".bookmark");

btnBookmarks.forEach((btn) => btn.addEventListener("click", switchBookmark));

function switchBookmark(event) {
  if (event.target.classList.contains("bookmark-disable")) {
    event.target.classList.remove("bookmark-disable");
    event.target.classList.add("bookmark-enable");
  } else {
    event.target.classList.remove("bookmark-enable");
    event.target.classList.add("bookmark-disable");
  }
}

/*-----------------------------------------------------------------------------mk--
| Switch Answer
|----------------------------------------------------------------------------------
| 
*/
const btnShowAnswer = document.querySelectorAll(".btnShowAnswer");
const answerArea = document.querySelector(".answer-area");

btnShowAnswer.forEach((btn) => btn.addEventListener("click", switchAnswer));

function switchAnswer(event) {
  if (event.target.previousElementSibling.classList.contains("answer-hidden")) {
    event.target.previousElementSibling.classList.remove("answer-hidden");
    event.target.previousElementSibling.classList.add("answer-visible");
    event.target.textContent = "Antwort ausblenden";
  } else {
    event.target.previousElementSibling.classList.remove("answer-visible");
    event.target.previousElementSibling.classList.add("answer-hidden");
    event.target.textContent = "Antwort einblenden";
  }
}

/*-----------------------------------------------------------------------------mk--
| Create Card
|----------------------------------------------------------------------------------
| 
*/
const quizCardForm = document.querySelector('[data-js="quiz-card"]');
const pseudoCard = document.querySelector('[data-js="pseudo-quiz-card"]');

if (quizCardForm) {
  quizCardForm.addEventListener("submit", createCard);
}

function createCard(event) {
  event.preventDefault(); //console.log('ok');

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData); //console.log(data);

  const quizCard = document.createElement("section");
  quizCard.setAttribute("class", "question-card");

  quizCard.appendChild(getQuestion(data.question));
  quizCard.appendChild(getAnswer(data.answer));
  quizCard.appendChild(toggleAnswer());
  if (data.tags.trim(" ") !== "") {
    quizCard.appendChild(getTag(data.tags));
  }
  quizCard.appendChild(
    getBookmarkImage("./assets/bookmark.svg", "Bookmark-Tag")
  );

  pseudoCard.appendChild(quizCard);

  quizCardForm.reset();
  document.querySelector("#question").focus();

  const charAmount = document.querySelectorAll('[data-js="char-amount"]');
  charAmount.forEach((item) => {
    item.textContent = "";
  });
}

//---------------------------------------------------------------------
// Card Helper-Functions
//---------------------------------------------------------------------
//Erstellt ein Header-Element und platziert eine Frage hinein.
function getQuestion(question) {
  const headerEl = document.createElement("header");
  const textCont = document.createTextNode(question);

  headerEl.setAttribute("class", "question-card__question");

  headerEl.appendChild(textCont);

  return headerEl;
}

//Erstellt ein Div-Element und platziert die (versteckte) Antwort hinein.
function getAnswer(answer) {
  const answerEl = document.createElement("div");
  const textCont = document.createTextNode(answer);

  answerEl.classList.add("answer-area");
  answerEl.classList.add("answer-hidden");

  answerEl.appendChild(textCont);

  return answerEl;
}

//Erstellt ein Button-Element, das die Antwort ein- bzw. ausblendet.
function toggleAnswer() {
  const answerBtn = document.createElement("button");
  const textCont = document.createTextNode("Antwort einblenden");

  answerBtn.classList.add("btnShowAnswer");

  answerBtn.appendChild(textCont);

  answerBtn.addEventListener("click", switchAnswer);

  return answerBtn;
}

//Erstellt ein List-Element, und platziert ein Stichwort hinein.
function getTag(tag) {
  const listEl = document.createElement("ul");
  listEl.setAttribute("class", "category__items");

  const listItem = document.createElement("li");
  const textCont = document.createTextNode(tag);

  listItem.appendChild(textCont);
  listEl.appendChild(listItem);

  return listEl;
}

//Erstellt List-Elemente, aus Leerzeichen-separierten Stichworten.
function getTags(tags) {
  const tagsArray = tags.split(" ");

  const listEl = document.createElement("ul");
  listEl.setAttribute("class", "category__items");

  for (let i = 0; i < tagsArray.length; i++) {
    if (tagsArray[i] === "") {
      continue;
    }

    const listItem = document.createElement("li");
    const textCont = document.createTextNode(tagsArray[i]);

    listItem.appendChild(textCont);
    listEl.appendChild(listItem);
  }

  return listEl;
}

//Erstellt ein Image-Element zu einem Datei-Pfad und einer Alt-Angabe,
//und erlaubt eine Style-Änderung per Click-Event.
function getBookmarkImage(srcPath, altText) {
  const image = document.createElement("img");

  image.setAttribute("src", srcPath);
  image.setAttribute("alt", altText);
  image.setAttribute("class", "bookmark bookmark-disable");

  image.addEventListener("click", switchBookmark);

  return image;
}

/*-----------------------------------------------------------------------------mk--
| Character-Amount Limitation
|----------------------------------------------------------------------------------
| Zeigt die Anzahl eingetippter und die Maximalzahl eintippbarer Zeichen an.
*/
const textFields = document.querySelectorAll('[data-js="text-area"]'); //console.log(textFields)

textFields.forEach((textField) => {
  textField.addEventListener("input", limitCharacterAmount);
});

function limitCharacterAmount(event) {
  const charAmount = event.target.value.length;

  event.target.nextElementSibling.textContent = `
        You typed ${charAmount} of 30 allowed characters.
    `;
}

/*-----------------------------------------------------------------------------mk--
| Lightness-Mode
|----------------------------------------------------------------------------------
| - Wechselt das Helligkeits-Theme zischen Dunkel und Hell
| - Seitenübergreifend unter Verwendung des Local Storage.
*/
const bodyEl = document.body;
const btnDarkWhite = document.querySelector("#dark-white");

setLightness();
changeLightness();

//Setzt das Hell-Dunkel-Theme aller Seiten
function setLightness() {
  const lightMode = localStorage.getItem("light-mode");
  const checkMode = localStorage.getItem("check-mode");

  if (lightMode === "true") {
    bodyEl.classList.add("light-mode");
  } else {
    bodyEl.classList.remove("light-mode");
  }

  if (btnDarkWhite) {
    btnDarkWhite.checked = checkMode === "true" ? true : false;
  }
}

//Ändert das Hell-Dunkel-Theme (auf der Profile-Seite)
//Diese Seite hat den Button btnDarkWhite!
function changeLightness() {
  if (btnDarkWhite) {
    btnDarkWhite.addEventListener("change", switchMode);
  }
}

function switchMode() {
  if (btnDarkWhite.checked) {
    bodyEl.classList.add("light-mode");

    localStorage.setItem("light-mode", true);
    localStorage.setItem("check-mode", true);
  } else {
    bodyEl.classList.remove("light-mode");

    localStorage.setItem("light-mode", false);
    localStorage.setItem("check-mode", false);
  }
}
