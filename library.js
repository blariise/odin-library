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
  const cards_container = document.querySelector(".cards");

  while(cards_container.firstChild) {
    cards_container.removeChild(cards_container.firstChild);
  }

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

    cards_container.appendChild(card);
  });
}

function addBookDialogListener() {
  const show_dialog = document.querySelector(".open-add-book-dialog");
  const dialog = document.querySelector(".dialog-add-book");
  const close_dialog = document.querySelector(".close-button");
  const submit_dialog = document.querySelector(".dialog-submit");
  const form = document.querySelector(".dialog-form")

  show_dialog.addEventListener("click", () => {
    dialog.showModal();
  });

  close_dialog.addEventListener("click", () => {
    dialog.close();
    form.reset();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = form.querySelector("#pages").value;
    const is_readed = form.querySelector("#is-readed").value;
    const book = new Book(title, author, pages, is_readed);
    addBookToLibrary(book);
    displayLibrary();
    dialog.close();
    form.reset();
  });
  
}

addBookDialogListener();
