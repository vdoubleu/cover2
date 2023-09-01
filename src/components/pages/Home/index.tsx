import { useEffect, useState } from "react";

import DoneButton from "../../basic/DoneButton";
import type { CoverageState } from "../PageManager";
import logo from "/assets/Logo.svg";
import settingsIcon from "/assets/settings-icon.png";
import "./Home.css";
import "../common/common.css";

export type HomeProps = {
    goToPage: (page: string) => void;
    setCoverageState: (coverageState: CoverageState) => void;
}

function Home(props: HomeProps) {
    const [isSetup, setIsSetup] = useState(false);

    useEffect(() => {
        // check local storage
        const userInfo = localStorage.getItem("userInfo");

        if (!userInfo) {
            setIsSetup(false);
            return;
        }

        try {
            const userInfoObj: { name: string; email: string; } = JSON.parse(userInfo);
            if (userInfoObj.name && userInfoObj.email) {
                setIsSetup(true);
            } else {
                setIsSetup(false);
            }
        } catch (e) {
            setIsSetup(false);
        }
    }, []);

    const buttonText = isSetup ? "Start" : "Setup";

    function buttonOnClick() {
        if (isSetup) {
            props.setCoverageState({});
            props.goToPage("start");
        } else {
            props.goToPage("setup");
        }
    }

    const goToSettings = () => {
        props.goToPage("setup");
    }

    const settingsButton = isSetup ? ( <img src={settingsIcon} className="home-settings" alt="settings" onClick={goToSettings} /> ) : null;

    return (
        <div className="page">
            <div className="home-upper-decor">
                {settingsButton}
                <img src={logo} className="home-logo" alt="logo" />
            </div>

            <h1 className="home-title"> Cover </h1>

            <div className="home-button">
                <DoneButton 
                    text={buttonText}
                    onClick={buttonOnClick}
                    disabled={false}
                />
            </div>
        </div>
    );
}

export default Home;
