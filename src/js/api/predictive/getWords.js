export default async function getWords() {
    let words = {};
    await fetch("https://hosted-kabeersnetwork.000webhostapp.com/experimental/ml/predictive/V2/?n=" + 200, {}, 5000)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(jqXHR => {
            words = jqXHR;
        }).catch(() => {
            console.warn('No Connection, Cannot Fetch Words')
        });
    return words;
}
