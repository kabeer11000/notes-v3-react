import del_save_list from "../del_save_list";
//import sync_now from '../../main/save-notes';
import saveToDeviceFromServer from "../local/saveToDeviceFromServer";
import ping from "../ping";
import getFromServer from "../server/get-from-server";

let user_id = '123456';
const saveToServer = async () => {
    function escapeH_S(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/\\/g, "&#92;")
            .replace(/'/g, "&#039;");
    }

    let ajaxSave = async (data) => {
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
        await fetch("https://hosted-kabeersnetwork.000webhostapp.com/notes/server/alternate/savetoserver.php", options)
            .then(() => {
                console.log('Saved to Server');
            })
    };
    let key = undefined,
        i = 0;
    await getFromServer(user_id).then(async (save_arr) => {
        for (i = localStorage.length - 1; i >= 0; i--) {
            key = await localStorage.key(i);
            if (key.substring(0, 5) === 'note-') {
                const main = await JSON.parse(await localStorage.getItem(await localStorage.key(i)));
                let data = {
                    date: key.replace('note-', ''),
                    user_id: user_id,
                    content: main.content,
                    uniqid: main.uniqid,
                };
                let index = save_arr.findIndex(m => m.uniqid === data.uniqid);
                if (index <= -1) {
                    if (!await ping()) {
                        let save_arr = await JSON.parse(await localStorage.getItem('save-list')),
                            index = save_arr.findIndex(m => m.uniqid === data.uniqid);
                        if (index !== -1) {
                            save_arr.push({
                                date: data.date,
                                user_id: data.user_id,
                                content: data.content,
                                uniqid: data.uniqid,
                            });
                        }
                        await localStorage.setItem('save-list', JSON.stringify(save_arr));
                    } else {
                        await ajaxSave(data);
                    }//Else Statement
                }
            }
        }
    });
};

const setUserID = async () => {
//    null == localStorage.getItem("user") ? localStorage.setItem('user', JSON.stringify({user_id: '123456'})) : (()=>{});
};
export default function init(callback = () => {
}) {
    del_save_list().then(() => {
        saveToServer().then(() => {
            saveToDeviceFromServer()
        });
    });
}
