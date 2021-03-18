'use strict'

const body = document.querySelector('body'),
    color = document.getElementById('color'),
    btnChange = document.getElementById('change');
let num16 = localStorage.getItem('color');

const render = () => {
    color.textContent = num16;
    body.style.backgroundColor = num16;
    btnChange.style.color = num16;
} 
render();

btnChange.addEventListener('click', () =>{
    num16 = '#';
    const changeInto16 = (n) => {
        if (n > 9) {
            switch (n) {
                case 10:
                    n = 'a';
                break;
                case 11:
                    n = 'b';
                break;
                case 12:
                    n = 'c';
                break;
                case 13:
                    n = 'd';
                break;
                case 14:
                    n = 'e';
                break;
                case 15:
                    n = 'f';
                break;
            }
        }
        return String(n);
    }

    for (let i =0; i < 3; i++){
        let num10 = Math.floor(Math.random() * 256),
            firstPart16 = Math.trunc(num10 / 16),
            secondPart16 = num10 % 16,
            allParts16 = changeInto16(firstPart16) + changeInto16(secondPart16);
            num16 += allParts16;
    }
    render();
    
})
    
window.addEventListener('unload', () =>{
    localStorage.setItem('color', num16);
})
