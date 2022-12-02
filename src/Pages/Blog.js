import React, { useState } from 'react';
import AccordionLayout from './AccordionLayout';

const Blog = () => {

  const [activeIndex, setActiveIndex] = useState(1)
  return (

    <div className='flex flex-col justify-center items-center'>
      <AccordionLayout
        title="What are the different ways to manage a state in a React application?"
        index={1}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        There are four main types of state you need to properly manage in your React apps:
        <br />

        1. Local state
        <br />
        2. Global state
        <br />
        3. Server state
        <br />
        4. URL state
      </AccordionLayout>

      <AccordionLayout
        title="How does prototypical inheritance work?"
        index={2}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is <span className='font-bold'>a method by which an object can inherit the properties and methods of another object</span>. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
      </AccordionLayout>

      <AccordionLayout
        title="What is a unit test? Why should we write unit tests?"
        index={3}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        The main objective of unit testing is <span className='font-bold'>to isolate written code to test and determine if it works as intended</span>. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
      </AccordionLayout>

      <AccordionLayout
        title="React vs. Angular vs. Vue?"
        index={4}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <span className='font-bold'>Vue provides higher customizability and hence is easier to learn than Angular or React.</span> Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
      </AccordionLayout>
    </div>
  );
};

export default Blog;