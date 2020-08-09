//import fetch from "./fetchWithTimeout";

let ping = async () => {
    let status = false;
    if (navigator.onLine) {
        await fetch("https://cdn.jsdelivr.net/gh/kabeer11000/notes/ping.txt").then((v) => {
            if (v.ok) {
                status = true;
            }
        });
    }
    return status;
};/*
async function ping() {
    return navigator.onLine;
}*/
export default ping;


/*
import fetch from "./fetchWithTimeout";

let ping = async () => {
    let status = false;
    if (navigator.onLine) {
        await fetch("https://cdn.jsdelivr.net/gh/kabeer11000/notes/ping.txt", {}, 5000).then((v) => {
            if (v.ok) {
                status = true;
            }
        });
    }
    return status;
};
export default ping;

 */
