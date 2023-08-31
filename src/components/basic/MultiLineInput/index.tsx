import "./MultiLineInput.css";

export type MultiLineInputProps = {
    labelText: string;
    name: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>; 
}

function MultiLineInput(props: MultiLineInputProps) {
    return (
        <div className="multiline-wrapper">
            <label className="multiline-label" htmlFor={props.name}>{props.labelText}</label>
            <textarea className="multiline-area" name={props.name} onChange={props.onChange} value={props.value} rows={4} />
        </div>
    );
}

export default MultiLineInput
