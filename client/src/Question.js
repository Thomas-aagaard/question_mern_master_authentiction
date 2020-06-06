import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";
import Answer from "./Answer";


export default class Question extends Component {


    onSubmit(aid) {
        console.log(this.props.id, aid);
        this.props.AddVoting(this.props.id, aid);
    }

    render() {
       // const id = this.props.id;
      //  const question = this.props.GetQuestion(id);
        const question = this.props.GetQuestion(this.props.id);
        let content = "Loading";
        let answers = [];

        // if question is empty then replace the question with "loading" see variable content above
        if (question) {
            content = question.question;
            answers = question.answers.map(a => <li key={a}><strong> { "Answers: "}</strong>{a.text}<strong> { "Votes: "}</strong>
                <button onClick={_ => this.onSubmit(a._id)}>GIVE A VOTE</button>{ a.votes}</li>);
        }

        return (
            <>
                <h2>{content}</h2>
                <h3>Answers</h3>
                <ul>
                    {answers}

                </ul>
                <Answer id={this.props.id} AddVoting={(id, aid) => this.AddVoting(id, aid)}/>
                <br/>
                {/* PostAnswer */}
                <PostAnswer id={this.props.id} postAnswer={(id, text) => this.props.postAnswer(id, text)}/>

                <br/> <br/>


                <Link to="/">Go Back</Link>
                <br/>
            </>
        );
    }
}