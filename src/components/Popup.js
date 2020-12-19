import React, { Component } from 'react';
import MyButton from '../util/Button';
import Fade from 'react-reveal/Fade';

class Popup extends Component {
    state = {
            time: 'start',
            title: 'Welcome to QuizMania',
            text: 'Answer the questions and have fun!!',
            buttonText: 'Start the quiz' 
        };
        
    
    popupHandle = () => {
        let { time } = this.state;
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Congratulations!',
                text: 'You have completed the quiz. <br /> You got: <strong>' + this.props.score + 
                    '</strong> out of <strong>' + 
                    this.props.total +
                    '</strong> questions right.',
                buttonText: 'Restart'
            });

            //alert("START THE QUIZ");
            this.props.startQuiz();
        } else {
            
            //alert("FINISHED QUIZ");            
            window.location.reload();// restart the application
        }
    }
     
    createMarkup = (text) => {
        return {__html: text};
    }
    

    
    render() {
       
        let { title, text, buttonText } = this.state;
        
        let { style } = this.props;
        
        return (
            <Fade delay={500}>
                <div className="popup-container" style={style}>
                    <div className="container">
                        <div className="ml-5 col-md-10 col-10">
                            <div className="popup">
                                <h1>{title}</h1>
                                <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                                <span onClick={this.popupHandle}>
                                    <MyButton
                                        text={buttonText}
                                        bck='#FF9800'
                                        color='#fff'
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }
}

export default Popup; 