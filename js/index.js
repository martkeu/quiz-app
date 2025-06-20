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