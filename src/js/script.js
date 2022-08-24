{
  'use strict';
  const select = {
    templateOf: {
      books: '#template-book',
    },

    listOf: {
      bookList: '.books-list',
    },

    containerOf: {
      image: '.book__image',
    },

    imageParams: {
      id: '.book-id',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  let favoriteBooks = [];

  function render() {
    for(let book of dataSource.books) {
      const generatedHTML = templates.bookTemplate(book);
      const bookDOMElement = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.listOf.bookList);
      bookListContainer.appendChild(bookDOMElement);
    }
  }

  render();
  initActions();

  function initActions() {
    const imageContainer = document.querySelector(select.listOf.bookList);
    imageContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image')) {
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)) {
          favoriteBooks.push(bookId);
          event.target.offsetParent.classList.add('favorite');
        } else {
          const indexOfbookId = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfbookId, 1);
          event.target.offsetParent.classList.remove('favorite');
        }
      }
    });

  }
}