//Helpers
const qs = (input) => document.querySelector(input);
const createE = (input) => document.createElement(input);

//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {};


  //show alert
UI.prototype.showAlert = (message, className) => {
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


  //delete book
UI.prototype.deleteBook = target => target.className === 'delete' && target.parentElement.parentElement.remove();

  //UI method to clear input fields
UI.prototype.clearFields = () => {
  qs('#title').value = '';
  qs('#author').value = '';
  qs('#isbn').value = '';
}

  //UI class method to add book to list
UI.prototype.addBookToList = book => {

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

//Event Listeners

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

    //grab form values
  const title = qs('#title').value;
        author = qs('#author').value;
        isbn = qs('#isbn').value;

    //instantiate new Book class
  const book = new Book(title, author, isbn);

    //instantiate instance of UI
  const ui = new UI();

    //validate
      //if fails
  if (title === '' || author === '' || isbn === '') ui.showAlert('Please fill in all fields', 'error');
      //if passes
  else {
      //add book to list
    ui.addBookToList(book);
      //alert success
    ui.showAlert('Book added', 'success')
      //clear field
    ui.clearFields()
  }
})

//remove book from DOM
qs('#book-list').addEventListener('click', (e) => {
  e.preventDefault();

  console.log('heard');

  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book removed', 'success');

})

