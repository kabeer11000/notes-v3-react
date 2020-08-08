import {asyncLocalStorage} from "../../asyncLocalStorage";

export default async function saveSmartComposeSettings(id) {
    let checkBox = document.getElementById(id);
    if (checkBox.checked) {
        await asyncLocalStorage.setItem('smartcompose', JSON.stringify('true'))
    } else {
        await asyncLocalStorage.setItem('smartcompose', JSON.stringify('false'))
    }
}
