import "./BackButton.css"

export type BackButtonProps = {
    onClick: () => void;
}

function BackButton(props: BackButtonProps) {
    return (
        <button className="backButton" onClick={props.onClick}>
            &lt; Back
        </button>
    );
}

export default BackButton

