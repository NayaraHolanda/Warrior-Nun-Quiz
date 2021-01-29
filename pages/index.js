import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizButton from '../src/components/QuizButton';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>WarriorNun Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(event) => {
                  // name = event.target.value;
                  setName(event.target.value);
                }}
                placeholder="Diz aí seu nome :)"
                value={name}
              />
              <QuizButton type="submit" disabled={name.length === 0}>
                Jogar
              </QuizButton>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            {db.external.map(({ quizName, quizURL }) => (
              <p>
                <a href={quizURL} target="_blank" rel="noreferrer">
                  <QuizButton>
                    {quizName}
                  </QuizButton>
                </a>
              </p>
            ))}
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl={db.gitLink} />
    </QuizBackground>
  );
}
