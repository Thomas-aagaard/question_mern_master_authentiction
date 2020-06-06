import React from "react";
import {render} from '@testing-library/react';
import Questions from "./Questions";

// Just some test data
const data = [
    {
        id: 1,
        question: "How do I return the response from an Observable in Angular 2?",
        answers: [
            {text: "Observables are lazy so you have to subscribe to get the value.", votes: 5},
            {text: "You can use asyncPipe", votes: -2},
            {text: "The reason that it's undefined is that you are making an asynchronous operation", votes: 3},
        ]
    },
    {
        id: 2,
        question: "I have another question. What is..?",
        answers: [
            {text: "Answer 1", votes: 2},
            {text: "Answer 2", votes: 3},
            {text: "Answer 3", votes: 0}
        ]
    },
    {
        id: 3,
        question: "What IS this??",
        answers: [
            {text: "Answer 1", votes: 0},
            {text: "Answer 2", votes: 1}
        ]
    }
];

it('renders Questions with all titles', () => {
    const comp = <Questions data={data} />;
    const {getByText} = render(comp);

    expect(getByText(data[0].question)).toBeInTheDocument();
    expect(getByText(data[1].question)).toBeInTheDocument();
    expect(getByText(data[2].question)).toBeInTheDocument();
});

it('does not render Question answers', () => {
    const comp = <Questions data={data} />;
    const {queryByText} = render(comp);

    expect(queryByText(data[0].answers[0].text)).toBeNull();
    expect(queryByText(data[0].answers[1].text)).toBeNull();
    expect(queryByText(data[0].answers[2].text)).toBeNull();
});