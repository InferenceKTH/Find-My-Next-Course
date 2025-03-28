import React from 'react';

function SearchbarView(props){
    return (
        <div>
        <h2>This is another view, where the presenter submits the text field to the Database</h2>

            <div>
                <input
                    value={props.text}
                    onChange={props.onTextChanged}
                    type="text"
                    className="input input-primary input-bordered border-black"
                />
            </div>

            <button className="btn btn-primary" onClick={props.onSubmit}>
                Submit
            </button>

        </div>
    );
}

export default SearchbarView;