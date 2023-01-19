const select = {
  templateOf: {
    book: '#template-book',
  },
  booksPanel: {
    list: '.books-list',
  },
};
const templates = {
  templateBook: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

const favoriteBooks = [];

function renderBooks() {
  const list = document.querySelector(select.booksPanel.list);
  for (const book of dataSource.books) {
    // create obj for name, price, rating, image, id
    const bookData = {
      id: book.id,
      name: book.name,
      price: book.price,
      rating: book.rating,
      image: book.image,
    };
    // generate html of the book
    const generatedHTML = templates.templateBook(bookData);
    // create element using utils.createElementFromHTML
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    // append to list
    list.appendChild(generatedDOM);
  }
}

function addToFavorites(bookCover) {
  const bookId = bookCover.getAttribute('data-id');
  if (!bookCover.classList.contains('favorite')) {
    bookCover.classList.add('favorite');
    favoriteBooks.push(bookId);
  } else {
    bookCover.classList.remove('favorite');
    const index = favoriteBooks.indexOf(bookId);
    favoriteBooks.splice(index, 1);
  }
}

function initActions() {
  const list = document.querySelector(select.booksPanel.list);
  // add event, no for loop for links in list attempt
  list.addEventListener('dblclick', function (event) {
    event.preventDefault();
    // get element link
    const bookCover = event.target.parentNode.parentNode;
    // check if clicked element is book grandparent node of img: link have unique data-id
    if (bookCover.getAttribute('data-id')) {
      // add link
      addToFavorites(bookCover);
    }
  });
}

renderBooks();
initActions();
