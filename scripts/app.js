const tbody = document.querySelector('tbody');
const addNewBook = document.querySelector('#add');
const form = document.querySelector('#form');
const formValid = document.querySelector('#form-validation');

let myLibrary = [];



// Book constructor
function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// read myLibrary array object and display it in a table
function displayBooks() {
 
  // empty the table body to avoid any problem
  tbody.innerHTML = ''
  // loop through the array and create the table elements on the fly
  myLibrary.forEach(i => {
      const tr = document.createElement('tr')
      const th = document.createElement('th')
      Object.values(i).forEach(item => {
          const td = document.createElement('td')
          if (item === false) {
              td.innerHTML = '<i class="fas fa-times state" style="cursor:pointer"></i>';
          } else if (item === true) {
              td.innerHTML = '<i class="fas fa-check state" style="color:green" style="cursor:pointer"></i>'
          } else {
              td.innerHTML = item
          }
          tr.appendChild(td);
      })
      const td = document.createElement('td')
      td.innerHTML = '<i class="fas fa-trash-alt remove" style="color:red" style="cursor:pointer"></i>'
      tr.appendChild(td);
      tbody.appendChild(tr)
  })
  if (myLibrary.length > 0) {
      const rems = document.querySelectorAll('.remove');
      const status = document.querySelectorAll('.state');
      removeItem(rems);
      toggleRead(status);
  }
}

addNewBook.addEventListener('click', addBookToLibrary)

displayBooks()