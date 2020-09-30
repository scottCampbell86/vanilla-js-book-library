const qs = (input) => document.querySelector(input)
//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {};

//UI class method to add book to list
UI.prototype.addBookToList = book => {
  const line = qs('#book-list');
}



//Event Listeners

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //grab form values
  const title = qs('#title').value;
        author = qs('#author').value;
        isbn = qs('#isbn').value;

  console.log(title, author, isbn);

  //Instantiate new Book class
  const book = new Book(title, author, isbn);

  //Instantiate instance of UI
  const ui = new UI();

  //Add book to list
  ui.addBookToList(book);

})

