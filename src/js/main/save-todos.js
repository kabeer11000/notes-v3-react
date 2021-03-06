import {asyncLocalStorage} from '../asyncLocalStorage';
import uniqid from "../utils/uniqid";
import {user_id} from '../utils/init/user_id';


async function saveTodo(d, callback = ()=>{}) {
    function check_if_null(a) {
        if (a !== undefined || null || '') {
            return a;
        } else {
            return '';
        }
    }

    let date_n = new Date().getTime();
    console.log('-------------------');
    console.log(unescape(check_if_null(d.label)));
    asyncLocalStorage.setItem('todo-' + date_n,
        JSON.stringify({
            date: date_n,
            user_id: user_id,
            body: unescape(check_if_null(d.body)),
            title: unescape(check_if_null(d.title)),
            label: unescape(check_if_null(d.label)),
            uniqid: uniqid(),
        })).then(function () {
        callback();
    });
}

export default saveTodo;
