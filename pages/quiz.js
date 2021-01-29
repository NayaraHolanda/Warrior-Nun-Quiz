/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizButton from '../src/components/QuizButton';
import AlternativesForm from '../src/components/AlternativesForm';

function ResultWidget({ results, totalQuestions }) {
  const correctCount = results.filter((x) => x).length;
  return (
    <Widget>
      <Widget.Header>
        TELA DE RESULTADO
      </Widget.Header>

      <Widget.Content>
        <p>
          {`Você acertou ${correctCount} de ${totalQuestions} perguntas`}
        </p>
        <ul>
          {results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`result__${index}`}>
              {index + 1}
              ª
              {' '}
              Questão:
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget({ imgLoading }) {
  return (
    <Widget>
      <Widget.Header>
        Prepare-se
      </Widget.Header>

      <Widget.Content>
        <img
          alt="Carregando quiz"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={imgLoading}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setisQuestionSubmited] = useState(false);

  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Pergunta
          {' '}
          {questionIndex + 1}
          {' '}
          de
          {' '}
          {` ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setisQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              setisQuestionSubmited(false);
              setSelectedAlternative(undefined);
              onSubmit();
            }, 0.5 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  value={alternativeIndex}
                  // onChange={play}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <QuizButton type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </QuizButton>
          {/* {isQuestionSubmited && isCorrect && <p>Você acertou! :D </p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou! :/ </p>} */}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

// function ResultQuiz({ answers, totalQuestions }) {
//   return (
//     <>
//       <Widget>
//         <Widget.Header>
//           <h1>Resultado: </h1>
//         </Widget.Header>
//         <Widget.Content>
//           <p>
//             {`Você acertou ${answers.filter(Boolean).length} de ${totalQuestions} questões`}
//           </p>
//         </Widget.Content>
//       </Widget>
//     </>
//   );
// }

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const imgLoading = db.gifLoading;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }
  // const [answers, setAnswer] = useState([]);
  // const [optionSelected, setOptionSelected] = useState([]);

  // [React chama de: Efeitos || Effects]
  // useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2.2 * 1000);
  // nasce === didMount
  }, []);

  // function play(event) {
  //   setOptionSelected(Number(event.target.value));
  // }

  function handleSubmitQuiz() {
    // const respostas = answers;
    // respostas.push(optionSelected === question.answer);
    // setAnswer(respostas);
    // console.log(answers);

    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
            // play={play}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget imgLoading={imgLoading} />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} totalQuestions={totalQuestions} />
        )}

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl={db.gitLink} />
    </QuizBackground>
  );
}
