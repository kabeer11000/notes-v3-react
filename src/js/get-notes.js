import ping from './ping';
import axios from "axios";
function getNotes(user_id='123456'){
     async function getNotesFromLocalStorage(){
         let escapeHTML_GET;
         escapeHTML_GET = (text) => {
             const map = {
                 '<': '&lt;',
                 '>': '&gt;',
             };
             return text.replace(/[<>]/g, function (m) {
                 return map[m];
             });
         };
        let key = undefined, notes = [];
        for (let i = localStorage.length - 1; i >= 0; i--) {
            key = localStorage.key(i);
            if (key.substring(0, 5) === 'note-') {
                notes.push({
                    date: key.replace('note-', ''),
                    content: JSON.parse(escapeHTML_GET(localStorage.getItem(localStorage.key(i)))).content,
                    uniqid: JSON.parse(escapeHTML_GET(localStorage.getItem(localStorage.key(i)))).uniqid
                });
            }
        }
        return notes;
    }
     async function ajaxGetNotes () {
        let notes = [];
        let jqXHR = await axios.get('https://json.extendsclass.com/bin/41dc382e7c38');
        jqXHR = jqXHR.data;
             let i;
             for (i = 0; i < jqXHR.length; i++) {
                 notes.push({
                     date: jqXHR[i].date,
                     content: jqXHR[i].content,
                     uniqid: jqXHR[i].uniqid,
                 })
             }

        return notes.reverse();
    }
    if (navigator.onLine) {
        return ajaxGetNotes();
    } else {
        return getNotesFromLocalStorage();
    }
}
export default getNotes;

