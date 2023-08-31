import "./MultiLineInput.css";

export type MultiLineInputProps = {
    labelText: string;
    name: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MultiLineInput(props: MultiLineInputProps) {
    return (
        <div className="multiline-wrapper">
            <label className="multiline-label" htmlFor={name}>{props.labelText}</label>
            <textarea className="multiline-area" name={name} onChange={props.onChange} value={props.value} rows="4" />
        </div>
    );
}

export default MultiLineInput
