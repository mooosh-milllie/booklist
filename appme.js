class Details {
 constructor(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
 }
}



class UI {
 showBook(book) {
  let tableBody = document.getElementById('tablebody');
  let tr = document.createElement('tr');
  tr.innerHTML = `
  <td>${book.author}</td>
  <td>${book.title}</td>
  <td>${book.isbn}</td>
  <td><a href="#">X</a></td>
  `;
  tableBody.appendChild(tr);
 }

 clearInputField () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
 }

 errorHandler(classname, message) {
  let topDiv = document.getElementById('titletop');
  let lowerDiv = document.getElementById('apptitle');
  let errDiv = document.createElement('div');
  errDiv.classList = classname;
  errDiv.textContent = message;
  topDiv.insertBefore(errDiv, lowerDiv);

  setTimeout(() => {
   errDiv.remove();
  }, 3000);
 }
 deleteBook(target) {
  if (target.parentElement.parentElement.parentElement.className === 'tablebody') {
   target.parentElement.parentElement.remove();
  }
 }
}

class StoreToLS {
 static getBook(book) {
  let books;
  if (localStorage.getItem('books') === null) {
   books = [];
  } else {
   books = JSON.parse(localStorage.getItem('books'))
  }
  return books;
  
 }
 static addBook(book) {
  let books = StoreToLS.getBook(book);

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
 }

 static showBookLS(book) {
  let books = StoreToLS.getBook(book);
  let ui = new UI();
  
  books.forEach(book => {
   ui.showBook(book);
  });

 }

 static removeBook(isbn) {
  let books = StoreToLS.getBook();
  books.forEach((book, index) => {
   if ( book.isbn === isbn) {
    books.splice(index, 1);
   }
   
  })
  localStorage.setItem('books', JSON.stringify(books))
 }
}

document.getElementById('form').addEventListener('submit', function updateBook(e) {
 let title = document.getElementById('title').value;
 let author = document.getElementById('author').value;
 let isbn = document.getElementById('isbn').value;

 const book = new Details(title, author, isbn);

 const ui = new UI();
 if (title === '' || author === '' || isbn === '') {
  ui.errorHandler('alert alert-error', 'please complete the fields');
 } else {
  ui.errorHandler('alert success', 'Book Added Successfully');
  ui.showBook(book);
  StoreToLS.addBook(book);

  ui.clearInputField();
 }
 
 
       

 e.preventDefault();
})

document.getElementById('tablebody').addEventListener('click', function (e) {
 let ui = new UI();

 let isbn = e.target.parentElement.previousElementSibling.textContent
 if (confirm('are you sure')) {
  ui.deleteBook(e.target);
  StoreToLS.removeBook(isbn);
  ui.errorHandler('alert success', 'Book Deleted Successfully');
 }

 e.preventDefault();
})

document.addEventListener('DOMContentLoaded', StoreToLS.showBookLS());