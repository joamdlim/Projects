const myTable = document.getElementById('myTable').getElementsByTagName('tbody')[0];
const namefield = document.getElementById('name');
const yearfield = document.getElementById('year');
const coursefield = document.getElementById('course');
const genderfield = document.getElementById('gender');
const gradefield = document.getElementById('grade');

let persons = localStorage.getItem('data');
persons = JSON.parse(persons) || [];

function queryPersons(query = "") {
  myTable.innerHTML = "";

  let totalGrade = 0;
  let count = 0;

  for (let person of persons) {
    if (!person.name.includes(query)) continue;

    const row = myTable.insertRow(-1);
    const col1 = row.insertCell(-1);
    const col2 = row.insertCell(-1);
    const col3 = row.insertCell(-1);
    const col4 = row.insertCell(-1);
    const col5 = row.insertCell(-1);
    const col6 = row.insertCell(-1);

    col1.innerHTML = person.name;
    col2.innerHTML = person.year;
    col3.innerHTML = person.course;
    col4.innerHTML = person.gender;
    col5.innerHTML = person.grade;
    col6.innerHTML = '<button class="btn red darken-2 deletePerson" onclick="deletePerson(this)">Delete</button>';

    totalGrade += parseInt(person.grade);
    count++;
  }

  if (count > 0) {
    const avgGrade = totalGrade / count;
    const row = myTable.insertRow(-1);
    const col1 = row.insertCell(-1);
    const col2 = row.insertCell(-1);
    const col3 = row.insertCell(-1);
    const col4 = row.insertCell(-1);
    const col5 = row.insertCell(-1);
    const col6 = row.insertCell(-1);

    col1.innerHTML = "Average";
    col2.innerHTML = "";
    col3.innerHTML = "";
    col4.innerHTML = "";
    col5.innerHTML = avgGrade.toFixed(2);
    col6.innerHTML = "";
  }
}

function initializePersons() {
  queryPersons();
}

function onChange() {
  const query = namefield.value;
  queryPersons(query);
}

function addPerson() {
  const name = namefield.value;
  const year = yearfield.value;
  const course = coursefield.value;
  const gender = genderfield.value;
  const grade = gradefield.value;

  if (name === "" || year === "" || course === "" || gender === "" || grade === "") {
    alert("all of the fields are required to fill.");
    return;
  }

  if (isNaN(grade)) {
    alert("grade must be a number.");
    return;
  }

  persons.push({
    name: name,
    year: year,
    course: course,
    gender: gender,
    grade: grade,
  });

  initializePersons();
  localStorage.setItem('data', JSON.stringify(persons));
}

function deletePerson(button) {
    const row = button.parentNode.parentNode;
    const name = row.cells[0].textContent;

    persons = persons.filter((person) => {
      return person.name != name;
    });
  
    initializePersons();
    localStorage.setItem('data', JSON.stringify(persons));
  }
  


