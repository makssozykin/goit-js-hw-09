function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    btns: document.querySelectorAll('button'),
    body: document.querySelector('body'),
};

let timerId = null;

refs.start.addEventListener('click', startBtn);

function startBtn() { 
    const changeColor = new Promise(res => { 
        timerId = setInterval(() => {
            refs.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    });
    refs.start.setAttribute("disabled", "");
    refs.stop.removeAttribute("disabled");
}



refs.stop.addEventListener('click', stopBtn);

function stopBtn() { 
    clearInterval(timerId);
    refs.start.removeAttribute("disabled");
    refs.stop.setAttribute("disabled","");
}
