import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from './Question';

// Some test data for the tests.
const questions = {
    id: 1,
    question: "How do I return the response from an Observable in Angular 2?",
    answers: [
        {text: "Observables are lazy so you have to subscribe to get the value.", votes: 5},
        {text: "You can use asyncPipe", votes: -2},
        {text: "The reason that it's undefined is that you are making an asynchronous operation", votes: 3},
    ]
};

it('renders the actual question', () => {
    const comp = <Question GetQuestion={id => questions}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(questions.question)).toBeInTheDocument();
});

it('renders all answers for a Question', () => {
    const comp = <Question GetQuestion={id => questions}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(/You can use asyncPipe/i)).toBeInTheDocument();
   // expect(getByText(questions.answers[1].text)).toBeInTheDocument();
});