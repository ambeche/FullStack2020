import React from "react";

const PersonForm = ({ handlers }) => {
  const [addPerson, handleNameChange, handleNumberChange, newName, newNumber] = handlers;
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
            number: <input  value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
