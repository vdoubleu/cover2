import "../common/common.css";
import "./InstallPrompt.css";

function InstallPrompt() {
    return (
        <div className="page">
            <div className="installprompt-header">
                Install App
            </div>

            <div className="installprompt-body">
                Please use <a href="https://cover3.vercel.app/"> this version </a> of cover. This newer version of cover will have all the old features as well as a bunch of new ones. If you wish to continue using this version, please follow the below steps.

                <br />
                <br />

                Please Install the Cover for a better experience.

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
