import DoneButton from "../../basic/DoneButton";
import logoText from "/assets/Logo-name.svg";
import "../common/common.css";
import "./Done.css";

function Done(props) {
    function returnHome() {
        props.goToPage("home");
    }

    return (
        <div className="page">
            <div className="page-title done-title">
                <img src={logoText} alt="Logo" className="logo" />
            </div>

            <div className="page-subtitle done-subtitle">
                <h2 className="page-subtitle-text"> Done!! 🎉🎉 </h2>
                <h3> Congrats!! You finished coverage!! Pat yourself on the back and relax.
You deserve it. </h3>
            </div>

            <div className="done-button">
                <DoneButton 
                    text="Done"
                    onClick={returnHome}
                    disabled={false}
                />
            </div>
        </div>
    );
}

export default Done;
