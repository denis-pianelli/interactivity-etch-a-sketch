const divContainer = document.querySelector('.div-container');
const newGridBtn = document.querySelector('#new-grid-btn');
const colorPicker = document.querySelector('#color-picker');
const randomColorBtn = document.querySelector('#random-color-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const downloadBtn = document.querySelector('#download-btn');
const MAX_CONTAINER_SIZE = 560;
const MAX_GRID_SIZE = 100;
const DEFAULT_COLOR ='#000000';

let currentColor = DEFAULT_COLOR;
let gridSize = 16;
let mouseDown = false;
let isRandomBtnClicked = true;
let isEraserBtnClicked = true;
let mode = 'color-picker';

function setCurrentColor(newColor) {
        currentColor = newColor;
}

colorPicker.addEventListener('input', (e) => {
    setCurrentColor(e.target.value);
})

colorPicker.addEventListener('input', () => {
    mode = 'color-picker';
    randomColorBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    divContainer.classList.remove('eraser');
    isEraserBtnClicked = true;
    isRandomBtnClicked = true;
});

randomColorBtn.addEventListener('click', () => {
    randomColorBtn.classList.toggle('active');
    eraserBtn.classList.remove('active');
    divContainer.classList.remove('eraser');
    isEraserBtnClicked = true;
    if (isRandomBtnClicked) {
        mode = 'random-color';
        isRandomBtnClicked = false;
    } else {
        mode = 'color-picker';
        isRandomBtnClicked = true;
    }
});

eraserBtn.addEventListener('click', () => {
    if (isEraserBtnClicked) {
        mode = 'eraser';
        eraserBtn.classList.add('active');
        divContainer.classList.add('eraser');
        isEraserBtnClicked = false;
    } else {
        if (randomColorBtn.classList.contains('active')) {
            mode = 'random-color';
            eraserBtn.classList.remove('active');
            divContainer.classList.remove('eraser');
            isEraserBtnClicked = true;
        } else {
            mode = 'color-picker';
            eraserBtn.classList.remove('active');
            divContainer.classList.remove('eraser');
            isEraserBtnClicked = true;
        }
    }
});

downloadBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = MAX_CONTAINER_SIZE;
    canvas.height = MAX_CONTAINER_SIZE;
    const ctx = canvas.getContext('2d');
  
    const container = document.querySelector('.div-container');
    const containerRect = container.getBoundingClientRect();
  
    const squareDivs = document.querySelectorAll('.squareDiv');
    squareDivs.forEach((squareDiv) => {
      const color = squareDiv.getAttribute('data-color') || 'white';
      ctx.fillStyle = color;
      const x = squareDiv.offsetLeft - containerRect.left;
      const y = squareDiv.offsetTop - containerRect.top;
      const w = squareDiv.offsetWidth;
      const h = squareDiv.offsetHeight;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);
      ctx.fillRect(x, y, w, h);
    });
  
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grid.png';
    link.click();
  });
  
  

  

divContainer.addEventListener('mousedown', () => {
    mouseDown = true;
});

divContainer.addEventListener('mouseup', () => {
    mouseDown = false;
});

function createGrid(gridSize) {
    const squareSize = MAX_CONTAINER_SIZE / gridSize;

    divContainer.style.width = `${MAX_CONTAINER_SIZE}px`;
    divContainer.style.height = `${MAX_CONTAINER_SIZE}px`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('squareDiv');
        squareDiv.style.width = `${squareSize}px`;
        squareDiv.style.height = `${squareSize}px`;

        squareDiv.addEventListener('mousedown', () => {
            if (mode === 'color-picker') {
                squareDiv.style.backgroundColor = currentColor;
                squareDiv.dataset.color = currentColor;
            } else if (mode === 'random-color') {
                const x = Math.floor(Math.random() * 256);
                const y = Math.floor(Math.random() * 256);
                const z = Math.floor(Math.random() * 256);
                const color = `rgb(${x}, ${y}, ${z})`;
                squareDiv.style.backgroundColor = color;
                squareDiv.dataset.color = color;
            } else if (mode === 'eraser') {
                squareDiv.style.backgroundColor = 'white';
                squareDiv.dataset.color = 'white';
            }
        });

        squareDiv.addEventListener('mouseover', () => {
            if (mouseDown) {
                if (mode === 'color-picker') {
                    squareDiv.style.backgroundColor = currentColor;
                    squareDiv.dataset.color = currentColor;
                } else if (mode === 'random-color') {
                    const x = Math.floor(Math.random() * 256);
                    const y = Math.floor(Math.random() * 256);
                    const z = Math.floor(Math.random() * 256);
                    const color = `rgb(${x}, ${y}, ${z})`;
                    squareDiv.style.backgroundColor = color;
                    squareDiv.dataset.color = color;
                } else if (mode === 'eraser') {
                    squareDiv.style.backgroundColor = 'white';
                    squareDiv.dataset.color = 'white';
                }
            }
        });

        divContainer.appendChild(squareDiv);
    }
}

createGrid(gridSize);

newGridBtn.addEventListener('click', () => {
    const newGridSize = gridValue.textContent;

    while (divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild);
    }

    gridSize = newGridSize;
    createGrid(gridSize);
});

const gridValue = document.getElementById('grid-value');
const gridRange = document.getElementById('grid-range');

function updateGridValue(value) {
    gridValue.textContent = value;
}

gridRange.addEventListener('input', (e) => {
    updateGridValue(e.target.value);
});

