// Create reference instance
document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/marked.min.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/highlight.min.js'></script>");

function passage_browser(){
    this.initiate = function () {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function(code, lang) {
                const hljs = require('highlight.js');
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            },
            langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        });
        // Compile
        console.log(marked.parse('# TITLE'));
    }
}