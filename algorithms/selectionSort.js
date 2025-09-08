async function selectionSort(arr, { visualize, onStatus } = {}) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    onStatus && onStatus(`Selection: position ${i+1}/${n-1}`);
    for (let j = i + 1; j < n; j++) {
      if (visualize) await visualize.compareIndices(min, j);
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      if (visualize) await visualize.swap(i, min);
    }
  }
  onStatus && onStatus('Sorted!');
  return arr;
}
