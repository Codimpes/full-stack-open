import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1, phone: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  };
const addPerson = (event) => {
  event.preventDefault();
  const existingNames = new Set(persons.map((person) => person.name));
  if (existingNames.has(newName)) {
    alert(`${newName} is already added to phonebook`);
    return;
  }
  const existingPhones = new Set(persons.map((person) => person.phone));
  if (existingPhones.has(newPhone)) {
    const namePerson = persons.find((person) => person.phone === newPhone)?.name
    alert(`${namePerson} is already has this phone number.`);
    return;
  }
  const existingIds = new Set(persons.map((person) => person.id));
  let id = 1;
  while (existingIds.has(id)) {
    id++;
  }
  const personItem = { name: newName, id, phone: newPhone };
  setPersons(persons.concat(personItem));
  setNewName("");
  setNewPhone("");
};

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name} {person.phone}</p>
      ))}
    </div>
  );
};

export default App;
