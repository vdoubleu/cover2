import { useEffect, useState } from "react";

import DoneButton from "../../basic/DoneButton";
import type { CoverageState } from "../PageManager";
import logo from "/assets/Logo.svg";
import settingsIcon from "/assets/settings-icon.png";

import Modal from 'react-modal';

import "./Home.css";
import "../common/common.css";

export type HomeProps = {
    goToPage: (page: string) => void;
    setCoverageState: (coverageState: CoverageState) => void;
}

function Home(props: HomeProps) {
    const [isSetup, setIsSetup] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);

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
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Try New Version"
          >
            <div className="version-modal-exit" onClick={() => setModalIsOpen(false)}>X</div>

            <div className="version-modal-text">
              There is a new version of cover out! Try it out here: <a href="https://cover3.vercel.app/" target="_blank"> Cover V3</a>

              <br />
              <br />

              This new version has all the same features as this current version, and more!!

              <br />

              You now have access to sessions! You and others can join a session and easily track all data in one spot. No more copy pasting! There is also now possible support for more building layouts. 

              <br />
              <br />

              Email me at <a href="mailto:victorwang2001@gmail.com">victorwang2001@gmail.com</a> if you have any questions, complaints or requests.

              <br />
              <br />

              Thanks again for using cover!
            </div>
          </Modal>
          
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
