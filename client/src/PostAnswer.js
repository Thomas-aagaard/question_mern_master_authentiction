import React, {Component} from "react";


export default class PostAnswer extends Component {

    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            input: "",
        };
    }
    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    onSubmit(event) {
        this.props.postAnswer(this.props.id, this.state.input);
    }
    async GetData() {
        let url = `${this.API_URL}/questions`; // URL of the API.

        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    render() {
        return(
            <>
                <label htmlFor="post-Answer">
                    Get you questions answered
                </label>
                <input id="post-Answer" name="input" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Post Answer</button>
            </>
        );
    }
}