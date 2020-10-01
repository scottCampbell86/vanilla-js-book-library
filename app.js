//Cheater helpers
const qs = (input) => document.querySelector(input);
const createE = (input) => document.createElement(input);

//Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class
class UI {

  addBookToList(book) {
    const list = qs('#book-list');
    const row = createE('tr');
  
    row.innerHTML = 
     `<td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class='delete'>X</a></td>`
     ;
  
     list.appendChild(row);
  }

  showAlert(message, className) {
    const div = createE('div');

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
  
    const containter = qs('.container');
    const form = qs('#book-form');
  
    containter.insertBefore(div, form);
  
    setTimeout(() => {
      qs('.alert').remove();
    }, 2250);

  }

  deleteBook(target) {
    target.className === 'delete' && target.parentElement.parentElement.remove();
  }

  clearFields() {
    qs('#title').value = '';
    qs('#author').value = '';
    qs('#isbn').value = '';
  }
}

//Local Storage Class
class Storage {

    //render book to DOM
  static displayBooks() {
    const books = Storage.getBooks();

    books.forEach(book => {
      const ui = new UI();

      ui.addBookToList(book);
    })
  };

    //get books from local storage
  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) books = [];
    else books = JSON.parse(localStorage.getItem('books'));

    return books;
  };

    //add a book to local storage
  static addBook(book) {
    const books = Storage.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  };

    //delete book from local storage
  static removeBook(isbn) {
    let books = Storage.getBooks();

    books = books.filter(book => book.isbn !== isbn);

    localStorage.setItem('books', JSON.stringify(books));
  };
}


//DOM Load Event
document.addEventListener('DOMContentLoaded', Storage.displayBooks);

//Event Listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

    //grab input values from form
  const title = qs('#title').value;
  const author = qs('#author').value;
  const isbn = qs('#isbn').value;

    //instantiate classes
  const book = new Book(title, author, isbn);
  const ui = new UI();

    //validate user's input 
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
    ui.clearFields();
    return;
  }
  
    //add book to list
  ui.addBookToList(book);

    //add to local storage
  Storage.addBook(book);

    //alert success
  ui.showAlert('Book added', 'success');

    //clear field
  ui.clearFields()

})

qs('#book-list').addEventListener('click', (e) => {
  e.preventDefault();

  const ui = new UI();
  ui.deleteBook(e.target);
  
    //delete from local storage
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book removed', 'success');

})