function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

let timerId = null;

refs.start.addEventListener('click', startBtn);

function startBtn() { 
    const changeColor = new Promise(res => { 
    timerId = setInterval(() => { 
       refs.body.style.backgroundColor = getRandomHexColor(); 
    }, 500)
    });
    refs.start.setAttribute("disabled","");
}



refs.stop.addEventListener('click', stopBtn);

function stopBtn() { 
    clearInterval(timerId);
    refs.body.style.backgroundColor = '';
}
