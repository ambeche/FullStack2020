import React from 'react'

const Person = ({name, capitalizeName}) => <div> {capitalizeName(name)} </div>

const Persons = ({persons, capitalizeName}) => {
    return (
        <div>
             {persons.map((p) => (
        <Person key={p.name} name={p.name} capitalizeName={capitalizeName} />
      ))}
        </div>
    )
}

export default Persons;