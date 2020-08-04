import ping from "../ping";
import getFromServer from "../server/get-from-server";
import getNotesFromLocalStorage from "./getNotesFromLocalStorage";
import {asyncLocalStorage} from "../../asyncLocalStorage";


async function saveNote(dateTime, content, callback = () => {
}) {
    content.content = unescape(content.content);
    asyncLocalStorage.setItem('note-' + dateTime, JSON.stringify(content)).then(function () {
        callback()
    });
}

function saveToDeviceBack(server, local, callback = () => {
}) {
    function arr_diff(a1, a2) {
        return a1.filter(x => !a2.includes(x));
    }

    let items = arr_diff(server, local);
    if (items.length > -1) {
        for (let i = items.length - 1; i >= 0; i--) {

            let save_arr = local,
                index = save_arr.filter(m => m.uniqid === items[i].uniqid);
            if (index > -1) {
                let noteContentJSON = {
                    content: items[i].content,
                    uniqid: items[i].uniqid
                };
                saveNote(items[i].date, noteContentJSON, () => {
                    console.log('Saved To Device');
                    callback();
                });
            }
        }
    }
}

async function saveToDeviceFromServer() {
    if (await ping()) {
        let ser = undefined, loc = undefined;
        getFromServer('123456').then((value => {
            ser = value;
        })).then(() => {
            loc = getNotesFromLocalStorage();
        }).then(() => {
            saveToDeviceBack(ser, loc);
        });
    }
}

export default saveToDeviceFromServer;
