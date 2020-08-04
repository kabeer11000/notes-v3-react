import {asyncLocalStorage} from '../asyncLocalStorage';
async function del_save_list () {
    if (await asyncLocalStorage.getItem('delete-list'), await asyncLocalStorage.getItem('save-list') == null) {
        await asyncLocalStorage.setItem('delete-list', JSON.stringify([]));
        await asyncLocalStorage.setItem('save-list', JSON.stringify([]));
    }
}
export default del_save_list;
