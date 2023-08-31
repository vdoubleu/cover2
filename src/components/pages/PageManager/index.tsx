import { useState } from "react";

import Home from "../Home";
import Setup from "../Setup";
import Start from "../Start";
import Review from "../Review";
import Done from "../Done";
import Floor from "../Floor";

function PageManager() {
    const [currPage, setCurrPage] = useState("home");
    const [coverageState, setCoverageState] = useState({});

    const pageMap = {
        "home": (<Home goToPage={goToPage} />),
        "setup": (<Setup goToPage={goToPage} />),
        "start": (<Start goToPage={goToPage} setCoverageState={setCoverageState} coverageState={coverageState} />),
        "review": (<Review goToPage={goToPage} setCoverageState={setCoverageState} coverageState={coverageState} />),
        "done": (<Done goToPage={goToPage} />),
    }

    function goToPage(page: string) {
        setCurrPage(page);
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

    return (
        <>
            {page}
        </>
    );
}

export default PageManager;
