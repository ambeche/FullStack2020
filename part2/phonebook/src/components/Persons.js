import React from 'react'

const Person = ({name, number, capitalizeName}) => <div> {capitalizeName(name)}   {number}</div>

const Persons = ({lstToDisplay, capitalizeName}) => {
    return (
        <div>
             {lstToDisplay.map((p) => (
        <Person key={p.name} name={p.name} number={p.number} capitalizeName={capitalizeName} />
      ))}
        </div>
    )
}

export default Persons;