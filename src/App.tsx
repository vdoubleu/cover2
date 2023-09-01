import { useState, useEffect } from 'react';
import PageManager from './components/pages/PageManager';
import InstallPrompt from './components/pages/InstallPrompt';

function App() {
    const [isInstallPromotionVisible, setIsInstallPromotionVisible] = useState(false);

    useEffect(() => {
        const displayMode = getPWADisplayMode();

        if (displayMode === 'browser' && !import.meta.env.VITE_REACT_APP_DEV) {
            setIsInstallPromotionVisible(true);
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
            <>
                <InstallPrompt />
            </>
        );
    }
                


    return (
        <>
            <PageManager />
        </>
    );
}

export default App
