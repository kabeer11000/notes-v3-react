import ping from '../utils/ping';
import {asyncLocalStorage} from '../asyncLocalStorage';
import del_save_list from "../utils/del_save_list";
import getFromServer from "../utils/server/get-from-server";
import axios from 'axios';
import $ from 'jquery';
let user_id = '123456';

async function saveNote(dateTime, content, callback) {
content.content  = unescape(content.content);
    asyncLocalStorage.setItem('note-' + dateTime, JSON.stringify(content)).then(function () {
        saveToServer({
            date: dateTime,
            user_id: user_id,
            content: content.content,
            uniqid: content.uniqid,
        }, callback);
        //        ping() ? sync_now(false) : sync_now();
    });
}

async function saveToServer(d, callback) {
/*    function escapeH_S(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/\\/g, "&#92;")
            .replace(/'/g, "&#039;");
    }
*/

    function ajaxSave(data) {
        let formData = new FormData();
        formData.append('date', data.date);
        formData.append('user_id', data.user_id);
        formData.append('content', btoa(encodeURIComponent(data.content)));
        formData.append('uniqid', data.uniqid);

                const options = {
                    method: 'POST',
                    body: formData,
                    headers: {
                    }
                };
        fetch("https://hosted-kabeersnetwork.000webhostapp.com/notes/server/alternate/savetoserver.php", options).then(()=>{
            console.log('Saved To Server');
            callback()
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
    if (await ping()) {
        if (ms) {
            //Snackbar({message: 'Synced!'});
//            await getFromServer(user_id, saveToDeviceFromServerHelper);
        } else {
        }
    } else {
        if (ms) {
            //Snackbar({message: "Sync Failed, No Connection!", actiontext: "Retry"}, () => {
            //  sync_now();
            //});
        } else {
        }
    }
    await saveToServer('123456');
}

export default saveNote;
export {saveNote, saveToServer, sync_now};
