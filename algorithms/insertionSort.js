async function insertionSort(arr, { visualize, onStatus } = {}) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    onStatus && onStatus(`Insertion: index ${i}/${n-1}`);
    let j = i;
    while (j > 0 && arr[j-1] > arr[j]) {
      if (visualize) await visualize.compareIndices(j-1, j);
      [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
      if (visualize) await visualize.swap(j-1, j);
      j--;
    }
  }
  if (visualize) {
    for (let k = 0; k < n; k++) {
      await visualize.setActive(k, true); await sleep(5); await visualize.setActive(k, false);
    }
  }
  onStatus && onStatus('Sorted!');
  return arr;
}
