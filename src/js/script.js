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

    filtersOf: {
      form: '.filters',
    }
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBooksList = this;
      thisBooksList.imageContainer = document.querySelector(select.listOf.bookList);
      thisBooksList.filter = document.querySelector(select.filtersOf.form);
      thisBooksList.bookListContainer = document.querySelector(select.listOf.bookList);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render() {
      const thisBooksList = this;
      for(const book of thisBooksList.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;
        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;
        const generatedHTML = templates.bookTemplate(book);
        thisBooksList.bookDOMElement = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.bookListContainer.appendChild(thisBooksList.bookDOMElement);
      }
    }

    initActions() {
      const thisBooksList = this;
      thisBooksList.imageContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
        if(event.target.offsetParent.classList.contains('book__image')) {
          const bookId = event.target.offsetParent.getAttribute('data-id');
          if(!thisBooksList.favoriteBooks.includes(bookId)) {
            thisBooksList.favoriteBooks.push(bookId);
            event.target.offsetParent.classList.add('favorite');
          } else {
            const indexOfbookId = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(indexOfbookId, 1);
            event.target.offsetParent.classList.remove('favorite');
          }
        }
      });

      thisBooksList.filter.addEventListener('click', function(event){
        const filterValue = event.target.value;
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          if(event.target.checked) {
            thisBooksList.filters.push(filterValue);
          } else {
            const indexOfFilters = thisBooksList.filters.indexOf(filterValue);
            thisBooksList.filters.splice(indexOfFilters, 1);
            event.target.offsetParent.classList.remove('filterValue');
          }
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;
      for(const book of thisBooksList.data) {
        thisBooksList.bookItem = document.querySelector('.book__image[data-id="'+book.id+'"]');
        let shouldBeHidden = false;
        for(const filter of thisBooksList.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if(shouldBeHidden == true){
          thisBooksList.bookItem.classList.add('hidden');
        } else {
          thisBooksList.bookItem.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';
      if(rating < 6){
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
      return background;
    }
  }
  const app = new BooksList();
  app();
}