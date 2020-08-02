import React, { useRef, forwardRef, useEffect, RefObject } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

type AccordionProps = {
  question: string;
  answer: string;
  index: number;
  isOpened?: boolean;
  duration: number;
  onClick: (index: number, ref: RefObject<HTMLDivElement[]>, close: (el: HTMLDivElement | null) => void) => void
};

export type AccRef = HTMLDivElement[];

const Accordion = ({ question, answer, index, isOpened, duration, onClick }: AccordionProps, ref ) => {
  const accBody = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if(isOpened) {
      if(ref?.current) {
        ref.current[index].classList.add('opened');
      }
      if(accBody.current) {
        accBody.current.style.transitionDuration = duration + 'ms';
        accBody.current.style.display = 'block';
      }
      if(arrow.current) {
        arrow.current.style.transitionDuration = duration + 'ms';
        arrow.current.style.transform = 'rotate(90deg)';
      }
    }
  }, [isOpened, index, ref, duration]);

  const openAccordionHandler = () => {
    ref.current[index].classList.add('opened', 'disable-click');
    onClick(index, ref, closeAccordionHandler);

    const content = accBody.current;
    const arrowEl = arrow.current;
    let height: number;
    if(content) {
      content.style.transitionDuration = duration + 'ms';
      content.style.display = 'block';
      height = content.offsetHeight;
      content.style.height = 0 + 'px';
    }
    if(arrowEl) {
      arrowEl.style.transitionDuration = duration + 'ms';
    }

    setTimeout(() => {
      if(arrowEl) {
        arrowEl.style.transform = 'rotate(90deg)';
      }
      if(content) {
        content.style.height = height + 'px';
      }
    }, 20);
    
    setTimeout(() => {
      if(content) {
        content.style.height = 'auto';
      }
      ref.current[index].classList.remove('disable-click');
    }, duration + 20);
  }

  const closeAccordionHandler = (el: HTMLDivElement | null = null) => {
    let accEl = ref.current[index];
    let content = accBody.current;
    let arrowEl = arrow.current;

    if(el) {
      accEl = el;
      content = accEl.querySelector('.accordion__body');
      arrowEl = accEl.querySelector('.accordion__head span');
    }

    if(arrowEl) {
      arrowEl.style.transform = 'rotate(0)';
    }
    if(content) {
      content.style.height = content.offsetHeight + 'px';
    }
    accEl.classList.remove('opened');
    accEl.classList.add('disable-click');
    
    setTimeout(() => {
      if(content) {
        content.style.height = 0 + 'px';
      }
    }, 20);
    
    
    setTimeout(() => {
      if(content) {
        content.style.display = 'none';
        content.style.height = 'auto';
      }
      accEl.classList.remove('disable-click');
    }, duration + 20);
  }

  const accordionClickHandler = () => {
    if(ref.current[index].classList.contains('opened')) {
      closeAccordionHandler();
    }else{
      openAccordionHandler();
    }
  }

  return(
    <div className="accordion" ref={el => ref.current[index] = el}>
      <div className="accordion__head">
        <p onClick={accordionClickHandler}>{question}</p>
        <span ref={arrow}><IoIosArrowForward /></span>
      </div>
      <div className="accordion__body" ref={accBody}>
        <div className="accordion__body_inner">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default forwardRef<AccRef, AccordionProps>(Accordion);