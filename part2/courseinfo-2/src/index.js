import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
  return (
    <div>
      <h1> {name} </h1>
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

const Content = ({parts}) => {
  return (
    <div>
       {parts.map( part => 
         <Part key={part.id} part={part.name} exercises={part.exercises}/>
       )}
    </div>
  )
}


const Total = ({total}) => {
  return (
    <div>
      <p> Number of exercises {total} </p>
    </div>
  )
}

const Course = ({course}) => {

  const total = course.parts.reduce( (sum, p) => sum + p.exercises,0)

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total total={total}/>
    </div>
  )

}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
