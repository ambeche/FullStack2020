import React from "react";

const Person = ({ name, number, capitalizeName, handleDelete }) => {
  return (
    <div>
      {capitalizeName(name)} {number}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

const Persons = ({ lstToDisplay, capitalizeName, handleDelete }) => {
  return (
    <div>
      {lstToDisplay.map((p) => (
        <Person
          key={p.name}
          name={p.name}
          number={p.number}
          capitalizeName={capitalizeName}
          handleDelete={handleDelete(p.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
