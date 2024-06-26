import React, { useState, useEffect } from 'react';

import BackButton from "../../basic/BackButton";
import DoneButton from "../../basic/DoneButton";
import FloorInfo from "../PageManager/FloorInfo.ts";
import type { CoverageState, CoverageFloorState } from "../PageManager";
import logoText from "/assets/Logo-name.svg";
import editIcon from "/assets/edit-icon.png";
import "../common/common.css";
import "./Review.css";

export type ReviewProps = {
    coverageState: CoverageState;
    setCoverageState: (coverageState: CoverageState) => void;
    goToPage: (pageName: string) => void;
}

function Review(props: ReviewProps) {
    const [endTime, setEndTime] = useState(new Date());
    const [hasEmailedThemself, setHasEmailedThemself] = useState(false);
    const [hasCopiedToClipboard, setHasCopiedToClipboard] = useState(false);
    const [emailSending, setEmailSending] = useState(false);

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(coverageInfoText);
        setHasCopiedToClipboard(true);
    }

    const sendEmail = () => {
        if (!userInfo || !coverageInfo) {
            alert("Something went wrong. Please contact VW for help. Missing userinfo or coverageinfo");
            return;
        }

        const confirmation = window.confirm("Are you sure you want to email this to: " + userInfo.email + "?");

        if (!confirmation) {
            return;
        }

        if (import.meta.env.VITE_REACT_APP_DEV) {
            console.log("Email sent!");
            console.log("Email sent to: " + userInfo.email);
            console.log("Email body: " + coverageInfoText);
        } else {
            setEmailSending(true);
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
                        "message": coverageInfoText,
                    },
                }),
            }).then((response) => {
                if (response.status === 200) {
                    console.log("Email sent!");
                    setEmailSending(false);
                } else {
                    console.log("Email failed to send.");
                    setEmailSending(false);
                    alert("Email failed to send. Please contact VW for help.");
                }
            }).catch((error) => {
                console.log("Email failed to send. Error: " + error);
                setEmailSending(false);
                alert("Email failed to send. Please contact VW for help.");
            });
        }

        setHasEmailedThemself(true);
    }

    const nextPage = () => {
        props.setCoverageState({});
        props.goToPage("done");
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

    const singleFloorInfoBlock = (floorNameWithoutReview: string): string => {
        const floorInfo = FloorInfo[floorNameWithoutReview];

        const coverageDataForFloor: CoverageFloorState | undefined = props.coverageState[floorNameWithoutReview];

        if (!coverageDataForFloor) {
            return "";
        }

        const floorRooms = floorInfo.rooms.map((room: string) => (
            `${floorInfo.name} ${room}: ${coverageDataForFloor[room]}\n`
        )).reduce((prev: string, curr: string) => prev + curr, "");

        const notes = coverageDataForFloor["notes"] ? `${floorInfo.name} Notes:\n${coverageDataForFloor["notes"]}` : "";

        return `${floorRooms}${notes}\n`;
    }

    const floorInfoText = Object.keys(FloorInfo).map((floorNameWithoutReview) => {
        return singleFloorInfoBlock(floorNameWithoutReview) + "\n";
    }).reduce((prev, curr) => prev + curr, "");

    const coverageMetadata = (() => {
        const title = `${startTimeRounded.toLocaleTimeString([], {hour: '2-digit'})} Sweep Notes\n`;

        const time = `Time: ${startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}\n`;
        const date = `Date: ${startTime.toLocaleDateString()}\n`;
        const CAs = `CAs on Sweep: ${userInfo.name} and ${coverageInfo.coverageBuddy}\n\n`;

        return title + time + date + CAs + "\n";
    })();

    const coverageInfoText = (() => {
        return coverageMetadata + floorInfoText;
    })();

    // with edit button
    const floorInfoEdit = Object.keys(FloorInfo).map((floorNameWithoutReview) => {
        return (
            <React.Fragment key={floorNameWithoutReview + "-edit"}><div className="review-text-row">{singleFloorInfoBlock(floorNameWithoutReview)} <img src={editIcon} alt="Edit" className="review-edit-icon" onClick={() => props.goToPage(floorNameWithoutReview + "-review")} /> </div></React.Fragment>
        );
    });

    const coverageInfoEdit: React.ReactElement = <>{coverageMetadata}{floorInfoEdit}</>;

    return (
        <div className="page">
            <div className="page-header page-header-multi">
                <BackButton onClick={handleBack} />
                <img src={logoText} alt="Logo" className="page-header-logo" />
                <div className="page-back-filler" />
            </div>

            <div className="page-subtitle review-subtitle">
                <h2 className="page-subtitle-text"> Review </h2>
                <h3> Scroll through and double check everything. If it looks good, you can email it to yourself or copy to clipboard. </h3>
            </div>

            <div className="page-subtitle page-subtitle-slim">
                <h2 className="page-subtitle-text"> Information </h2>
            </div>

            <div className="page-body">
                <pre className="page-body-text review-information-body">
                    {coverageInfoEdit}
                </pre>
            </div>

            <div className="page-subtitle review-save-buttons">
                <DoneButton
                    text="Copy"
                    onClick={copyToClipboard}
                    disabled={hasCopiedToClipboard}
                />

                <DoneButton
                    text={emailSending ? "..." : "Email"}
                    onClick={sendEmail}
                    disabled={hasEmailedThemself}
                />
            </div>

            <div className="review-button">
                <DoneButton 
                    text="Done"
                    onClick={nextPage}
                    disabled={!(hasCopiedToClipboard || hasEmailedThemself)}
                />
            </div>
        </div>
    );
}

export default Review;
