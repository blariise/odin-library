const my_library = [];

class Book {
  id = crypto.randomUUID();
  constructor(title, author, pages, is_readed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.is_readed = is_readed;
  }

  toggleRead = () => {
    if (this.is_readed) {
      this.is_readed = false;
    } else {
      this.is_readed = true;
    }
  }
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
    is_readed.className = "is_readed";
    is_readed.textContent = book.is_readed ? "Completed" : "Not completed";
    const toggle_is_readed = document.createElement("button");
    toggle_is_readed.className = "toggle_is_readed";
    toggle_is_readed.textContent = "Toggle";
    is_readed.appendChild(toggle_is_readed);

    card.dataset.id = book.id;

    const remove_button = document.createElement("button");
    remove_button.className = "remove_button";
    const remove_button_svg = generateDeleteButtonIcon();
    remove_button.appendChild(remove_button_svg);

    card.appendChild(remove_button);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(is_readed);

    cards_container.appendChild(card);
  });
}

function generateDeleteButtonIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", `M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,
    12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,
    8 0 0,0 12,4M16,10V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,
    17V10H16M13.5,6L14.5,7H17V9H7V7H9.5L10.5,6H13.5Z`
  );
  svg.appendChild(path);
  return svg;
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

function addBookCardButtonsListener() {
  const cards = document.querySelector(".cards");
  cards.addEventListener("click", (e) => {
    let target = e.target.closest("button");
    let book_id = e.target.closest("div").dataset.id;
    if (target !== null) {
      const card_id = target.closest(".card").dataset.id;
      if (target.className === "remove_button") {
        for (let i = 0; i < my_library.length; ++i) {
          if (my_library[i].id === card_id) {
            my_library.splice(i, 1);
            displayLibrary();
          }
        }
      }
      if (target.className === "toggle_is_readed") {
        for (const book of my_library) {
          if (book.id === card_id) {
            book.toggleRead();
            displayLibrary();
            const card = document.querySelector(`.card[data-id="${card_id}"]`);
            const is_readed = card.querySelector(".is_readed");
          }
        }
      }
    }
  });
}

addBookDialogListener();
addBookCardButtonsListener();

