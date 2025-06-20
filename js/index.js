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
