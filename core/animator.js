
(function(){
  const state = { speed: 80 };
  const getBars = () => $$('#bars .bar');
  function setSpeed(ms){ state.speed = Math.max(0, Number(ms)||0); }
  async function swap(i, j){
    const bars = getBars();
    if(!bars[i] || !bars[j]) return;
  const hi = bars[i].style.height, hj = bars[j].style.height;
  const vi = bars[i].dataset.val, vj = bars[j].dataset.val;
  bars[i].style.height = hj; bars[j].style.height = hi;
  bars[i].dataset.val = vj; bars[j].dataset.val = vi;
    await sleep(state.speed);
  }
  async function setActive(i, on = true){
    const bars = getBars();
    if (!bars[i]) return;
    bars[i].classList.toggle('active', on);
    await sleep(state.speed/4);
  }
  async function compareIndices(i, j){
    const bars = getBars();
    if (bars[i]) bars[i].classList.add('compare');
    if (bars[j]) bars[j].classList.add('compare');
    await sleep(state.speed/2);
    if (bars[i]) bars[i].classList.remove('compare');
    if (bars[j]) bars[j].classList.remove('compare');
  }
  function setValue(i, value, maxValue){
    const bars = getBars();
    if(!bars[i]) return;
    const maxV = maxValue || 100;
    const pct = Math.max(4, Math.round((value / maxV) * 100));
    bars[i].style.height = pct + '%';
  }
  window.visualize = { swap, setActive, compareIndices, setSpeed, setValue };
})();
