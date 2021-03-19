'use strict'

const body = document.querySelector('body'),
    color = document.getElementById('color'),
    btnChange = document.getElementById('change');
let num16 = localStorage.getItem('color');

const render = () => {
    
    color.textContent = num16;
    body.style.backgroundColor = num16;
    btnChange.style.color = num16;

    btnChange.addEventListener('click', () => {
        let num = '#';
        for (let i = 0; i < 3; i++) {
            let num10 = Math.floor(Math.random() * 256),
                partNum16 = num10.toString(16);
            console.log(num10, partNum16);
            num += partNum16;
        }
        num16 = num;
        render();
    })
}
render();
    
window.addEventListener('unload', () =>{
    localStorage.setItem('color', num16);
})
