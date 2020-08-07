import ping from "../ping";

async function getPredictiveText(callback = () => {
}, limit = 4000) {
    let offline = async () => {
        return [];
    };
    const ajaxGetWords = async () => {
        let words = [];
        await fetch("https://hosted-kabeersnetwork.000webhostapp.com/notes/server/alternate/alternate/predictive/getArray.php?n=" + limit)
            .then(res => res.json())
            .then(res => {
                words = res;
            });
        return words;
    };
//    !await ping() ? (await callback(await offline()), console.warn('Cannot Fetch No Connection')) : (await callback(await ajaxGetWords()));
    if (!await ping()) {
        return await offline();
    } else {
        return await ajaxGetWords();
    }
}

export default getPredictiveText;
