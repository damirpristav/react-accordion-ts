import React, { Fragment, useRef, FC, RefObject } from 'react';

import Accordion, { AccRef } from './Accordion';

interface AccordionData {
  question: string;
  answer: string;
}

interface AccordionsProps {
  duration?: number;
  data: AccordionData[],
  closeOthers?: boolean;
  opened?: number;
}

const Accordions: FC<AccordionsProps> = ({ duration = 300, data, closeOthers, opened }) => {
  const accEl = useRef<AccRef>([]);

  const clickHandler = (index: number, ref: RefObject<HTMLDivElement[]>, close: (el: HTMLDivElement | null) => void) => {
    if(closeOthers) {
      if(ref.current) {
        ref.current.forEach((el, idx) => {
          if(index !== idx) {
            close(el);
          }
        });
      }
    }
  }

  return(
    <Fragment>
      { data.map((accordion, index) =>( 
        <Accordion 
          key={index} 
          question={accordion.question}
          answer={accordion.answer}
          isOpened={opened === index}
          index={index}
          duration={duration} 
          onClick={clickHandler}
          ref={accEl}
        />
      )) }
    </Fragment>
  );
}

export default Accordions;

