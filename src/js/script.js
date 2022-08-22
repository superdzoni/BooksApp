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
  const favoriteBooks = {};

  function render() {
    for(let book of dataSource.books){
      const generatedHTML = templates.bookTemplate(book);
      const bookDOMElement = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.listOf.bookList);
      bookListContainer.appendChild(bookDOMElement);
    }
  }

  render();
  initActions();

  function initActions() {
  //* add reference to elements book-image in book-list *//
    const imageContainer = document.querySelectorAll(select.containerOf.image);
    //* loop for of *//
    for( const image of imageContainer){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = this;
        clickedElement.classList.add('favorite');
        const bookId = clickedElement.getAttribute('data-id');
        favoriteBooks.push(bookId);
      });
    }
  }
}