const select = {
  templateOf: {
    book: '#template-book',
  },
  booksPanel: {
    list: '.books-list',
  },
  filters: '.filters',
};

const templates = {
  templateBook: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

const favoriteBooks = [];
const filters = [];
const list = document.querySelector(select.booksPanel.list);

function renderBooks() {
  for (const book of dataSource.books) {
    // generate rating style
    let color;
    if (book.rating < 6) {
      color = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (book.rating >= 6 && book.rating <= 8) {
      color = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (book.rating > 8 && book.rating < 9) {
      color = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else {
      color = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    const ratingStyle = `width:${book.rating * 10}%;background:${color};`;
    // create obj for name, price, rating, image, id
    const bookData = {
      id: book.id,
      name: book.name,
      price: book.price,
      rating: book.rating,
      image: book.image,
      ratingStyle: ratingStyle,
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
  const filtersWrapper = document.querySelector(select.filters);

  list.addEventListener('dblclick', function (event) {
    event.preventDefault();
    // get element link
    const bookLink = event.target.offsetParent;
    // check if clicked element closest parent link have unique class
    if (bookLink.classList.contains('book__image')) {
      // add link
      addToFavorites(bookLink);
    }
  });

  filtersWrapper.addEventListener('click', function (event) {
    if (event.target.name === 'filter') {
      if (event.target.checked === true) {
        filters.push(event.target.value);
      } else {
        const index = filters.indexOf(event.target.value);
        filters.splice(index, 1);
      }
    }
    filterBooks();
  });
}

function filterBooks() {
  for (const book of dataSource.books) {
    const bookCover = list.querySelector(`a[data-id="${book.id}"]`);
    let isVisible = true;
    for (const filter of filters) {
      isVisible = isVisible && book.details[filter];
    }
    if (isVisible) {
      bookCover.classList.remove('hidden');
    } else {
      bookCover.classList.add('hidden');
    }
  }
}

renderBooks();
initActions();
