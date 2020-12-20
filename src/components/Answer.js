import React, { Component } from "react";

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
      classNames: ["", "", "", ""],
      showGif: false
    };

    this.checkAnswer = this.checkAnswer.bind(this);
    this.clearClasses = this.clearClasses.bind(this);
  }

  checkAnswer(e) {
    let { isAnswered } = this.props;
    //console.log(e.currentTarget.getElementById());
    if (!isAnswered) {
      let elem = e.currentTarget;
      let right;
      let { correct, increaseScore } = this.props;
      let answer = elem.dataset.id;
      let updatedClassNames = this.state.classNames;

      if (answer === correct) {
        updatedClassNames[answer - 1] = "right";
        right = true;
        increaseScore();
      } else {
        updatedClassNames[answer - 1] = "wrong";
        right = false;
      }

      this.setState({
        classNames: updatedClassNames,
        showGif: right
      });
      this.props.showButton();
      var myTime = setTimeout(() => {
        this.clearClasses();
        //console.log("IN SET Timeout");
      }, 2500);
    }
  }
  clearClasses() {
    this.setState({
      classNames: ["", "", "", ""],
      showGif: false
    });
  }
  render() {
    if (!this.props.answers) {
      return <div class="loader">Loading...</div>;
    }
    return (
      <div>
        {this.state.showGif ? (
          <div style={{ alignContent: "center" }}>
            <img
              src="https://i.pinimg.com/originals/a8/9b/5f/a89b5fe852d32184378c2e76d2403412.gif"
              alt="Claps"
            />
            <p
              style={{
                textAlign: "center",
                fontSize: "3rem",
                fontWeight: "bold"
              }}
            >
              Great you got this right!!!
            </p>
          </div>
        ) : (
          <div id="answers">
            <ul>
              <li
                onClick={this.checkAnswer}
                className={this.state.classNames[0]}
                data-id="1"
              >
                <span>A</span>
                <p>{this.props?.answers[0]}</p>
              </li>

              <li
                onClick={this.checkAnswer}
                className={this.state.classNames[1]}
                data-id="2"
              >
                <span>B</span>
                <p>{this.props?.answers[1]}</p>
              </li>

              <li
                onClick={this.checkAnswer}
                className={this.state.classNames[2]}
                data-id="3"
              >
                <span>C</span>
                <p>{this.props?.answers[2]}</p>
              </li>

              <li
                onClick={this.checkAnswer}
                className={this.state.classNames[3]}
                data-id="4"
              >
                <span>D</span>
                <p>{this.props?.answers[3]}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Answers;
