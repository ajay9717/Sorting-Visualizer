const arrayContainer = document.getElementById('array-container');
let array = [];

function generateArray() {
    arrayContainer.innerHTML = '';
    array = [];
    for (let i = 0; i < 50; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const arrayBar = document.createElement('div');
        arrayBar.classList.add('array-bar');
        arrayBar.style.height = `${value}%`;
        arrayContainer.appendChild(arrayBar);
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            if (array[j] > array[j + 1]) {
                await swap(bars, j, j + 1);
            }
            bars[j].style.backgroundColor = '#007bff';
            bars[j + 1].style.backgroundColor = '#007bff';
        }
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = 'red';
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'red';
            if (array[j] < array[minIdx]) {
                bars[minIdx].style.backgroundColor = '#007bff';
                minIdx = j;
                bars[minIdx].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = '#007bff';
            }
        }
        await swap(bars, i, minIdx);
        bars[minIdx].style.backgroundColor = '#007bff';
        bars[i].style.backgroundColor = 'green';
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            bars[j + 1].style.height = `${array[j]}%`;
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}%`;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) {
        return;
    }
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.getElementsByClassName('array-bar');
    let n1 = mid - start + 1;
    let n2 = end - mid;

    let left = new Array(n1);
    let right = new Array(n2);

    for (let i = 0; i < n1; i++) {
        left[i] = array[start + i];
        bars[start + i].style.backgroundColor = 'red';
    }
    for (let j = 0; j < n2; j++) {
        right[j] = array[mid + 1 + j];
        bars[mid + 1 + j].style.backgroundColor = 'red';
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    let i = 0, j = 0, k = start;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            bars[k].style.height = `${left[i]}%`;
            i++;
        } else {
            array[k] = right[j];
            bars[k].style.height = `${right[j]}%`;
            j++;
        }
        bars[k].style.backgroundColor = 'green';
        k++;
    }

    while (i < n1) {
        array[k] = left[i];
        bars[k].style.height = `${left[i]}%`;
        bars[k].style.backgroundColor = 'green';
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = right[j];
        bars[k].style.height = `${right[j]}%`;
        bars[k].style.backgroundColor = 'green';
        j++;
        k++;
    }
}

async function quickSort(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.getElementsByClassName('array-bar');
    let pivot = array[high];
    bars[high].style.backgroundColor = 'red';
    let i = (low - 1);

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'yellow';
        if (array[j] < pivot) {
            i++;
            await swap(bars, i, j);
            bars[i].style.backgroundColor = '#007bff';
        }
        bars[j].style.backgroundColor = '#007bff';
    }
    await swap(bars, i + 1, high);
    bars[high].style.backgroundColor = '#007bff';
    return (i + 1);
}

function swap(bars, i, j) {
    return new Promise((resolve) => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        bars[i].style.height = `${array[i]}%`;
        bars[j].style.height = `${array[j]}%`;
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

generateArray();
