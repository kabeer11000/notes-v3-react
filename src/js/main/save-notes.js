import ping from '../utils/ping';
import {asyncLocalStorage} from '../asyncLocalStorage';
import del_save_list from "../utils/del_save_list";
import {user_id} from "../utils/init/user_id";


async function saveNote(dateTime, content, callback) {
    content.content = unescape(content.content);
    asyncLocalStorage.setItem('note-' + dateTime, JSON.stringify(content)).then(function () {
        saveToServer({
            date: dateTime,
            user_id: user_id,
            content: content.content,
            uniqid: content.uniqid,
        }, callback);
    });
}

async function saveToServer(d, callback) {
    function ajaxSave(data) {
        let formData = new FormData();
        formData.append('date', data.date);
        formData.append('user_id', data.user_id);
        formData.append('content', btoa(encodeURIComponent(data.content)));
        formData.append('uniqid', data.uniqid);

        const options = {
            method: 'POST',
            body: formData,
            headers: {}
        };
        fetch("https://hosted-kabeersnetwork.000webhostapp.com/notes/server/alternate/savetoserver.php", options)
            .then(() => {
                console.log('Saved To Server');
                callback();
            }).catch(function () {
            let save_arr = JSON.parse(localStorage.getItem('save-list'));
            let index = save_arr.filter(vendor => vendor.uniqid === d.uniqid);
            if (index > -1) {
                save_arr.push({
                    date: data.date,
                    user_id: data.user_id,
                    content: data.content,
                    uniqid: data.uniqid,
                });
            }
            asyncLocalStorage.setItem('save-list', JSON.stringify(save_arr));
        });
    }

    if (!await ping()) {
        let save_arr = await JSON.parse(await localStorage.getItem('save-list'));
        let index = save_arr.filter(vendor => vendor.uniqid === d.uniqid);
        if (index >-1) {
            save_arr.push({
                date: d.date,
                user_id: d.user_id,
                content: d.content,
                uniqid: d.uniqid,
            });
        }
        await localStorage.setItem('save-list', JSON.stringify(save_arr));
        callback();

    } else {
        await ajaxSave(d);
    }//Else Statement
}

async function sync_now(ms = true) {
    await del_save_list();
    await saveToServer(user_id);
}

export default saveNote;
export {saveNote, saveToServer, sync_now};
