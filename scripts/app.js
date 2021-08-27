const tbody = document.querySelector('tbody');
const addNewBook = document.querySelector('#add');
const form = document.querySelector('#form');
const formValid = document.querySelector('#form-validation');

let myLibrary = [];

class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

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

