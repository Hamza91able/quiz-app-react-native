import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

import Topbar from './Components/Topbar/Topbar';
import StartQuiz from './Components/StartQuiz/StartQuiz';

type Props = {};
export default class App extends Component<Props> {

  state = {
    enableBtn: true,
    startQuiz: false,
    quiz: [],
  }

  componentDidMount() {
    this.prepareQuiz();
  }

  getQuiz = () => {
    const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
    return fetch(url).then((res) => res.json());
  }

  prepareQuiz = () => {
    this.getQuiz().then(res => {
      this.setState({
        quiz: res,
        enableBtn: false,
      })
    }).catch(err => console.log(err));
  }

  finishQuiz = () => {
    this.setState({
      enableBtn: true,
      startQuiz: false,
      quiz: [],
    })
    this.prepareQuiz();
  }

  render() {
    const { enableBtn, startQuiz, quiz } = this.state;

    return (
      <View>
        <Topbar />

        <View>
          {!startQuiz && <View style={style.startQuizBtn}>
            <Button onPress={() => this.setState({ startQuiz: true })} disabled={enableBtn} title="Start Quiz" />
          </View>}
        </View>

        {startQuiz && <StartQuiz quiz={quiz} finishQuiz={this.finishQuiz} />}

      </View>
    );
  }
}

const style = StyleSheet.create({
  startQuizBtn: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 250
  },
  quizPage: {
    width: '100vw',
    justifyContent: "center",
    alignItems: 'center',
  }
})
