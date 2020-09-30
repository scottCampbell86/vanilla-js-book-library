//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {};

UI.prototype.addBookToList = book => console.log(book)
//Event Listeners

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //grab form values
  const title = document.getElementById('title').value;
        author = document.getElementById('author').value;
        isbn = document.getElementById('isbn').value;

  console.log(title, author, isbn);

  //Instantiate new Book class
  const book = new Book(title, author, isbn);

  //Instantiate instance of UI
  const ui = new UI();

  //Add book to list
  ui.addBookToList(book);

})

