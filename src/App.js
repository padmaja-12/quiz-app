import React,{ Component } from 'react';
import quizService from './quizService/index';;
import Header from './partials/header';
import Popup from './components/Popup';
import Answers from './components/Answer';
import './assets/style.css'

class QuizMania extends Component {

    state = {
        count : 0,
        questionBank : [],
        score:0,
        responses:0
    }
     getQuestions = () => {
          quizService().then(questions => {
             this.setState({questionBank  : questions})
         })
         
        /*
        quizService().then(res => {
            console.log(res)
        });
        */
     }
     playAgain = () => {
         this.getQuestions();
         this.setState({
             score : 0,
             total: 5,
            showButton: false,
            questionAnswered: false,
            displayPopup: 'flex'
         })
     }
     computeAnswer = (answer,correctAnswer) => {
        if(answer === correctAnswer){

           this.setState({score : this.state.score + 1});
        }
        this.setState({
            responses : this.state.responses < 5 ? (this.state.responses + 1) : 5});
    }
     componentDidMount () {
         this.getQuestions();
         let count = this.state.count;
         this.insertData(count);
     }


     insertData = (count) => {
        this.setState({
            question: this.state.questionBank[count].question,
            answers: [  this.state.questionBank[count].answers[0], 
                        this.state.questionBank[count].answers[1], 
                        this.state.questionBank[count].answers[2], 
                        this.state.questionBank[count].answers[3] 
                    ],
            correct: this.state.questionBank[count].correct,
            count: this.state.count + 1
        });
    }


     handleShowButton = () => {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }
    
    nextQuestion = () => {
        let { count, total} = this.state;

        if(count === total){
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.insertData(count);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }
    }

    handleStartQuiz = () => {
        this.setState({
            displayPopup: 'none',
            count: 1
        });
    }

    handleIncreaseScore = () => {
        this.setState({
            score: this.state.score + 1
        });
    }


    render() {
        let { count, total, question, answers, correct, showButton, questionAnswered, displayPopup, score} = this.state;
        return (
            <div>
                 < Header />
                <Popup style={{display: displayPopup}} 
             score={score} 
             total={total} 
             startQuiz={this.handleStartQuiz}
        />
               <div className="row">
            <div className="col-lg-12 col-md-10">
                <div id="question">
                    <h4 className="bg-light">Question {count}/{total}</h4>
                    <p>{question}</p>
                </div>

                <Answers 
                    answers={answers} 
                    correct={correct} 
                    showButton={this.handleShowButton} 
                    isAnswered={questionAnswered} 
                    increaseScore={this.handleIncreaseScore}
                />


                <div id="submit">
                    {showButton ? 
                    <button className="fancy-btn" 
                            onClick={this.nextQuestion} >
                    {count === total ? 'Finish quiz' : 'Next question'}
                    </button> : <span></span>}
                </div>
            </div>
        </div>


            </div>
           
        )
    }
}

export default QuizMania;