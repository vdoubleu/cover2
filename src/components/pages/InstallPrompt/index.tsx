import "../common/common.css";
import "./InstallPrompt.css";

function InstallPrompt() {
    return (
        <div className="page">
            <div className="installprompt-header">
                Install App
            </div>

            <div className="installprompt-body">
                Please Install the App for a better experience.

                <br />
                <br />

                If you are on ios, please use the share button at the bottom of the screen and select "Add to Home Screen"

                <br />
                <br />

                If you are on android, please use the menu button and select "Add to Home Screen"
            </div>
        </div>
    );
}

export default InstallPrompt;
