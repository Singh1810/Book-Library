let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// GET BOOKS FROM LOCAL STORAGE
if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}


//write the logic to show how many books are read, how many books are unread and total books.
function showLibraryInfo() {
  const booksRead = document.querySelector('#books-read');
  const booksUnread = document.querySelector('#books-unread');
  const totalBooks = document.querySelector('#total-books');
  let readCounter = 0;
  let unreadCounter = 0;
  booksRead.textContent = 0;
  booksUnread.textContent = 0;
  
  //add your code here
  for(let i= 0; i< myLibrary.length; i+=1)
  {
    if (myLibrary[i].status === true)
    {
      readCounter += 1;
      booksRead.textContent = readCounter;
    }
    else if (myLibrary[i].status === false)
    {
      unreadCounter += 1;
      booksUnread.textContent = unreadCounter;
    }
  }
  totalBooks.textContent = myLibrary.length;
}


function showBooksInLibrary() {
  // add code for  SAVE TO LOCAL STORAGE

  localStorage.setItem("books",JSON.stringify(myLibrary));
  showLibraryInfo();
  var allBooks = document.querySelector("#table-body");
  allBooks.textContent = "";
 
  for (let i = 0; i < myLibrary.length; i += 1) 
  {
    var bookRow = document.createElement('tr');
    bookRow.classList.add("book-info");
    allBooks.appendChild(bookRow);

    //add code for BOOK TITLE
    var bookTitle = document.createElement('td');
    bookTitle.textContent = myLibrary[i].title;
    bookRow.appendChild(bookTitle);
    
    
    // add code for BOOK AUTHOR
    var bookAuthor = document.createElement('td');
    bookAuthor.textContent = myLibrary[i].author;
    bookRow.appendChild(bookAuthor);
  
    // add code for BOOK PAGES
    var bookPages = document.createElement('td');
    bookPages.textContent=myLibrary[i].pages;
    bookRow.appendChild(bookPages);

    // add code for  BOOK STATUS BUTTON
    var bookStatus = document.createElement('td');
    var statusSymbol = document.createElement('i');

    if(myLibrary[i].status === false)
    {
      statusSymbol.classList.add('fas','fa-times');
    }
    else
    {
      statusSymbol.classList.add('fas','fa-check');
    }
    bookStatus.appendChild(statusSymbol);
    bookRow.appendChild(bookStatus);
    
    // add code for BOOK REMOVAL BUTTON
    var bookRemove = document.createElement('td');
    var deleteSymbol = document.createElement('i');
    deleteSymbol.classList.add('fas','fa-trash-alt');
    bookRemove.appendChild(deleteSymbol);
    bookRow.appendChild(bookRemove);
  }
}

//add book to library
function addBookToLibrary(title, author, pages, status) {
  var book = new Book(title, author, pages, status);
  myLibrary.push(book);
  showBooksInLibrary();
}

// FORM VALIDATION
function validateForm(event) {
// add your code for form validatin and call addBookToLibrary() also reset the form after a book is added
  event.preventDefault();
  const form = document.querySelector('form');
  const titleInput = document.querySelector('#title');
  const titleErr = document.querySelector('.title');
  const nameInput = document.querySelector('#name');
  const nameErr = document.querySelector('.name');
  const numberInput = document.querySelector('#number');
  const numberErr = document.querySelector('.number');
  const checkbox = document.querySelector('input[name="checkbox"]');
  if (titleInput.value === '') {
    titleErr.style.display = 'block';
  } else {
    titleErr.style.display = 'none';
  }
  if (nameInput.value === '') {
    nameErr.style.display = 'block';
  } else {
    nameErr.style.display = 'none';
  }
  if (numberInput.value === '' || numberInput.value.match(/[^1-9]/) || numberInput.value <= 0) {
    numberErr.style.display = 'block';
  } else {
    numberErr.style.display = 'none';
  }
  if (titleInput.value !== '' && nameInput.value !== '' && numberInput.value !== '' && numberInput.value > 0) {
    if (checkbox.checked) {
      addBookToLibrary(titleInput.value, nameInput.value, numberInput.value, true);
    } else {
      addBookToLibrary(titleInput.value, nameInput.value, numberInput.value, false);
    }
    form.reset();
  }
}


// MODAL/POP-UP FOR BOOKS REMOVAL
function manipulateModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
  modal.addEventListener('click', (event) => {
    const { target } = event;
    if (target.classList.contains('close')) {
      modal.style.display = 'none';
    } else if (target.classList.contains('confirm-removal')) {
      myLibrary = [];
      modal.style.display = 'none';
    }
  });
}

//create click listeners  document.addEventListener('click', {}) for the following id's: // 'add-book' // 'delete-all-btn' // 'fa-trash-alt' // 'fa-check'// 'fa-times'

function listenClicks() {
  document.addEventListener('click', (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === 'add-book') {
      validateForm(event);
    } else if (target.id === 'delete-all-btn') {
      manipulateModal();
    } else if (target.classList.contains('fa-trash-alt')) {
      myLibrary.splice(tr, 1);
    } else if (target.classList.contains('fa-check')) {
      target.classList.remove('fa-check');
      target.classList.add('fa-times');
      myLibrary[tr].status = false;
    } else if (target.classList.contains('fa-times')) {
      target.classList.remove('fa-times');
      target.classList.add('fa-check');
      myLibrary[tr].status = true;
    }
    showBooksInLibrary();
  });
}

showBooksInLibrary();
listenClicks();
