async function mergeSort(arr, opts = {}) {
  const { visualize, onStatus } = opts;
  onStatus && onStatus('Merge sort running…');
  const n = arr.length;
  const buffer = new Array(n);
  async function merge(l, m, r){
    let i = l, j = m, k = l;
    while(i < m && j < r){
      if (visualize) await visualize.compareIndices(i, j);
      if (arr[i] <= arr[j]) buffer[k++] = arr[i++]; else buffer[k++] = arr[j++];
    }
    while(i < m) buffer[k++] = arr[i++];
    while(j < r) buffer[k++] = arr[j++];
    for(let x = l; x < r; x++) {
      arr[x] = buffer[x];
      if (visualize) {
        visualize.setActive(x, true);
        visualize.setValue(x, arr[x], 100);
        await sleep(5);
        visualize.setActive(x, false);
      }
    }
  }
  async function sort(l, r){
    if(r - l <= 1) return;
    const m = l + ((r - l) >> 1);
    await sort(l, m);
    await sort(m, r);
    await merge(l, m, r);
  }
  await sort(0, n);
  onStatus && onStatus('Sorted!');
  return arr;
}
