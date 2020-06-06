import React, {Component} from 'react';
import Questions from "./Questions";
import Question from "./Question";
import AskQuestion from "./AskQuestion";
import {Router} from "@reach/router";

class App extends Component {

    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        //this.GetData();
        this.GetData().then(() => console.log("Questions gotten!"));
    }

    async addQuestion(question) {
        // fetching data from the https link below
        let url = `${this.API_URL}/questions`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            // Defining what method should be used
            method: 'POST',
            // Clarifying what the data should be.
            body: JSON.stringify({
                "question": question,
                "answers": [{text:"", votes:0}]
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
    }

    async GetData() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    async postAnswer(id, text) {
        console.log("postAnswer", 'id:' + id, ' answer:' + text);
        const url = `${this.API_URL}/questions/${id}/answers`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
               answers: text
            })
        });
        const json = await response.json();

        console.log("Printing the response:", json);
    }
    async AddVoting(id, aid) {
        console.log("postVoting", 'id:' + id, ' answer:' + aid);
        //const question = this.state.questions.find(k => k._id === _id);
        const url = `${this.API_URL}/questions/${id}/answers/${aid}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
        });
        const json = await response.json();

        console.log("Printing the response:", json);
        await this.GetData();
    }

    GetQuestion(_id) {
        return this.state.questions.find(k => k._id === _id);
    }



// Render is used for showing all data. In the render you are defining what the render should return, (what to show).
    render() {
        return (
            <>
                <h2>Question and Answers website</h2>
                <Router>
                    <Questions path="/" data={this.state.questions}></Questions>
                    <Question path="/question/:id" GetQuestion={(id) => this.GetQuestion(id)} addQuestion={(question) => this.addQuestion(question)} postAnswer={(id, text) => this.postAnswer(id, text)} AddVoting={(id, aid) => this.AddVoting (id, aid)}></Question>
                </Router>

                <AskQuestion addQuestion={(question) => this.addQuestion(question)}/>
                <br/><br/>
            </>
        );
    }
}
export default App;