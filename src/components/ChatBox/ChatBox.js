import React from 'react';
import ReactDOM from 'react-dom';
import './Chatbox.css';
import {WordsList} from './dictionaries/words';

const MAX_NUMBER_OF_LETTERS_CHECKED = 4;
const MIN_CHAR_DIFFERENCE_BETWEEN_WORD_AND_ABBR = 1;

const setCursor = (wordLength) => {
  try {
    const el = document.getElementById("note-textarea");
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.childNodes[0], wordLength);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  } catch (e) {
    console.log(e);
  }
};

class ChatBox extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      matchedTerm: '',
      matchedWord: false,
      html: '',
      words: WordsList.getWordsList,
      chars: 0,
    };

    this.chatBox = React.createRef();
  }

  componentDidMount() {
    ['keydown', 'keyup'].forEach(evt => {
      this.chatBox.current.addEventListener(evt, this.updateMessage, false);
    });
  }

  checkIfLastWordMatchesExistingWords(word) {
    const wordMatchesCases = {
      2: () => this.state.words[word.slice(0, 2)] ? {word: this.state.words[word.slice(0, 2)], char: 2} : {},
      3: () => this.state.words[word.slice(0, 3)] ? {word: this.state.words[word.slice(0, 3)], char: 3} : {},
      4: () => this.state.words[word.slice(0, 4)] ? {word: this.state.words[word.slice(0, 4)], char: 4} : {},
      default: {}
    };
    return word && wordMatchesCases[word.length] ? wordMatchesCases[word.length]() : wordMatchesCases.default
  }

  updateMessage = (e) => {
    this.autoCompleteWord(e);
    if (e.which === 32 && e.type === 'keydown') {
      this.learnNewWords();
    }
  };

  triggerSuggestions = (e, text, char) => {
    const textBeforeUpdate = e.target.innerText;
    const autocompletion = this.state.words[text].slice(char, this.state.words[text].length);
//    document.getElementById('note-textarea').innerHTML = `<h3>${e.target.innerText.split('<br>')[0]}</h3>`;
    this.setState({
      matchedTerm: autocompletion,
      matchedWord: true,
      html: `${e.target.innerText}<span class="autocompletion-text">${autocompletion}</span>`
    });
    const newCursor = textBeforeUpdate.length;
    setCursor(newCursor);
  };

  autoCompleteWord = (e) => {
    if (e.which === 8) {
      if (this.state.html) {
        this.props.callback(this.state)
      }
      return;
    }

    if (!Object.keys(this.state.words).length) {
      return;
    }

    if (e.which === 39 && this.state.matchedWord) {
      this.setState({
        html: e.target.innerText,
        matchedWord: false,
      });

      ReactDOM.findDOMNode(this.chatBox.current).focus();
      const updatedCursor = e.target.innerText.length;
      setCursor(updatedCursor);
      e.preventDefault();
    }


    if (e.which !== 13 && this.state.matchedWord) {
      this.setState({
        html: e.target.innerText.slice(0, -this.state.matchedTerm.length),
        matchedTerm: '',
        matchedWord: false
      });
      if (this.state.html) {
        this.props.callback(this.state)
      }

      setCursor(this.state.html.length);
    }

    const inputtedText = e.target.innerText;
    const inputtedArr = inputtedText.split(' ');
    const lastWord = inputtedArr[inputtedArr.length - 1];
    const wordIfMatched = lastWord ? this.checkIfLastWordMatchesExistingWords(lastWord) : {};

    if (wordIfMatched.word) {
      const noAutocompletionText = inputtedText.split(' ');
      const matchText = noAutocompletionText[noAutocompletionText.length - 1].substring(0, wordIfMatched.char);
      this.triggerSuggestions(e, matchText, wordIfMatched.char);
    }
  };

  learnNewWords = () => {
    const fullText = this.chatBox.current.innerText;
    const validText = fullText.split(' ').filter((word) => {
      if (word.length >= MAX_NUMBER_OF_LETTERS_CHECKED) {
        return word;
      }
    });

    if (!validText.length) {
      return;
    }

    const existingWordsList = WordsList.getWordsList;
    let tempWordsList = {};
    let smartCompose_settings = undefined;

    /*    const setSmartCompose = () => {
          null == localStorage.getItem("smartcompose") ? localStorage.setItem("smartcompose", JSON.stringify("true")) : (smartCompose_settings = JSON.parse(localStorage.getItem("smartcompose")));
        };
        if (setSmartCompose()){
          tempWordsList = {"thr":"threat","wid":"wide","coo":"cookie","pop":"population","hab":"habit","res":"researcher","loc":"local","ite":"item","sim":"similar","not":"notion","aut":"author","eva":"evaluation","woo":"wooden","dra":"dramatic","lac":"lack","bes":"besides","be":"bed","wri":"writer","imp":"important","sho":"should","tha":"that","exp":"express","con":"contribution","con":"consistent","sha":"shadow","sta":"statement","pro":"provision","bee":"beer","can":"cancer","imm":"immigrant","h":"he","pla":"plan","pub":"publicly","div":"divide","cro":"cross","cli":"clinical","inq":"inquiry","ele":"electricity","wea":"wealth","ins":"insist","con":"contemporary","jus":"just","fea":"fear","org":"organic","bea":"beach","est":"estimate","cra":"craft","occ":"occur","inv":"investigation","en":"end","emo":"emotional","bla":"blanket","lun":"lunch","civ":"civil","clo":"closely","lau":"launch","net":"network","fla":"flavor","dis":"discipline","che":"chemical","hon":"honor","dra":"drag","who":"whom","wag":"wage","fel":"fellow","con":"congress","mac":"machine","sho":"shock","pol":"politically","ca":"can","bel":"belief","mag":"magazine","sta":"status","ide":"identify","rec":"recent","tim":"time","tea":"tear","hi":"his","cit":"citizen","jai":"jail","kee":"keep","ton":"tonight","whe":"whenever","fin":"finding","rei":"reinforce","ar":"art","hop":"hope","exi":"existence","wh":"why","beh":"behind","mar":"married","mor":"morning","lin":"link","uni":"universal","sel":"self","thi":"this","alo":"alone","emp":"employment","rea":"reaction","con":"constitutional"};
        }
    */

    //TODO Consult public/auth/words_generate.php for words Generation
    tempWordsList = {
      "thr": "threat",
      "wid": "wide",
      "coo": "cookie",
      "pop": "population",
      "hab": "habit",
      "res": "researcher",
      "loc": "local",
      "ite": "item",
      "sim": "similar",
      "not": "notion",
      "aut": "author",
      "eva": "evaluation",
      "woo": "wooden",
      "dra": "dramatic",
      "lac": "lack",
      "bes": "besides",
      "be": "bed",
      "wri": "writer",
      "imp": "important",
      "sho": "should",
      "tha": "that",
      "exp": "express",
      "con": "contribution",
      "con": "consistent",
      "sha": "shadow",
      "sta": "statement",
      "pro": "provision",
      "bee": "beer",
      "can": "cancer",
      "imm": "immigrant",
      "h": "he",
      "pla": "plan",
      "pub": "publicly",
      "div": "divide",
      "cro": "cross",
      "cli": "clinical",
      "inq": "inquiry",
      "ele": "electricity",
      "wea": "wealth",
      "ins": "insist",
      "con": "contemporary",
      "jus": "just",
      "fea": "fear",
      "org": "organic",
      "bea": "beach",
      "est": "estimate",
      "cra": "craft",
      "occ": "occur",
      "inv": "investigation",
      "en": "end",
      "emo": "emotional",
      "bla": "blanket",
      "lun": "lunch",
      "civ": "civil",
      "clo": "closely",
      "lau": "launch",
      "net": "network",
      "fla": "flavor",
      "dis": "discipline",
      "che": "chemical",
      "hon": "honor",
      "dra": "drag",
      "who": "whom",
      "wag": "wage",
      "fel": "fellow",
      "con": "congress",
      "mac": "machine",
      "sho": "shock",
      "pol": "politically",
      "ca": "can",
      "bel": "belief",
      "mag": "magazine",
      "sta": "status",
      "ide": "identify",
      "rec": "recent",
      "tim": "time",
      "tea": "tear",
      "hi": "his",
      "cit": "citizen",
      "jai": "jail",
      "kee": "keep",
      "ton": "tonight",
      "whe": "whenever",
      "fin": "finding",
      "rei": "reinforce",
      "ar": "art",
      "hop": "hope",
      "exi": "existence",
      "wh": "why",
      "beh": "behind",
      "mar": "married",
      "mor": "morning",
      "lin": "link",
      "uni": "universal",
      "sel": "self",
      "thi": "this",
      "alo": "alone",
      "emp": "employment",
      "rea": "reaction",
      "con": "constitutional"
    };
    validText.forEach((word) => {
      const isWordAlreadyInList = (wordToCheck) => !!Object.values(WordsList.getWordsList).filter(word => word === wordToCheck).length;
      const isAbbrAlreadyInList = (abbrToCheck) => !!Object.keys(WordsList.getWordsList).filter(abbr => abbr === abbrToCheck).length;
      const twoWordSubstring = word.substring(0, 2);
      const threeWordSubstring = word.substring(0, 3);
      const fourWordSubstring = word.substring(0, 4);
      const isWordWithinMinLength = (substring) => word.length - substring.length >= MIN_CHAR_DIFFERENCE_BETWEEN_WORD_AND_ABBR;

      if (!existingWordsList[twoWordSubstring] && isWordWithinMinLength(twoWordSubstring) && !isWordAlreadyInList(word) && !isAbbrAlreadyInList(twoWordSubstring)) {
        tempWordsList[twoWordSubstring] = word;
        return;
      }

      if (!existingWordsList[threeWordSubstring] && isWordWithinMinLength(threeWordSubstring) && !isWordAlreadyInList(word) && !isAbbrAlreadyInList(threeWordSubstring)) {
        tempWordsList[threeWordSubstring] = word;
        return;
      }

      if (!existingWordsList[fourWordSubstring] && isWordWithinMinLength(fourWordSubstring) && !isWordAlreadyInList(word) && !isAbbrAlreadyInList(fourWordSubstring)) {
        tempWordsList[fourWordSubstring] = word;

      }
    });

    WordsList.setWordsList = tempWordsList;
    this.setState({
      ...this.state,
      words: WordsList.getWordsList
    });
  };
  logMic = (v) => {
    /*    let html_ = this.state.html;
        this.setState({
          html: html_+' '+v,
        });*/
    document.getElementById("note-textarea").innerHTML += v;
    console.log(v);
  };

  render() {
    const {words} = this.state;
    const wordsAbbrList = Object.keys(words);

    return (
        <smartCompose_container
            ref={this.chatBox}
            contentEditable={true}
            className="form-control textarea main-textarea char-counter box"
            id="note-textarea"
            rows="5"
            placeholder="Create a new note by typing or using voice recognition."
            onkeypress="return (this.innerHTML.length <= 1600)"
            onKeyUp={(e) => {
              if (this.state.html) this.props.callback(this.state);
              this.props.chars(e.currentTarget.innerText.length);
            }}
            onKeyDown={e => {
              if (e.currentTarget.innerText.length > 0 || !this.state.headingShown) {
                if (e.which === 13) {
                  this.props.titleSet(e.currentTarget.innerText.split('<br>')[0]);
                  this.setState({
                    headingShown: true
                  });
                }
              }

            }}
            dangerouslySetInnerHTML={{__html: this.state.html.toString()}}
            aria-label="Message"
            data-placeholder="Create a new note by typing or using voice."
        />
    )
  }
}

