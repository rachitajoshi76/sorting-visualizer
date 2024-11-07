let array = [];
let delay = 100;
const arrayContainer = document.querySelector('.array-container');
const arraySizeInput = document.getElementById('arr_sz');
const speedInput = document.getElementById('speed_input');

arraySizeInput.addEventListener('input', createBars);
speedInput.addEventListener('input', () => {
    delay = 101 - speedInput.value;
});

document.getElementById('newArray').addEventListener('click', createBars);
document.getElementById('bubbleSort').addEventListener('click', bubbleSort);
document.getElementById('selectionSort').addEventListener('click', selectionSort);
document.getElementById('insertionSort').addEventListener('click', insertionSort);
document.getElementById('quickSort').addEventListener('click', quickSort);
document.getElementById('mergeSort').addEventListener('click', mergeSort);

function createBars() {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < arraySizeInput.value; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    array.forEach(height => {
        const bar = document.createElement('div');
        bar.style.height = `${height}%`;
        bar.classList.add('array-bar');
        arrayContainer.appendChild(bar);
    });
}

function swap(el1, el2) {
    const tempHeight = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;
}

async function bubbleSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.background = 'red';
            bars[j + 1].style.background = 'red';
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                swap(bars[j], bars[j + 1]);
            }
            bars[j].style.background = '#4caf50';
            bars[j + 1].style.background = '#4caf50';
        }
        bars[bars.length - 1 - i].style.background = 'green';
    }
    bars[0].style.background = 'green';
}

// Implement other sorting functions (selectionSort, insertionSort, quickSort, mergeSort) similarly
async function selectionSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < bars.length; i++) {
        let minIndex = i;
        bars[minIndex].style.background = 'red';
        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.background = 'yellow';
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                bars[minIndex].style.background = '#4caf50';
                minIndex = j;
                bars[minIndex].style.background = 'red';
            } else {
                bars[j].style.background = '#4caf50';
            }
        }
        swap(bars[i], bars[minIndex]);
        bars[minIndex].style.background = '#4caf50';
        bars[i].style.background = 'green';
    }
}
async function insertionSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 1; i < bars.length; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;

        bars[i].style.background = 'red';
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j].style.background = 'red';
            bars[j + 1].style.height = bars[j].style.height;
            j--;

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            for (let k = i; k >= 0; k--) {
                bars[k].style.background = 'green';
            }
        }
        bars[j + 1].style.height = `${key}%`;
        bars[i].style.background = 'green';
    }
}
async function mergeSort(bars, left, right) {
    if (left >= right) {
        return;
    }
    const middle = Math.floor((left + right) / 2);
    await mergeSort(bars, left, middle);
    await mergeSort(bars, middle + 1, right);
    await merge(bars, left, middle, right);
}

async function merge(bars, left, middle, right) {
    const leftArray = [];
    const rightArray = [];
    
    for (let i = left; i <= middle; i++) {
        leftArray.push(parseInt(bars[i].style.height));
    }
    for (let i = middle + 1; i <= right; i++) {
        rightArray.push(parseInt(bars[i].style.height));
    }
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArray.length && j < rightArray.length) {
        bars[k].style.background = 'red';

        if (leftArray[i] <= rightArray[j]) {
            bars[k].style.height = `${leftArray[i]}%`;
            i++;
        } else {
            bars[k].style.height = `${rightArray[j]}%`;
            j++;
        }

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        bars[k].style.background = 'green';
        k++;
    }

    while (i < leftArray.length) {
        bars[k].style.background = 'red';
        bars[k].style.height = `${leftArray[i]}%`;

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        bars[k].style.background = 'green';
        i++;
        k++;
    }

    while (j < rightArray.length) {
        bars[k].style.background = 'red';
        bars[k].style.height = `${rightArray[j]}%`;

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        bars[k].style.background = 'green';
        j++;
        k++;
    }
}

document.getElementById('mergeSort').addEventListener('click', async () => {
    const bars = document.querySelectorAll('.array-bar');
    await mergeSort(bars, 0, bars.length - 1);
});
