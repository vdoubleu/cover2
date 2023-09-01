import { useState, useEffect } from 'react';
import PageManager from './components/pages/PageManager';

function App() {
    // @ts-ignore
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallPromotionVisible, setIsInstallPromotionVisible] = useState(false);

    useEffect(() => {
        const displayMode = getPWADisplayMode();
        console.log(displayMode);

        if (displayMode === 'browser') {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                // Stash the event so it can be triggered later.
                setDeferredPrompt(e);
                // Update UI notify the user they can install the PWA
                setIsInstallPromotionVisible(true);
                // Optionally, send analytics event that PWA install promo was shown.
                console.log(`'beforeinstallprompt' event was fired.`);
            });
        }
    }, []);

    function getPWADisplayMode() {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (document.referrer.startsWith('android-app://')) {
        return 'twa';
        // @ts-ignore
      } else if (navigator.standalone || isStandalone) {
        return 'standalone';
      }
      return 'browser';
    }

    if (isInstallPromotionVisible) {
        return (
            <div> install promotion </div>
        );
    }
                


    return (
        <>
            <PageManager />
        </>
    );
}

export default App
