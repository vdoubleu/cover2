import { useState, useEffect } from "react";

import Home from "../Home";
import Setup from "../Setup";
import Start from "../Start";
import Review from "../Review";
import Done from "../Done";
import Floor from "../Floor";

import { disableScroll, enableScroll } from "./ScrollToggle";

export type CoverageFloorState = {
    [key: string]: number | string
}

export type CoverageState = {
    metadata?: {
        coverageBuddy: string,
        startTime: number,
    },
    [key: string]: CoverageFloorState | undefined
}

function PageManager() {
    const [currPage, setCurrPage] = useState<string>("home");
    const [coverageState, setCoverageState] = useState<CoverageState>({});

    const pageMap: { [key: string]: JSX.Element; } = {
        "home": (<Home goToPage={goToPage} setCoverageState={setCoverageState} />),
        "setup": (<Setup goToPage={goToPage} />),
        "start": (<Start goToPage={goToPage} setCoverageState={setCoverageState} coverageState={coverageState} />),
        "review": (<Review goToPage={goToPage} setCoverageState={setCoverageState} coverageState={coverageState} />),
        "done": (<Done goToPage={goToPage} />),
    }

    function goToPage(toPage: string) {
        setCurrPage(toPage);
    }

    const page = ((currPage: string) => {
        if (currPage.startsWith("floor")) {
            const pageSplit = currPage.split("-");
            const floorNum = parseInt(pageSplit[1]);
            const floorSide = pageSplit[2];
            const isReview = pageSplit[3] === "review";

            return (<Floor 
                goToPage={goToPage} 
                floorNum={floorNum} 
                floorSide={floorSide} 
                isReview={isReview}
                coverageState={coverageState}
                setCoverageState={setCoverageState}
            />);
        }

        return pageMap[currPage];
    })(currPage);

    useEffect(() => {
        const bodyHeight = document.body.clientHeight;
        const windowHeight = window.innerHeight;
        if (bodyHeight > windowHeight) {
            enableScroll();
        } else {
            disableScroll();
        }
    });

    return (
        <>
            {page}
        </>
    );
}

export default PageManager;
