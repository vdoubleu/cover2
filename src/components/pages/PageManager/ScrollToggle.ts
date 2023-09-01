function preventDefault(e) {
  e.preventDefault();
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;

export function disableScroll() {
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile

}

export function enableScroll() {
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
}
