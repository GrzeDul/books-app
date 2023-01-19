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

renderBooks();
