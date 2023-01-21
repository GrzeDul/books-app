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

class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];

    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.renderBooks();
    thisBooksList.initActions();
  }

  initData() {
    const thisBooksList = this;
    thisBooksList.booksData = dataSource.books;
  }

  renderBooks() {
    const thisBooksList = this;
    for (const book of thisBooksList.booksData) {
      // create obj for name, price, rating, image, id
      const bookData = {
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
        ratingWidth: book.rating * 10,
        ratingBgc: thisBooksList.determineRatingBgc(book.rating),
      };
      // generate html of the book
      const generatedHTML = templates.templateBook(bookData);
      // create element using utils.createElementFromHTML
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      // append to list
      thisBooksList.list.appendChild(generatedDOM);
    }
  }

  getElements() {
    const thisBooksList = this;
    thisBooksList.list = document.querySelector(select.booksPanel.list);
    thisBooksList.filtersWrapper = document.querySelector(select.filters);
  }

  determineRatingBgc(rating) {
    let bgc;
    if (rating < 6) {
      bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating >= 6 && rating <= 8) {
      bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (rating > 8 && rating < 9) {
      bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else {
      bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return bgc;
  }

  filterBooks() {
    const thisBooksList = this;
    for (const book of thisBooksList.booksData) {
      const bookCover = thisBooksList.list.querySelector(
        `a[data-id="${book.id}"]`
      );
      let isVisible = true;
      for (const filter of thisBooksList.filters) {
        isVisible = isVisible && book.details[filter];
      }
      if (isVisible) {
        bookCover.classList.remove('hidden');
      } else {
        bookCover.classList.add('hidden');
      }
    }
  }

  initActions() {
    const thisBooksList = this;

    thisBooksList.list.addEventListener('dblclick', function (event) {
      event.preventDefault();
      // get element link
      const bookLink = event.target.offsetParent;
      // check if clicked element closest parent link have unique class
      if (bookLink.classList.contains('book__image')) {
        // add link
        thisBooksList.addToFavorites(bookLink);
      }
    });

    thisBooksList.filtersWrapper.addEventListener('click', function (event) {
      if (event.target.name === 'filter') {
        if (event.target.checked === true) {
          thisBooksList.filters.push(event.target.value);
        } else {
          const index = thisBooksList.filters.indexOf(event.target.value);
          thisBooksList.filters.splice(index, 1);
        }
      }
      thisBooksList.filterBooks();
    });
  }

  addToFavorites(bookCover) {
    const thisBooksList = this;
    const bookId = bookCover.getAttribute('data-id');
    if (!bookCover.classList.contains('favorite')) {
      bookCover.classList.add('favorite');
      thisBooksList.favoriteBooks.push(bookId);
    } else {
      bookCover.classList.remove('favorite');
      const index = thisBooksList.favoriteBooks.indexOf(bookId);
      thisBooksList.favoriteBooks.splice(index, 1);
    }
  }
}

const app = {
  init: function () {
    return new BooksList();
  },
};
app.init();
