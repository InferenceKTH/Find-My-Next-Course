export function TextInputView(props){
    return <div>
        <h2>This is another view, where the presenter submits the text field to the Database</h2>
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