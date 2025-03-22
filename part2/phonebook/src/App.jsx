import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };
  const addPerson = (event) => {
    event.preventDefault();
    const existingNames = new Set(persons.map((person) => person.name));
    if (existingNames.has(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const existingPhones = new Set(persons.map((person) => person.number));
    if (existingPhones.has(newNumber)) {
      const namePerson = persons.find((person) => person.number === newNumber)?.name
      alert(`${namePerson} is already has this number.`);
      return;
    }
    const existingIds = new Set(persons.map((person) => person.id));
    let id = 1;
    while (existingIds.has(id)) {
      id++;
    }
    const personItem = { name: newName, id, number: newNumber };
    setPersons(persons.concat(personItem));
    setNewName("");
    setNewNumber("");
  };
  const personsShow = filter
  ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons
  return (
    <div>
      <h2>Phonebook</h2>
        <input value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
