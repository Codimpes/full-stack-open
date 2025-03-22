import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
const addPerson = (event) => {
  event.preventDefault();
  const existingNames = new Set(persons.map((person) => person.name));
  if (existingNames.has(newName)) {
    alert(`${newName} is already added to phonebook`);
    return;
  }
  const existingIds = new Set(persons.map((person) => person.id));
  let id = 1;
  while (existingIds.has(id)) {
    id++;
  }
  const personItem = { name: newName, id };
  setPersons(persons.concat(personItem));
  setNewName("");
};

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.id}>{person.name}</p>)}
    </div>
  );
};

export default App;
