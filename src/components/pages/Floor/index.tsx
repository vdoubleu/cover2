import { useState, useEffect } from "react";
import BackButton from "../../basic/BackButton";
import DoneButton from "../../basic/DoneButton";
import SimpleInput from "../../basic/SimpleInput";
import MultiLineInput from "../../basic/MultiLineInput";
import FloorInfo from "../PageManager/FloorInfo.ts";
import type { CoverageState, CoverageFloorState } from "../PageManager";
import logoText from "/assets/Logo-name.svg";
import "../common/common.css";
import "./Floor.css";

export type FloorProps = {
    goToPage: (page: string) => void;
    floorNum: number;
    floorSide: string;
    isReview: boolean;
    coverageState: CoverageState;
    setCoverageState: (coverageState: CoverageState) => void;
}

export type FloorState = { [key: string]: string };

function Floor(props: FloorProps) {
    const [floorState, setFloorState] = useState<FloorState>({});

    const currFloorWithoutReview = `floor-${props.floorNum}-${props.floorSide}`;

    useEffect(() => {
        const floorRooms = FloorInfo[currFloorWithoutReview].rooms;
        const floorCoverage: CoverageFloorState | undefined = props.coverageState[currFloorWithoutReview];

        if (floorCoverage) {
            setFloorState(floorCoverage as FloorState);
        } else {
            const newFloorState: FloorState = {};
            floorRooms.forEach((room) => {
                newFloorState[room] = "";
            });
            newFloorState["notes"] = "";
            setFloorState(newFloorState);
        }
    }, [props.floorNum, props.floorSide, currFloorWithoutReview]);

    function handleBack() {
        if (props.isReview) {
            props.goToPage("review");
        } else {
            const newPage = FloorInfo[currFloorWithoutReview].prev;

            if (newPage === "start" || newPage === "review") {
                props.goToPage(newPage);
            } else {
                props.goToPage(`${newPage}-no`);
            }
        }
    }

    function updateCoverageState() {
        const floorCoverage = { ...props.coverageState[currFloorWithoutReview] };
        const floorRooms = FloorInfo[currFloorWithoutReview].rooms;

        floorRooms.forEach((room) => {
            floorCoverage[room] = floorState[room] === "" ? "0" : floorState[room];
        });

        floorCoverage["notes"] = floorState["notes"];

        const coverageState = { ...props.coverageState };

        coverageState[currFloorWithoutReview] = floorCoverage;

        props.setCoverageState(coverageState);
    }

    function nextPage() {
        updateCoverageState();

        if (props.isReview) {
            props.goToPage("review");
        } else {
            const newPage = FloorInfo[currFloorWithoutReview].next;

            if (newPage === "start" || newPage === "review") {
                props.goToPage(newPage);
            } else {
                props.goToPage(`${newPage}-no`);
            }
        }
    }

    const floorText = props.floorNum === 3 ? "Floor 3" : `Floor ${props.floorNum} ${props.floorSide}`;

    const inputFields = (() => {
        const floorRooms = FloorInfo[currFloorWithoutReview].rooms;
        const inputFields = floorRooms.map((room: string) => {
            return (
                <SimpleInput
                    key={room}
                    labelText={`Number of students in ${room}`}
                    type="number"
                    name={room}
                    onChange={(e) => setFloorState({ ...floorState, [room]: e.target.value })}
                    value={floorState[room]}
                />
            );
        });

        return (
            <div className="floor-input">
                {inputFields}
                <MultiLineInput
                    labelText="Notes"
                    name="notes"
                    onChange={(e) => setFloorState({ ...floorState, notes: e.target.value })}
                    value={floorState.notes}
                />
            </div>
        );
    })();

    return (
        <div className="page">
            <div className="page-header page-header-multi">
                <BackButton onClick={handleBack} />
                <img src={logoText} alt="Logo" className="page-header-logo" />
                <div className="page-back-filler" />
            </div>

            <div className="floor-title">
                <h1 className="floor-title-text">{floorText}</h1>
            </div>

            {inputFields}

            <div className="floor-button">
                <DoneButton text={props.isReview ? "Done" : "Next"} onClick={nextPage} disabled={false} />
            </div>
        </div>
    );
}

export default Floor;
