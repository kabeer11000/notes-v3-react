import getWords from "../../../js/api/predictive/getWords";

let WordsStore_ = {};
getWords().then((value => WordsStore_ = value));

export const WordsList = {
  get getWordsList() {
    return this.wordsList ? this.wordsList : {};
  },
  set setWordsList(newWords) {
    if (!this.wordsList) {
      this.wordsList = {};
    }
    this.wordsList = {
      ...this.wordsList,
      ...WordsStore_,
      ...newWords,
    };
  }
};
