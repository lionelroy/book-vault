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
  // get myLibrary from localstorage and assign it to myLibrary array
  myLibrary = JSON.parse(localStorage.getItem('myLib'))
  // empty the table body to avoid any problem
  tbody.innerHTML = ''
  // loop through the array and create the table elements 
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

// Add a Book object to myLibrary array 
function addBookToLibrary() {
    // generate an id for a new book
    const id = myLibrary.length === 0 ? 1 : myLibrary[myLibrary.length - 1].id + 1;
    // Capture form fields
    const author = document.querySelector('#author').value;
    const title = document.querySelector('#title').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    // ensure that form fields is not empty
    if (author === '' || title === '' || pages === '' || pages == 0) {
        formValid.style.display = 'block'
        setTimeout(() => {
            formValid.style.display = 'none'
        }, 3000)
        return;
    }
    // create new instance from Book constructor
    const book = new Book(id, title, author, pages, read)
    // clear form fields
    form.reset();
    myLibrary.push(book)
    // Save myLibrary array in the browser local storage
    localStorage.setItem('myLib', JSON.stringify(myLibrary))
     displayBooks()
}

// remove an item from myLibrary array
function removeItem(items) {
    items.forEach(element => element.addEventListener('click', (e) => {
        const item = e.target.parentElement.parentElement;
        const id = item.querySelector('td').innerHTML;
        myLibrary = myLibrary.filter(item => item.id !== parseInt(id))
        localStorage.setItem('myLib', JSON.stringify(myLibrary))
        item.remove()
    }))
}

if (localStorage.getItem('myLib') === null) {
  // array to hold book objects
  localStorage.setItem('myLib', JSON.stringify(myLibrary));
}else{
  myLibrary = JSON.parse(localStorage.getItem('myLib'))
}

addNewBook.addEventListener('click', addBookToLibrary)

displayBooks()