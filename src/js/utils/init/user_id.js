import store from "store";

let user_id;
if (store.get('user') === null || undefined) {
    console.warn('No User iD Defined');
    user_id = '';
    //    throw new Error('No User ID Defined');
} else {
    user_id = store.get('user').userid
}
export {user_id};

