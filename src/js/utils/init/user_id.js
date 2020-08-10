import store from "store";

let user_id;
if (localStorage.getItem('user') === null || undefined) {
    console.warn('No User iD Defined');
    user_id = null;
    //window.location.href='/login'

//    throw new Error('No User ID Defined');
} else {
    user_id = store.get('user').userid
}
export {user_id};

