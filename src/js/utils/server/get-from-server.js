import ping from '../ping';
import getNotesFromLocalStorage from "../local/getNotesFromLocalStorage";
let getFromServer = async (user_id) => {
    let notes = [];
    async function ajaxGetNotes () {
        await fetch("https://hosted-kabeersnetwork.000webhostapp.com/notes/server/alternate/getnotes.php?user_id=" + user_id)
            .then(res => res.json())
            .then(jqXHR => {
                let i;
                for (i = 0; i < jqXHR.length; i++) {
                    notes.push({
                        date: jqXHR[i].date,
                        content: jqXHR[i].content,
                        uniqid: jqXHR[i].uniqid,
                    })
                }
            });
        return notes.reverse();
    }
    if (!await ping()){
        return getNotesFromLocalStorage();
    }else {
        return await ajaxGetNotes();
    }
//    !await ping() ? (callback(await getNotesFromLocalStorage()), console.warn('Cannot Fetch No Connection')) : (callback(await ajaxGetNotes()));
};
export default getFromServer;
