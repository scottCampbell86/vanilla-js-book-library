//helpers
const qs = (input) => document.querySelector(input);
const createE = (input) => document.createElement(input);

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
  //create var for book list
  const list = qs('#book-list');

  //create tr element
  const row = createE('tr');

  row.innerHTML = 
   `<td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class='delete>X</a></td>`
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

  console.log(title, author, isbn);

  //Instantiate new Book class
  const book = new Book(title, author, isbn);

  //Instantiate instance of UI
  const ui = new UI();

  //Add book to list
  ui.addBookToList(book);

})

