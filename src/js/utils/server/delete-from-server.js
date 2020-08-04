import ping from '../ping';
import {asyncLocalStorage} from "../../asyncLocalStorage";

function deleteNote(dateTime, user_id, note_id) {
    asyncLocalStorage.removeItem('note-' + dateTime).then(() => {
        deleteFromServer(dateTime, user_id, note_id);
    });
}

async function deleteFromServer(datetime, user_id, note_id) {
    if (!await ping()) {
        let del_arr = JSON.parse(localStorage.getItem('delete-list'));
        del_arr.push({
            note_id: note_id,
            date: datetime
        });
        await asyncLocalStorage.setItem('delete-list', JSON.stringify(del_arr));
    }
    let ajaxDelete = async (data) => {
        await fetch(`https://hosted-kabeersnetwork.000webhostapp.com/notes/server/alternate/delete.php?user_id=${data.user_id}&uniqid=${data.uniqid}`)
            .then(() => {
                console.log('Deleted Note From The Server');
            });
    };
    if (await ping()) {
        await ajaxDelete({
            user_id: user_id,
            uniqid: note_id
        });
    } else {
        console.warn('Cannot Delete No Connection!')
    }
//    $('.' + note_id).remove();
//    Snackbar({message: "Deleted!"});
}
export {deleteFromServer, deleteNote};
