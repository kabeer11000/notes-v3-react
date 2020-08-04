import {asyncLocalStorage} from '../asyncLocalStorage';
import uniqid from "../utils/uniqid";

let user_id = '123456';

async function saveTodo(d, callback = ()=>{}) {
    function check_if_null(a){
        if (a !== undefined || null || ''){
            return a;
        }else {
            return '';
        }
    }
    let date_n = new Date().getTime();
    asyncLocalStorage.setItem('todo-' + date_n,
     JSON.stringify({
        date: date_n,
        user_id: user_id,
        body: unescape(check_if_null(d.body)),
        title: unescape(check_if_null(d.title)),
        label: d.label,
        uniqid: uniqid(),
    })).then(function () {
        callback();
    });
}

export default saveTodo;
