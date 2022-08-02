let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".gridContainer");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

/* ======================================================= */
/*                Getting Info From API                    */
/* ======================================================= */
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

/* ======================================================= */
/*                   Displaying Info                       */
/* ======================================================= */
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = "";
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture.large;

    employeeHTML += `
      <div class="card" data-index="${index}">
            <img class="avatar" src="${picture}" alt=""> 
        <div class="textContainer">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
      </div>
              `
  })
    gridContainer.innerHTML = employeeHTML;
    let [] = employees;
};

/* ======================================================= */
/*                         Modal                           */
/* ======================================================= */
function displayModal(index) {
  let { name, dob, phone, email, location: {city, street, state, postcode }, picture } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
    <hr />
      <p>${phone}</p>
      <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

/* ======================================================= */
/*                   Event Listener                        */
/* ======================================================= */
gridContainer.addEventListener('click', e => {
  if(e.target !== gridContainer) {
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

/* ======================================================= */
/*                      Close Modal                        */
/* ======================================================= */
modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden')
});

/* ======================================================= */
/*                     Employee Filter                     */
/* ======================================================= */
let inputLog = document.getElementById('employee-search');
inputLog.addEventListener('keyup', filterNames)

function filterNames () {
  let filterValue = inputLog.value.toLowerCase();
  const names = document.querySelectorAll('.name');
  console.log(names[0]);
};

filterNames();

// for (let i = 0; i < names.length; i++) {
//   let captions = names[i]; }
