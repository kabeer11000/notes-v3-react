import {asyncLocalStorage} from '../../asyncLocalStorage';
async function getDraft(){
    if (await asyncLocalStorage.getItem('draft') !== null){
        return await asyncLocalStorage.getItem('draft');
    }else {
        return false;
    }
}
async function saveDraft(d){
    await asyncLocalStorage.setItem('draft', JSON.stringify(d));
    return true;
}
export {saveDraft, getDraft};
