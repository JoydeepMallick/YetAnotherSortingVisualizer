
(function(){
  const container = $('#bars');
  function generateArray(n = 40){
    const arr = Array.from({ length: n }, () => Math.floor(Math.random()*90)+10);
    renderArray(arr);
    return arr;
  }
  function renderArray(arr){
    if(!container) return;
    container.innerHTML = '';
    container.style.setProperty('--n', arr.length);
    container.style.setProperty('--n-gap', arr.length - 1);
    const max = Math.max(...arr);
    window.arrUI = window.arrUI || {};
    window.arrUI.maxValue = max;
    arr.forEach(v => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.dataset.val = v;
      const pct = Math.max(4, Math.round((v/max)*100)); // keep visible
      bar.style.height = pct + '%';
      container.appendChild(bar);
    });
  }
  // expose both grouped and direct APIs
  window.arrUI = { generateArray, renderArray };
  window.generateArray = generateArray;
})();
