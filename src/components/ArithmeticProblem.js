import React, { useState, useEffect } from 'react';

const ArithmeticProblem = () => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [sign, setSign] = useState('');
    const [x, setX] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        generateNewProblem();
    }, []);

    const generateNewProblem = () => {
        const newSign = generateSign();
        const newX = generateX(newSign);
        const newNum1 = generateNum1(newSign, newX);
        const newNum2 = generateNum2(newSign, newX);
        const newCorrectAnswer = checkCorrectAnswer(newSign, newX, newNum1, newNum2);
        
        setSign(newSign);
        setX(newX);
        setNum1(newNum1);
        setNum2(newNum2);
        setCorrectAnswer(newCorrectAnswer);
    };

    const generateSign = () => {
        const signs = ['+', '-', 'x', '/'];
        return signs[Math.floor(Math.random() * signs.length)];
    };

    const generateX = (sign) => {
        // X should be a positive integer
        const newX = Math.floor(Math.random() * 10) + 1;
        if (sign === 'x') {
            // Make X the correct answer 50% of the time
            return Math.random() < 0.5 ? newX : Math.floor(Math.random() * 10) + 1;
        } else {
            return newX;
        }
    };

    const generateNum1 = (sign, x) => {
        let newNum1;
        if (sign === '/') {
            // For division, num1 should be a multiple of num2
            newNum1 = Math.floor(Math.random() * 10) + 1;
            return newNum1 * x;
        } else if (sign === '-') {
            // For subtraction, num1 should be greater than num2
            return Math.floor(Math.random() * 10) + 1 + x;
        } else {
            // For addition and multiplication, num1 and num2 should be less than or equal to 12
            return Math.floor(Math.random() * 13);
        }
    };

    const generateNum2 = (sign, x) => {
        if (sign === '/') {
            // For division, num2 should be a factor of num1
            return x;
        } else {
            // For addition, subtraction, and multiplication, num2 should be less than or equal to 12
            return Math.floor(Math.random() * 13);
        }
    };

    const checkCorrectAnswer = (sign, x, num1, num2) => {
        switch (sign) {
            case '+':
                return num1 + num2 === x;
            case '-':
                return num1 - num2 === x;
            case 'x':
                return num1 * num2 === x;
            case '/':
                return num1 / num2 === x;
            default:
                return false;
        }
    };

    const handleAnswer = (answer) => {
        if (answer === correctAnswer) {
            setScore(score + 1);
        }
        generateNewProblem();
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Score: {score}</h2>
                </div>
                <div className="card-body">
                    <h1 className="card-text">{num1} {sign} {num2} = {x}</h1>
                </div>
                <div className="card-body">
                    <button className="btn btn-primary btn-lg mr-2 mb-2" onClick={() => handleAnswer(true)} disabled={correctAnswer === true}>True</button>
                    <button className="btn btn-primary btn-lg mr-2 mb-2" onClick={() => handleAnswer(false)} disabled={correctAnswer === false}>False</button>
                </div>
            </div>
        </div>
    );
};

export default ArithmeticProblem;
