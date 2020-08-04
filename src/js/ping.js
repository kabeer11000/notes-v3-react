/*let ping = async () => {
    let status = false;
    if (navigator.onLine) {
        let res = await $.ajax({
            url: "https://cdn.jsdelivr.net/gh/kabeer11000/notes/ping.txt",
            async: true,
        });
        res != null || undefined ? status = true : "";
    }
    return status;
};*/

async function ping() {
    return navigator.onLine;
}
export default ping;
