import { useState, useEffect } from "react";

import BackButton from "../../basic/BackButton";
import DoneButton from "../../basic/DoneButton";
import SimpleInput from "../../basic/SimpleInput";
import type { CoverageState } from "../PageManager";
import logoText from "/assets/Logo-name.svg";
import "../common/common.css";
import "./Start.css";

export type StartProps = {
    coverageState: CoverageState,
    setCoverageState: (coverageState: CoverageState) => void,
    goToPage: (page: string) => void,
}

function Start(props: StartProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [coverageBuddy, setCoverageBuddy] = useState("");

    useEffect(() => {
        if (props.coverageState.metadata?.coverageBuddy) {
            setCoverageBuddy(props.coverageState.metadata.coverageBuddy);
        }

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const disableStart = coverageBuddy === "";

    const buttonOnClick = () => {
        const coverageInfo = {
            "coverageBuddy": coverageBuddy,
            "startTime": currentTime.getTime(),
        };
        props.setCoverageState({"metadata": coverageInfo});
        props.goToPage("floor-10-West-no");
    }

    const handleBack = () => {
        props.goToPage("home");
    }

    return (
        <div className="page">
            <div className="page-header">
                <BackButton onClick={handleBack} />
            </div>

            <div className="page-title">
                <img src={logoText} alt="Logo" className="logo" />
            </div>

            <div className="page-subtitle"> 
                <h2 className="page-subtitle-text"> Start your coverage? </h2>
                <h3> Let's get this party started!! 🎉🎉 </h3>
            </div>

            <div className="start-input">
                <SimpleInput labelText="Who is doing coverage with you?" name="coverageBuddy" onChange={(e) => setCoverageBuddy(e.target.value)} value={coverageBuddy} />
            </div>

            <div className="start-time-wrapper">
                <h2 className="start-time">
                    Current time: {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </h2>
            </div>

            <div className="start-button">
                <DoneButton 
                    text="Start"
                    onClick={buttonOnClick}
                    disabled={disableStart}
                />
            </div>
        </div>
    );
}

export default Start;
