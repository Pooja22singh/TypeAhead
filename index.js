import { suggestionsList } from "./countries.js";
import { Trie } from "./trie.js";

const userInput = document.getElementById("userInput");
const suggestionUL = document.querySelector(".suggestions");
const suggestionsCount = 5;

const init = () => {
    let userText = "";
    let suggestionFocus = null;
    const trie = new Trie();
    suggestionsList.forEach((suggestion)=>{
        trie.addWord(suggestion);
    })
    userInput.addEventListener("input", (event) =>{
        let prefix = event.target.value;
        suggestionUL.innerHTML = '';
        suggestionFocus = null;
        userText = userInput.value.toLowerCase();
        const suggestions = prefix && trie.fetchWordsWithPrefix(prefix, suggestionsCount) || [];
        if(suggestions.length){
            for(let i=0; i<suggestions.length; i++){
                let li = document.createElement("li");
                li.textContent=suggestions[i];
                suggestionUL.append(li);
            }
        }

    })
    document.addEventListener("click", (event) =>{
        if(event.target.tagName.toLowerCase() == "li"){
            userText = event.target.textContent;
            userInput.value = event.target.textContent;
            resetSuggestions();
        }
        setTimeout(resetSuggestions, 100);
    })
    function resetSuggestions() {
        suggestionUL.innerHTML = '';
        suggestionFocus = null;
        userInput.value = userText;
    }
}

init();



































// import { suggestionsList } from "./countries.js";
// import { Trie } from "./trie.js";

// const suggestionsCount = 5;

// const userInput = document.getElementById('userInput');
// const suggestionsEl = document.querySelector('.suggestions');

// const init = () => {
//     // const trie = new Trie(suggestionsList);
//     const trie = new Trie();
//     suggestionsList?.forEach((suggestion) => {
//         trie.addWord(suggestion);
//     });
//     let suggestionFocus = null;
//     let userText = '';
//     userInput.addEventListener('input', () => {
//         suggestionsEl.innerHTML = '';
//         suggestionFocus = null;
//         userText = userInput.value.toLowerCase();
    
//         const result = userText ? trie.fetchWordsWithPrefix(userText, suggestionsCount) : [];
//         for (let i = 0; i < result.length; i++) {
//             const li = document.createElement('li');
//             li.textContent = result[i] ?? '';
//             suggestionsEl.appendChild(li);
//         }
//     });

//     userInput.addEventListener('keydown', (event) => {
//         console.log("event", event.key, suggestionFocus);
//         if (event.key === 'Enter' && suggestionFocus != null) {
//             console.log("here");
//             userText = suggestionsEl.childNodes[suggestionFocus].textContent;
//             resetSuggestions();
//             return;
//         }

//         if (event.key === 'ArrowDown') {
//             suggestionFocus = suggestionFocus ?? -1;
//             console.log("suggestion", suggestionFocus);
//             if (suggestionFocus + 1 >= suggestionsEl.childElementCount) {
//                 removeHighlightedSuggestion();
//                 return;
//             }

//             highlightSuggestion(++suggestionFocus);
//         }

//         if (event.key === 'ArrowUp') {
//             event.preventDefault(); // prevents cursor moving to start of input field
//             suggestionFocus = suggestionFocus ?? suggestionsEl.childElementCount;
//             if (suggestionFocus - 1 < 0) {
//                 removeHighlightedSuggestion();
//                 return;
//             }

//             highlightSuggestion(--suggestionFocus);
//         }
//     });

//     document.addEventListener('click', (event) => {
//         const element = event.target;
//         if (element.tagName.toLowerCase() === 'li') {
//             userText = element.textContent;
//             userInput.value = element.textContent;
//             resetSuggestions();
//         }
//         else
//         setTimeout(resetSuggestions, 100);
//     });

//     function highlightSuggestion(index) {
//         suggestionsEl.querySelector('.highlight')?.classList.remove('highlight');
//         suggestionsEl.childNodes[index].classList.add('highlight');
//         userInput.value = suggestionsEl.childNodes[index].textContent;
//     }
    
//     function removeHighlightedSuggestion() {
//         suggestionsEl.querySelector('.highlight')?.classList.remove('highlight');
//         userInput.value = userText;
//         suggestionFocus = null;
//     }
    
//     function resetSuggestions() {
//         suggestionsEl.innerHTML = '';
//         suggestionFocus = null;
//         userInput.value = userText;
//     }
// }
// init();
