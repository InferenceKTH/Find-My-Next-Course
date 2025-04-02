export function TextInputView(props){
    return <div>
        <h2>{props.label}:{props.value}</h2>
        <input
            value={props.text}
            onChange={props.onTextChanged}
            type="text"
            className="input"
        />
        <button className="btn btn-primary" onClick={props.onSubmit}>
		Submit
		</button>
    </div>;
}