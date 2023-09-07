import "./SimpleInput.css";

export type SimpleInputProps = {
    type?: string;
    labelText: string;
    name: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SimpleInput(props: SimpleInputProps) {
    const inputType = props.type || 'text';

    const pattern = props.type === 'number' ? '[0-9]*' : props.type === 'email' ? '' : undefined;
    const inputMode = props.type === 'number' ? 'numeric' : undefined;

    return (
        <div className="simpleInput-wrapper">
            <label className="simpleInput-label" htmlFor={props.name}>{props.labelText}</label>
            <input className="simpleInput-input" type={inputType} id={props.name} pattern={pattern}  inputMode={inputMode} onChange={props.onChange} value={props.value} />
        </div>
    );
}

export default SimpleInput
