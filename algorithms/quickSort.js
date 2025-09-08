async function quickSort(arr, opts = {}) {
  const { visualize, onStatus } = opts;
  onStatus && onStatus('Quick sort running…');
  async function partition(lo, hi) {
    const pivot = arr[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (visualize) await visualize.compareIndices(j, hi);
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        if (visualize) await visualize.swap(i, j);
        i++;
      }
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    if (visualize) await visualize.swap(i, hi);
    return i;
  }
  async function sort(lo, hi) {
    if (lo >= hi) return;
    const p = await partition(lo, hi);
    await sort(lo, p - 1);
    await sort(p + 1, hi);
  }
  await sort(0, arr.length - 1);
  onStatus && onStatus('Sorted!');
  if (visualize) {
    for (let i = 0; i < arr.length; i++) {
      await visualize.setActive(i, true);
      await sleep(5);
      await visualize.setActive(i, false);
    }
  }
  return arr;
}
