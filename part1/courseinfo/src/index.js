import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
    <div>
      <h1> {course.name} </h1>
    </div>
  )
}

const Part = ({part, exercises}) => {
  console.log(`part: ${part}\nexercises: ${exercises}`  )
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  const [part1, part2, part3] = props.parts
  console.log(part1, part2, part3)
  return (
    <div>
      <Part part={part1.name} exercises={part1.exercises}/>
      <Part part={part2.name} exercises={part2.exercises}/>
      <Part part={part3.name} exercises={part3.exercises}/>
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
      <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content  parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
