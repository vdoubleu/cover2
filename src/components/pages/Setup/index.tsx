import { useEffect, useState } from "react";

import BackButton from "../../basic/BackButton";
import DoneButton from "../../basic/DoneButton";
import SimpleInput from "../../basic/SimpleInput";
import logoText from "/assets/Logo-name.svg";
import "../common/common.css";
import "./Setup.css";

export type SetupProps = {
    goToPage: (page: string) => void;
}

function Setup(props: SetupProps) {
    const [isSetup, setIsSetup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

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
                setFirstName(userInfoObj.name);
                setEmail(userInfoObj.email);
                setIsSetup(true);
            } else {
                setIsSetup(false);
            }
        } catch (e) {
            setIsSetup(false);
        }
    }, []);

    function doSetup() {
        const userInfo = {
            "name": firstName,
            "email": email
        };

        const userInfoStr = JSON.stringify(userInfo);
        localStorage.setItem("userInfo", userInfoStr);

        props.goToPage("home");
    }

    function goBack() {
        props.goToPage("home");
    }

    const isDisabled = false;

    return (
        <div className="page">
            <div className="page-header">
                <BackButton onClick={goBack} />
            </div>

            <div className="page-title">
                <img src={logoText} alt="Logo" className="page-logo" />
            </div>

            <div className="page-subtitle"> 
                <h2 className="page-subtitle-text"> Enter your information </h2>
                {
                    isSetup 
                    ? (<h3> Here you may update any of your saved values </h3>)
                    : (<h3> This is only for your first time and will be saved. You can update this later in settings. </h3>)
                }
            </div>


            <div className="setup-input">
                <SimpleInput labelText="Your first name" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </div>
            <div className="setup-input">
                <SimpleInput labelText="Your email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            <div className="setup-button">
                <DoneButton 
                    text="Done"
                    onClick={doSetup}
                    disabled={isDisabled}
                />
            </div>
        </div>
    );
}

export default Setup;

