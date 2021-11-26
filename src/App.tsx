import { resolve } from 'path';
import React, { useState } from 'react';
import './App.css';

const numCols = 30;
const delayMultiplier = 50;
let promiseArray: any = [];
let arrayHolder: any = [];
let delay = 0;

const generateRandomArray = () => {
  const array = [];
  for (let i = 0; i < numCols; i++) {
    array.push(Math.floor(Math.random() * 501));
  }
  return array;
}

const generateEmptyArray = () => {
  const array = [];
  for (let i = 0; i < numCols; i++) {
    array.push(0);
  }
  return array;
}


const App = () => {

  const [array, setArray] = useState(generateRandomArray());

  const selectionSort = (array: any) => {
    let newArray = array.slice();
    for (let i = 0; i < newArray.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < newArray.length; j++) {
        promiseArray.push(animateColor(i, j));
        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
      }

      newArray = swap(newArray, i, minIndex);
      arrayHolder.push(newArray.slice());
      promiseArray.push(animateSwap(newArray, i, minIndex));
    }
    promiseArray.push(endAnimation());
    Promise.all(promiseArray).then(() => { promiseArray = []; delay = 0; });
  }

  const bubbleSort = (array: any) => {
    let newArray = array.slice();
    let sorted = false;
    for (let i = 0; i < newArray.length; i++) {
      sorted = true;
      for (let j = 0; j < newArray.length - 1; j++) {
        promiseArray.push(animateColor(j, j + 1));
        if (newArray[j] > newArray[j + 1]) {
          newArray = swap(newArray, j, j + 1);
          arrayHolder.push(newArray.slice());
          promiseArray.push(animateSwap(newArray, j, j + 1));
          sorted = false;
        }
      }
      if (sorted) {
        break;
      }
    }
    promiseArray.push(endAnimation());
    Promise.all(promiseArray).then(() => { promiseArray = []; delay = 0; });
  }

  const insertionSort = (array: any) => {
    let newArray = array.slice();
    for (let i = 1; i < newArray.length; i++) {
      let j = i;
      while (j > 0 && newArray[j] < newArray[j - 1]) {
        promiseArray.push(animateColor(j, j - 1));
        newArray = swap(newArray, j, j - 1);
        arrayHolder.push(newArray.slice());
        promiseArray.push(animateSwap(newArray, j, j - 1));
        j--;
      }
    }
    promiseArray.push(endAnimation());
    Promise.all(promiseArray).then(() => { promiseArray = []; delay = 0; });
  }

  const mergeSort = (array: any) => {
    let newArray = array.slice();
    mergeSortHelper(newArray, 0, newArray.length - 1);
    promiseArray.push(endAnimation());
    Promise.all(promiseArray).then(() => { promiseArray = []; delay = 0; });
  }

  const mergeSortHelper = (array: any, start: number, end: number) => {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      mergeSortHelper(array, start, mid);
      mergeSortHelper(array, mid + 1, end);
      merge(array, start, mid, end);
    }
  }

  const merge = (array: any, start: number, mid: number, end: number) => {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0;
    let j = 0;
    let k = start;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }
      k++;
      if (k < numCols) promiseArray.push(animateColor(k-1, k));
      arrayHolder.push(array.slice());
      promiseArray.push(animateMerge());
    }
    while (i < left.length) {
      array[k] = left[i];
      i++;
      k++;
      if (k < numCols) promiseArray.push(animateColor(k-1, k));
      arrayHolder.push(array.slice());
      promiseArray.push(animateMerge());
    }
    while (j < right.length) {
      array[k] = right[j];
      j++;
      k++;
      if (k < numCols) promiseArray.push(animateColor(k-1, k));
      arrayHolder.push(array.slice());
      promiseArray.push(animateMerge());
    }
  }

  const animateMerge = () => {
    delay += delayMultiplier;
    return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
      setArray(arrayHolder[0]);
      arrayHolder.splice(0, 1);
    })
  }

  const quickSort = (array: any) => {
    let newArray = array.slice();
    quickSortHelper(newArray, 0, newArray.length - 1);
    promiseArray.push(endAnimation());
    Promise.all(promiseArray).then(() => { promiseArray = []; delay = 0; });
  }

  const quickSortHelper = (array: any, start: number, end: number) => {
    if (start < end) {
      let pivot = partition(array, start, end);
      quickSortHelper(array, start, pivot - 1);
      quickSortHelper(array, pivot + 1, end);
    }
  }

  const partition = (array: any, start: number, end: number) => {
    let pivot = array[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
      if (array[j] <= pivot) {
        i++;
        array = swap(array, i, j);
        animateThreeColors(i, j, end);
        arrayHolder.push(array.slice());
        promiseArray.push(animateSwap(array, i, j));
      }
    }
    array = swap(array, i + 1, end);
    animateColor(i + 1, end);
    arrayHolder.push(array.slice());
    promiseArray.push(animateSwap(array, i + 1, end));
    return i + 1;
  }

  const swap = (array: number[], i: number, j: number) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
  }

  const heapSort = (array: any) => {
    let newArray = array.slice();
    heapSortHelper(newArray);
    promiseArray.push(endAnimation());
    Promise.all(promiseArray).then(() => { promiseArray = []; delay = 0; });
  }

  const heapSortHelper = (array: any) => {
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
      heapify(array, i, array.length);
    }
    for (let i = array.length - 1; i >= 0; i--) {
      array = swap(array, 0, i);
      arrayHolder.push(array.slice());
      promiseArray.push(animateSwap(array, 0, i));
      heapify(array, 0, i);
    }
  }

  const heapify = (array: any, i: number, n: number) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
    if (largest !== i) {
      array = swap(array, i, largest);
      animateColor(i, largest);
      arrayHolder.push(array.slice());
      promiseArray.push(animateSwap(array, i, largest));
      heapify(array, largest, n);
    }
  }

  const animateThreeColors = (i: number, j: number, k: number) => {
    delay += delayMultiplier;
    return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
      const arrayBarStyle = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>)
      for (const h of arrayBarStyle) {
        h.style.backgroundColor = 'cyan';
      }
      const bar1 = arrayBarStyle[i];
      bar1.style.backgroundColor = 'lime';
      const bar2 = arrayBarStyle[j];
      bar2.style.backgroundColor = 'lime';
      const bar3 = arrayBarStyle[k];
      bar3.style.backgroundColor = 'darkgreen';
    })
  }

  const animateColor = (i: number, j: number) => {
    delay += delayMultiplier;
    return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
      const arrayBarStyle = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>)
      for (const h of arrayBarStyle) {
        h.style.backgroundColor = 'cyan';
      }
      const bar1 = arrayBarStyle[i];
      bar1.style.backgroundColor = 'lime';
      const bar2 = arrayBarStyle[j];
      bar2.style.backgroundColor = 'lime';
    })
  }

  const animateSwap = (newArray: number[], i: number, j: number) => {
    delay += delayMultiplier;
    return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
      const arrayBarStyle = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>)
      const bar1 = arrayBarStyle[i];
      const bar2 = arrayBarStyle[j];
      bar1.style.backgroundColor = 'red';
      bar2.style.backgroundColor = 'red';
      setArray(arrayHolder[0]);
      arrayHolder.splice(0, 1);
      resolve();
    })
  }

  const endAnimation = () => {
    delay += delayMultiplier;
    return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
      const arrayBarStyle = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>)
      for (const i of arrayBarStyle) {
        i.style.backgroundColor = 'cyan';
      }
    })
  }

  return (
    <>
      <button onClick={() => setArray(generateEmptyArray())}>
        Clear
      </button>
      <button onClick={() => setArray(generateRandomArray())}>
        Random
      </button>
      <button onClick={() => selectionSort(array)}>
        Selection Sort
      </button>
      <button onClick={() => bubbleSort(array)}>
        Bubble Sort
      </button>
      <button onClick={() => insertionSort(array)}>
        Insertion Sort
      </button>
      <button onClick={() => mergeSort(array)}>
        Merge Sort
      </button>
      <button onClick={() => quickSort(array)}>
        Quick Sort
      </button>
      <button onClick={() => heapSort(array)}>
        Heap Sort
      </button>
      <div className="App">
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className='array-bar'
              key={index}
              style={{
                position: 'relative',
                top: `${510 - value}px`,
                width: `${88 / numCols}%`,
                height: `${value}px`,
              }}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
