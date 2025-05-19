const my_library = [];

function Book(title, author, pages, is_readed) {
  if (!new.target)
    throw Error("You have to create object with new keyword");
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.is_readed = is_readed;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
  my_library.push(book);
}

function displayLibrary() {
  const cards = document.querySelector(".cards");
  my_library.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = book.title;

    const author = document.createElement("div");
    author.className = "author";
    author.textContent = book.author;

    const pages = document.createElement("div");
    pages.className = "pages";
    pages.textContent = book.pages;

    const is_readed = document.createElement("div");
    is_readed.className = book.is_readed;
    is_readed.textContent = book.is_readed ? "Completed" : "Not completed";

    const id = document.createElement("div");
    id.className = "id";
    id.textContent = book.id;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(is_readed);
    card.appendChild(id);

    cards.appendChild(card);
  });
}

const book1 = new Book("Harry Potter", "J. K. Rowling", 254, false);

addBookToLibrary(book1);

displayLibrary();

