window.addEventListener('DOMContentLoaded', () => {
    console.log('data from parser.js');
    const body = document.querySelector('body');
    let textNodes = [];
    
    function recursy (element) {
        element.childNodes.forEach(node => {
            if(node.nodeName.match(/^H\d/)) {  //тег начался с Н, любая цифра 
                const obj = {
                    header: node.nodeName,
                    content: node.textContent
                };
                textNodes.push(node.textContent);
            } else {
                recursy(node);
            }
        });
    }

    recursy(body);

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(textNodes)
    })
    .then(response => response.json())
    .then(json => console.log(json));
});