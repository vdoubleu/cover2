function preventDefault(e: Event) {
  e.preventDefault();
}

var supportsPassive = false;
try {
    // @ts-ignore
    window.addEventListener(
        "test", 
        null, 
        Object.defineProperty({}, 'passive', {
            get: function () { supportsPassive = true; } 
        }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;

export function disableScroll() {
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile

}

export function enableScroll() {
    // @ts-ignore
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
}
