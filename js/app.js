let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".gridContainer");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let openModal;

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
    <div class="arrow-container">
      <button class="leftArrow"><</button>
      <button class="rightArrow"">></button>
     </div>
    </div>
  `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
                      /* ======== */
                      /*  Switch  */
                      /* ======== */
  const arrowContainer = document.querySelector('.arrow-container');

  arrowContainer.addEventListener('click', e => {
    let currentIndex = openModal;
    if (e.target.className == "rightArrow" && currentIndex < 11 ) {
      openModal ++;
      displayModal(openModal);
    } else if (e.target.className == "leftArrow" && currentIndex > 0) {
      openModal --;
      displayModal(openModal);
    } 
  })  
};

/* ======================================================= */
/*                   Event Listener                        */
/* ======================================================= */
gridContainer.addEventListener('click', e => {
  const card = e.target.closest(".card");
  const index = card.getAttribute('data-index');
  openModal = index;
  if(e.target !== gridContainer) {
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
  let filterValue = inputLog.value.toLowerCase().trim("");
  const names = document.querySelectorAll('.name');

  for (let i = 0; i < names.length; i++) {
    let users = names[i].innerHTML.toLowerCase();
    let filter = users.includes(filterValue);
  if (filter === true) {
    names[i].closest('.card').style.display = "flex";
  } else {
    names[i].closest('.card').style.display = "none";
  }
 }
};
