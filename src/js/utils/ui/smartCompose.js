"use strict";
import Fuse from "fuse.js";

async function smartCompose(data, callback, element) {
    let getLastWord = (words) => {
            var n = words.split(/[\s,]+/);
            return n[n.length - 1];
        },
        ReplaceLastWord = (str, newStr) => {
            return str.replace(/\w*$/, newStr);
        };
    const options1 = {
        composer: (text, callback_) => {
            const fuse_options = {
                includeScore: true,
            };
            const fuse = new Fuse(data, fuse_options);
            let p = fuse.search(getLastWord(text));
            try {
                callback_(ReplaceLastWord(getLastWord(text), p[0].item));
            } catch (e) {
            }
        },
        onChange: (text) => {
            callback(ReplaceLastWord(element.value.slice(0, -text.acceptedSuggestion.length), text.acceptedSuggestion));
        },

    };
    smartCompose = new AutoComposeTextarea(options1, element);
    smartCompose.addInputs(element);
    element.addEventListener('onblur', async () => {
        smartCompose.destroy();
    });
}

export {smartCompose}
