/*-----------------------------------------------------------------------------mk--
| Switch Bookmark
|----------------------------------------------------------------------------------
| 
*/
const btnBookmarks = document.querySelectorAll('.bookmark');

btnBookmarks.forEach(btn => btn.addEventListener('click', switchBookmark));

function switchBookmark(e) {
    if (e.target.classList.contains('bookmark-disable')) {
        e.target.classList.remove('bookmark-disable');
        e.target.classList.add('bookmark-enable');
    }else {
        e.target.classList.remove('bookmark-enable');
        e.target.classList.add('bookmark-disable');
    }
}

/*-----------------------------------------------------------------------------mk--
| Switch Answer
|----------------------------------------------------------------------------------
| 
*/
const btnShowAnswer = document.querySelectorAll('.btnShowAnswer');
const answerArea = document.querySelector('.answer-area');

btnShowAnswer.forEach(btn => btn.addEventListener('click', switchAnswer));

function switchAnswer(e) {
    if (e.target.previousElementSibling.classList.contains('answer-hidden')) {
        e.target.previousElementSibling.classList.remove('answer-hidden');
        e.target.previousElementSibling.classList.add('answer-visible');
        e.target.textContent = "Antwort ausblenden";
    }
    else {
        e.target.previousElementSibling.classList.remove('answer-visible');
        e.target.previousElementSibling.classList.add('answer-hidden');
        e.target.textContent = "Antwort einblenden";
    }
}

/*-----------------------------------------------------------------------------mk--
| Create New Cards
|----------------------------------------------------------------------------------
| 
*/
const createCardForm = document.querySelector('form');
const pseudoCard = document.querySelector('[data-js="pseudo-quiz-card"]');

if (createCardForm) {
    createCardForm.addEventListener('submit', createCard);
}

function createCard(event) { 
    event.preventDefault(); //console.log('ok');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData); //console.log(data);

    const questionCard = document.createElement('section');
    questionCard.setAttribute('class', "question-card");

    questionCard.appendChild(createQuestion(data.question));
    questionCard.appendChild(createAnswer(data.answer));
    questionCard.appendChild(showAnswer());
    questionCard.appendChild(createTag(data.tags));
    questionCard.appendChild(createBookmarkLabel("./assets/bookmark.svg", "Bookmark-Tag"));

    pseudoCard.appendChild(questionCard);
}

//---------------------------------------------------------------------

function createQuestion(question) {
    const headerEl = document.createElement('header');
    const textCont = document.createTextNode(question);

    headerEl.setAttribute('class', "question-card__question");

    headerEl.appendChild(textCont);

    return headerEl;
}

function createAnswer(answer) {
    const answerEl = document.createElement('div');
    const textCont = document.createTextNode(answer);

    answerEl.classList.add("answer-area");
    answerEl.classList.add("answer-visible"); //später: answer-hidden

    answerEl.appendChild(textCont);

    return answerEl;
}

function showAnswer() {
    const answerBtn = document.createElement('button');
    const textCont = document.createTextNode('Zeige mir die Antwort');

    answerBtn.setAttribute('class', "btnShowAnswer");

    answerBtn.appendChild(textCont);

    return answerBtn;
}

function createTag(tag) {
    const listEl = document.createElement('ul');
    listEl.setAttribute('class', "category__items")

    const listItem = document.createElement('li');
    const textCont = document.createTextNode(tag); 

    listItem.appendChild(textCont);    
    listEl.appendChild(listItem);

    return listEl;
}

function createBookmarkLabel(srcPath, altText) {
    const labelImg = document.createElement('img');

    labelImg.setAttribute('src', srcPath);
    labelImg.setAttribute('alt', altText);
    labelImg.setAttribute('class', 'bookmark bookmark-disable');

    return labelImg;
}

