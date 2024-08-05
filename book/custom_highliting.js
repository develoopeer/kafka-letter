//default values
var options = {
    highlite: false,
    color: "rgb(235, 229, 52)",
    bold: false
}

// Docsify plugin functions
function plugin(hook, vm) {
    if (!options.highlite) {
        return
    }
    hook.afterEach(function (content) {
        new_ = "<div id='highlite'>" + content + "</div>"
        return new_
    })
    hook.doneEach(function(){
        document.getElementById('highlite').onmouseup = function(){
            let textRange = window.getSelection().getRangeAt(0);
            var selectionContents = textRange.extractContents();
            if (selectionContents.textContent.length >=1){
                // console.log(localStorage.getItem('ranges'))
                let span = document.createElement("span");
                span.appendChild(selectionContents);
                span.id = 'highlitedText'
                span.style.backgroundColor = "#B4FFEB";
                textRange.insertNode(span);
            }
            window.getSelection().removeAllRanges();

        }

    })
}

// Docsify plugin options
window.$docsify["highliteSettings"] = Object.assign(
    options,
    window.$docsify["highliteSettings"]
)
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins)