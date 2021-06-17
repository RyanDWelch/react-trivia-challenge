import React from 'react';
import Question from './Question';

const API_URL = 'https://opentdb.com';


let newQuestion;


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      questions: [],
      oldQuestions: [],
      correct: [],
      incorrect: []
    };
  }

  getQuestions(amount=4, category=-1, difficulty='Mixed') {
    this.setState({
      isLoaded: false,
    });
    difficulty = difficulty.toLowerCase();
    const url = `${API_URL}/api.php?amount=${amount}` + 
      ((category !== -1) ? `&category=${category}` : '') +
      ((difficulty !== 'mixed') ? `&difficulty=${difficulty}` : '');
    fetch(url)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        questions: json.results
      });
    });
  }



  updateStats = (solution) => {
    if (solution) {
      this.setState({
        correct: this.state.correct.concat("answer")
      });
    } else {
      this.setState({
        incorrect: this.state.incorrect.concat("answer")
      });
    }

  }
  
  componentDidMount() {
    this.getQuestions();
  }
  

  render() {
    var { isLoaded, questions, correct, incorrect } = this.state;
    if (!isLoaded) {
      return (
        <div className="App">
          <div className="header">
            <h1>Trivia Game!</h1>
          </div>
          <div className="questions-container">Loading Questions...</div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <div className="header">
            <h1>Trivia Game!</h1>
            <button className="update" onClick={()=>this.getQuestions()}>Update Questions</button>
            <div className="stats">
              <div>Correct: {correct.length}</div>
              <div>Incorrect: {incorrect.length}</div>
            </div>
          </div>
          <div className="questions-container">
            {questions.map((question, i) =>
              <Question data={question} key={i} updateGame={this.updateStats} />
            )}
          </div>
        </div>
      )
    }
  }

}

export default Game;
