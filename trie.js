function Node() {
    this.children = {};
    this.isWordEnd = false;
}
export const Trie = function () {
    this.root = new Node();
    this.addWord = function (word) {
        word = word.toLowerCase();
        let curr = this.root;
        let charToInsert;
        for (let i = 0; i < word.length; i++) {
            charToInsert = word[i];
            if (!(charToInsert in curr.children))
                curr.children[charToInsert] = new Node();
            curr = curr.children[charToInsert]
        }
        curr.isWordEnd = true;
    }
    this.fetchWordsWithPrefix = function (prefix, suggestionsCount) {
        prefix = prefix.toLowerCase();
        let curr = this.root;
        let char;
        for (let i = 0; i < prefix.length; i++) {
            char = prefix[i];
            if (!(char in curr.children)) {
                return [];
            }
            curr = curr.children[char]
        }
        const stack = [{ node: curr, prefix }];
        const words = [];
        while (stack.length > 0 && words.length < suggestionsCount) {
            const { node, prefix } = stack.pop();
            if (node.isWordEnd)
                words.push(prefix);
            for (let char in node.children) {
                stack.push({ node: node.children[char], prefix: prefix + char })
            }
        }
        return words;
    }
    this.contains = function (word) {
        word = word.toLowerCase();
        let curr = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(char in curr.children))
                return false;
            curr = curr.children[char];
        }
        return curr.isWordEnd;
    }
    this.startsWith = function (prefix) {
        prefix = prefix.toLowerCase();
        let curr = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (!(char in curr.children))
                return false;
            curr = curr.children[char];
        }
        return true;

    }
    this.delete = function (word) {
        word = word.toLowerCase();
        const deleteHelper = (node, index) => {
            if (index == word.length) {
                if (!node.isWordEnd) return false;
                if (Object.keys(node.children).length)
                    node.isWordEnd = false;
                return Object.keys(node.children).length == 0;
            }
            const char = word[index];
            if (!(char in node.children))
                return false;// word does not exist
            const shouldDeleteNode = deleteHelper(node.children[char], index + 1);
            if (shouldDeleteNode) {
                delete node.children[char];
                return Object.keys(node.children).length == 0;
            }
            return false;
        }
        deleteHelper(this.root, 0);
    }
}
