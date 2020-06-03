import React from "react";

const Header = ({ name }) => {
  return (
    <div>
      <h1> {name} </h1>
    </div>
  );
};

const Part = ({ part, exercises }) => {
  console.log(`part: ${part}\nexercises: ${exercises}`);
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ total }) => {
  return (
    <div>
      <strong> Total of {total} exercises </strong>
    </div>
  );
};

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, p) => sum + p.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
