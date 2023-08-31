import "./DoneButton.css";

export type DoneButtonProps = {
    text: string,
    disabled: boolean,
    onClick: () => void
}

function DoneButton(props: DoneButtonProps) {
    const classes = "doneButton " + 
        (props.disabled ? "doneButton-disabled" : "doneButton-enabled");

    return (
        <button className={classes} onClick={props.onClick} disabled={props.disabled}>
            <div className="doneButton-text"> {props.text} </div>
        </button>
    );
}

export default DoneButton


