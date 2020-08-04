const getNotesFromLocalStorage = () => {
    let key = undefined, notes = [];
    for (let i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.substring(0, 5) === 'note-') {
            notes.push({
                date: key.replace('note-', ''),
                content: JSON.parse(localStorage.getItem(localStorage.key(i))).content,
                uniqid: JSON.parse(localStorage.getItem(localStorage.key(i))).uniqid
            });
        }
    }
    return notes;
};
export default getNotesFromLocalStorage;
