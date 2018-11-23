import React, { Component } from "react";
import { Subheading, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ListItem, Text, Radio, Right, Left } from 'native-base';
import {  View } from 'react-native';

class StartQuiz extends Component {

    state = {
        category: "",
        quiz: [],
        quizAns: [],
        incorrectAns1: "",
        incorrectAns2: "",
        incorrectAns3: "",
        question: 0,
        first: false,
        second: false,
        third: false,
        fourth: false,
        userAnswers: [],
        totalMarks: 0,
        showResult: false,
    }

    componentDidMount = () => {
        this.getCategory();
        this.getQuestion();
    }

    getCategory = () => {
        const { quiz } = this.props;

        quiz.results.map(val => {
            this.setState({
                category: val.category,
            })
        })
    }

    getQuestion = () => {
        const { quiz } = this.props;

        quiz.results.map(val => {
            this.setState(prevState => ({
                quiz: [...prevState.quiz, val.question],
                quizAns: [...prevState.quizAns, val.correct_answer],
                incorrectAns1: [...prevState.incorrectAns1, val.incorrect_answers[0]],
                incorrectAns2: [...prevState.incorrectAns2, val.incorrect_answers[1]],
                incorrectAns3: [...prevState.incorrectAns3, val.incorrect_answers[2]],
            }))
        })
    }

    compileResult = () => {
        const { userAnswers, quizAns } = this.state;
        let totalMarks = 0;
        console.log(userAnswers);
        console.log(quizAns);

        for (let i = 0; i <= quizAns.length; i++) {
            if (quizAns[i] === userAnswers[i]) {
                totalMarks++
            } else {
                continue;
            }
        }
        console.log(totalMarks - 1);
        this.setState({
            totalMarks: totalMarks - 1,
            showResult: true
        })
    }

    renderQuizQuestion = () => {
        const { quiz, quizAns, incorrectAns1, incorrectAns2, incorrectAns3, first, second, third, fourth, showResult } = this.state;
        let { question } = this.state;
        if (question < quiz.length) {
            return (
                <Card>
                    <Card.Content>
                        <Title>{quiz[question]}</Title>
                        <Paragraph></Paragraph>
                        <View>
                            <ListItem>
                                <Left>
                                    <Text>{incorrectAns1[question]}</Text>
                                </Left>
                                <Right>
                                    <Radio onPress={() => this.setState(prevState => ({
                                        first: true,
                                        second: false,
                                        third: false,
                                        fourth: false,
                                        userAnswers: [...prevState.userAnswers, incorrectAns1[question]]
                                    }))} selected={first} />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>{incorrectAns2[question]}</Text>
                                </Left>
                                <Right>
                                    <Radio onPress={() => this.setState(prevState => ({
                                        first: false,
                                        second: true,
                                        third: false,
                                        fourth: false,
                                        userAnswers: [...prevState.userAnswers, incorrectAns2[question]]
                                    }))} selected={second} />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>{incorrectAns3[question]}</Text>
                                </Left>
                                <Right>
                                    <Radio onPress={() => this.setState(prevState => ({
                                        first: false,
                                        second: false,
                                        third: true,
                                        fourth: false,
                                        userAnswers: [...prevState.userAnswers, incorrectAns3[question]]
                                    }))} selected={third} />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>{quizAns[question]}</Text>
                                </Left>
                                <Right>
                                    <Radio onPress={() => this.setState(prevState => ({
                                        first: false,
                                        second: false,
                                        third: false,
                                        fourth: true,
                                        userAnswers: [...prevState.userAnswers, quizAns[question]]
                                    }))} selected={fourth} />
                                </Right>
                            </ListItem>
                        </View>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => this.setState({
                            question: question + 1,
                            first: false,
                            second: false,
                            third: false,
                            fourth: false,
                        })}>Next</Button>
                    </Card.Actions>
                </Card>
            )
        } else {
            return (
                <View>
                    <Text>Quiz Completed</Text>
                    <View>
                        <Button onPress={this.compileResult}>Get Result</Button>
                        {this.toggleStopwatch}
                        {showResult && <View><Text>Result:</Text></View>}
                        {showResult && <View><Text>Total Marks: {this.state.totalMarks}/10</Text></View>}
                    </View>
                    {showResult && <Button onPress={this.props.finishQuiz}>FINISH</Button>}
                </View>
            )
        }
    }

    render() {
        const { category } = this.state;

        return (
            <View>
                <Subheading>Quiz Started</Subheading>
                <Subheading>Quiz Category: {category}</Subheading>
                {this.renderQuizQuestion()}
            </View>
        )
    }
}

export default StartQuiz;