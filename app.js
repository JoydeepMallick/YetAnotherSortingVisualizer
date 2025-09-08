(function(){
  function qs(id){ return document.getElementById(id); }
  function init(){
    const btnNew  = qs('btn-new');
    const btnSort = qs('btn-sort');
    const sizeInp = qs('size');
    const speedInp= qs('speed');
  const algoSel = qs('algorithm');
  const state = { arr: [], running: false };

    function setStatus(msg){ setText('#status', msg); }
    function setControls(disabled){
      [btnNew, btnSort, sizeInp, speedInp].forEach(el => el && (el.disabled = disabled));
    }
    function regen(){
      const n = Number(sizeInp.value) || 40;
      setText('#sizeVal', n);
      state.arr = generateArray(n);
      setStatus('Generated new array');
    }
    function applySpeed(){
      const ms = Number(speedInp.value) || 80;
      setText('#speedVal', ms);
      visualize.setSpeed(ms);
    }
    async function runSort(){
      if (state.running) return;
      state.running = true; setControls(true); setStatus('Sorting…');
  const copy = state.arr; // operate directly on displayed data order
      const choice = algoSel ? algoSel.value : 'bubble';
      const map = {
        bubble: bubbleSort,
        selection: selectionSort,
        insertion: insertionSort,
        merge:    mergeSort,
        quick:    quickSort
      };
      const fn = map[choice] || bubbleSort;
      await fn(copy, { visualize, onStatus: setStatus });
      state.running = false; setControls(false); setStatus('Done.');
    }
    btnNew && btnNew.addEventListener('click', regen);
    sizeInp && sizeInp.addEventListener('input', regen);
    speedInp && speedInp.addEventListener('input', applySpeed);
  btnSort && btnSort.addEventListener('click', runSort);
    regen(); applySpeed();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
