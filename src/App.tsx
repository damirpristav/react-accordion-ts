import React, { Fragment, FC } from 'react';
import './App.css';

import Header from './components/Header';
import Accordions from './components/Accordions';

const accordionData = [
  {
    question: 'Lorem ipsum dolor sit amet 1 ?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem.'
  },
  {
    question: 'Lorem ipsum dolor sit amet 2 ?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima! Doloribus, vero quos doloremque.'
  },
  {
    question: 'Lorem ipsum dolor sit amet 3 ?',
    answer: 'Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima!'
  },
  {
    question: 'Lorem ipsum dolor sit amet 4 ?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima!'
  }
];

const App: FC = () => {
  return (
    <Fragment>
      <Header title="React JS accordions" />
      <div className="container">
        <Accordions data={accordionData} duration={400} closeOthers opened={2} />
      </div>
    </Fragment>
  );
}

export default App;
