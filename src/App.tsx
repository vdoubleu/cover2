import PageManager from './components/pages/PageManager';

function App() {
function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if (navigator.standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

const displayMode = getPWADisplayMode();
alert(displayMode);

    return (
        <>
            <PageManager />
        </>
    );
}

export default App
