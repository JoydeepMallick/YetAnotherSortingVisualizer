window.sleep = (ms) => new Promise(res => setTimeout(res, ms));
window.$ = (sel) => document.querySelector(sel);
window.$$ = (sel) => document.querySelectorAll(sel);
window.setText = (sel, text) => { const el = $(sel); if (el) el.textContent = String(text); };
