import React, { Component } from "react";
import MyButton from "../util/Button";
import Fade from "react-reveal/Fade";

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: "start",
      title: "Welcome to QuizMania",
      text: "This is a quiz app made for fun.Happy playing!! <br /><br />",
      buttonText: "Start the quiz"
    };

    this.popupHandle = this.popupHandle.bind(this);
  }

  popupHandle = () => {
    let { time } = this.state;
    console.log(this.props.score);
    if (time === "start") {
      this.setState({
        time: "end",
        title: "Congratulations!",
        text:
          "You have completed the quiz. <br /> You got: <strong>" +
          this.props.score +
          "</strong> out of <strong>" +
          this.props.total +
          "</strong> questions right.",
        buttonText: "Restart"
      });

      //alert("START THE QUIZ");
      this.props.startQuiz();
    } else {
      //alert("FINISHED QUIZ");
      window.location.reload(); // restart the application
    }
  };

  createMarkup = (text) => {
    return { __html: text };
  };
  componentWillReceiveProps(nextProps) {
    console.log("From Popup:::::", nextProps);
    if (nextProps.total === 5) {
      this.setState({
        text:
          "You have completed the quiz. <br /> You got: <strong>" +
          this.props.score +
          "</strong> out of <strong>" +
          this.props.total +
          "</strong> questions right."
      });
    }
  }

  render() {
    let { title, text, buttonText } = this.state;

    let { style } = this.props;

    return (
      <Fade delay={500}>
        <div className="popup-container" style={style}>
          <div className="container">
            <div>
              <div className="popup">
                <h1>{title}</h1>
                <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                <span onClick={this.popupHandle}>
                  <MyButton text={buttonText} bck="#6200ffcb" color="#fff" />
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
