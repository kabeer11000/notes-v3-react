import del_save_list from "../del_save_list";
import sync_now from '../../main/save-notes';

const setUserID = async () => {
    null == localStorage.getItem("user") ? window.location.href = '/login' : (user_id = JSON.parse(localStorage.getItem("user")).user_id);
};
export default function init(callback = ()=>{}) {
    sync_now(false).then(() => {
        del_save_list().then(() => {
            setUserID().then(()=>{
                callback();
            });
        });
    });
}
