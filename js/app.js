let employees = [];
const urlAPI = `https://fsjs-public-api-backup.herokuapp.com/api`;
const gridContainer = document.querySelector(".gridContainer");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

/* ===================================================== */
/*              Getting Info From API                    */
/* ===================================================== */
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

/* ===================================================== */
/*                  Displaying Info                      */
/* ===================================================== */
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
              `;
  });

  gridContainer.innerHTML = employeeHTML;

};
