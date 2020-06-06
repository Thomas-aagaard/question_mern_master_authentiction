import React, {Component} from 'react';
//import Question from "./Question";
import { Link } from "@reach/router";

class Questions extends Component {

    render() {


        const mapFunction = elm =>
            <li key={elm._id}>
                <Link to={`/question/${elm._id}`}>{elm.question}</Link>
            </li>;

        let allquestions = this.props.data;
        let list = allquestions.map(mapFunction);
        return (
            <>
                <ul>
                    {list}
                </ul>
            </>
        );

    }
}
export default Questions;