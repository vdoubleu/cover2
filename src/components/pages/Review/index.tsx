import { useState, useEffect } from 'react';

import BackButton from "../../basic/BackButton";
import DoneButton from "../../basic/DoneButton";
import FloorInfo from "../PageManager/FloorInfo.ts";
import type { CoverageState, CoverageFloorState } from "../PageManager";
import logoText from "/assets/Logo-name.svg";
import "../common/common.css";
import "./Review.css";

export type ReviewProps = {
    coverageState: CoverageState;
    setCoverageState: (coverageState: CoverageState) => void;
    goToPage: (pageName: string) => void;
}

function Review(props: ReviewProps) {
    const [endTime, setEndTime] = useState(new Date());

    useEffect(() => {
        const timer = setTimeout(() => {
            setEndTime(new Date());
        }, 1000);
        return () => clearTimeout(timer);
    }, [endTime]);

    const userInfo = (() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            return null;
        }

        try {
            const userInfoObj: { name: string; email: string; } = JSON.parse(userInfo);
            if (userInfoObj.name && userInfoObj.email) {
                return userInfoObj;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    })();

    const coverageInfo = (() => {
        const coverageMetadata = props.coverageState.metadata;

        if (!coverageMetadata || !coverageMetadata.coverageBuddy || !coverageMetadata.startTime) {
            return null;
        } else {
            return coverageMetadata;
        }
    })();

    const handleBack = () => {
        props.goToPage("floor-3-East-no");
    }

    const sendEmail = () => {
        if (!userInfo || !coverageInfo) {
            alert("Something went wrong. Please contact VW for help. Missing userinfo or coverageinfo");
            return;
        }

        fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                service_id: import.meta.env.VITE_REACT_APP_SERVICE_ID,
                template_id: import.meta.env.VITE_REACT_APP_TEMPLATE_ID,
                user_id: import.meta.env.VITE_REACT_APP_USER_ID,
                accessToken: import.meta.env.VITE_REACT_APP_ACCESS_TOKEN,
                template_params: {
                    "to_email": userInfo.email,
                    "message": coverageInfoFull,
                },
            }),
        }).then((response) => {
            if (response.status === 200) {
                console.log("Email sent!");
                props.setCoverageState({});
                props.goToPage("done");
            } else {
                console.log("Email failed to send.");
                alert("Email failed to send. Please contact VW for help.");
            }
        }).catch((error) => {
            console.log("Email failed to send. Error: " + error);
            alert("Email failed to send. Please contact VW for help.");
        });
    }

    const roundMinutes = (oldDate: Date) => {
        const date = new Date(oldDate);
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
        date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

        return date;
    }

    if (!userInfo || !coverageInfo) {
        return (
            <div className="page">
                <div className="page-header page-header-multi">
                    <BackButton onClick={handleBack} />
                    <img src={logoText} alt="Logo" className="page-header-logo" />
                </div>

                <div className="page-subtitle review-subtitle">
                    <h2 className="page-subtitle-text"> Review </h2>
                    <h3> Scroll through and double check everything. If it looks good, hit done at the very bottom to email yourself the info. </h3>
                </div>

                <div className="page-subtitle">
                    <h2 className="page-subtitle-text"> Something went wrong. coverageInfo: {JSON.stringify(coverageInfo)} userInfo: {JSON.stringify(userInfo)} </h2>
                </div>
            </div>
        );
    }

    const startTime = new Date(coverageInfo.startTime);
    const startTimeRounded = roundMinutes(startTime);

    const floorInfoBlocks = Object.keys(FloorInfo).map((floorNameWithoutReview) => {
        const floorInfo = FloorInfo[floorNameWithoutReview];

        const coverageDataForFloor: CoverageFloorState | undefined = props.coverageState[floorNameWithoutReview];

        if (!coverageDataForFloor) {
            return "";
        }

        const floorRooms = floorInfo.rooms.map((room: string) => (
            `${floorInfo.name} ${room}: ${coverageDataForFloor[room]}\n`
        )).reduce((prev: string, curr: string) => prev + curr, "");
        
        const notes = coverageDataForFloor["notes"] ? `${floorInfo.name} Notes:\n${coverageDataForFloor["notes"]}\n` : "";

        return `${floorRooms}${notes}\n`;
    }).reduce((prev, curr) => prev + curr, "");

    const coverageInfoFull = (() => {
        const title = `${startTimeRounded.toLocaleTimeString([], {hour: '2-digit'})} Sweep Notes\n\n`;

        const time = `Time: ${startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}\n`;
        const date = `Date: ${startTime.toLocaleDateString()}\n`;
        const CAs = `CAs on Sweep: ${userInfo.name} and ${coverageInfo.coverageBuddy}\n\n`;

        return title + time + date + CAs + floorInfoBlocks;
    })();

    return (
        <div className="page-full">
            <div className="page-header page-header-multi">
                <BackButton onClick={handleBack} />
                <img src={logoText} alt="Logo" className="page-header-logo" />
            </div>

            <div className="page-subtitle review-subtitle">
                <h2 className="page-subtitle-text"> Review </h2>
                <h3> Scroll through and double check everything. If it looks good, hit done at the very bottom to email yourself the info. </h3>
            </div>

            <div className="page-subtitle page-subtitle-slim review-email">
                <h2 className="page-subtitle-text"> Email </h2>
                <h3> {userInfo.email} </h3>
            </div>

            <div className="page-subtitle page-subtitle-slim">
                <h2 className="page-subtitle-text"> Information </h2>
            </div>

            <div className="page-body">
                <pre className="page-body-text review-information-body">
                    {coverageInfoFull}
                </pre>
            </div>

            <div className="review-button">
                <DoneButton 
                    text="Send"
                    onClick={sendEmail}
                    disabled={false}
                />
            </div>
        </div>
    );
}

export default Review;