export default ChatBox;
/*
  render () {
    const { words } = this.state;
    const wordsAbbrList = Object.keys(words);
    return (
      <div className="row">
        <div className="col-md-3">
          {
            wordsAbbrList.length ?<div className="wordsList">
           <ul className="list-group">
            <li className="list-group-item active">Learned words&nbsp;
              <span className="badge badge-warning badge-pill"> {wordsAbbrList.length}</span>
            </li>
            {
              wordsAbbrList.map(abbr => {
                return (<li className="list-group-item" key={abbr}>{ `${abbr} - ${this.state.words[abbr]}` }</li>)
              })
            }
            </ul>
          </div>  : null
          }
        </div>
        <div className="card col-md-6">
        <h5 className="card-header">
          Google smart compose replica
        </h5>
        <div className="card-body">
        <div className="ChatBox">
            <div className="ChatBoxMessage">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Message box</span>
              </div>
              <div
                ref={this.chatBox}
                contentEditable={true}
                className="form-control box"
                id="box"
                rows="5"
                dangerouslySetInnerHTML={ { __html: this.state.html } }
                aria-label="Message"/>
            </div>
            </div>
            <br/>
          </div>
          <div>
            <ul>
              <li>
                To autocomplete an existing abbreviation from the list press ENTER.
              </li>
              <li>
                Words must have a min length of 4 characters.
              </li>
              <li>
                Words must have at least 2 characters between the abbreviation and the actual word.
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    )
  }

 */
