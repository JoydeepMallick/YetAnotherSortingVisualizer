async function bubbleSort(arr, { visualize, onStatus } = {}) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    onStatus && onStatus(`Pass ${i+1}/${n-1}`);
    for (let j = 0; j < n - i - 1; j++) {
      if (visualize) await visualize.compareIndices(j, j+1);
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        if (visualize) await visualize.swap(j, j+1);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  onStatus && onStatus('Sorted!');
  // final highlight
  if (visualize) {
    for (let i = 0; i < n; i++) {
      await visualize.setActive(i, true);
      await sleep(10);
      await visualize.setActive(i, false);
    }
  }
  return arr;
}
