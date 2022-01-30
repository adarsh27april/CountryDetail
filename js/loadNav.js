fetch('../components/nav.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_navbar");
        let newelem = document.createElement("header");
        newelem.innerHTML = text;
        // let newelem = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })

/**
 * this js code adds nav.html inside index.html
 */
