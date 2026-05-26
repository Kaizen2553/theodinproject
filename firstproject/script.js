
const Library = [];


function Book(id,name,author,read){
    this.id = id;
    this.name = name;
    this.author = author;
    this.read = read;
}
function addBooktoLibrary(name,author,read){
    const id = Library.length + 1;
    const newBook = new Book(id,name,author,read);
    Library.push(newBook);
}


addBooktoLibrary("book1","author1",false);
addBooktoLibrary("book2","author2",false);
addBooktoLibrary("book3","author3",false);
addBooktoLibrary("book4","author4",false);



Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function displayBooks(){

      const table_body = document.getElementById('table-body');
      table_body.innerHTML="";
      Library.forEach((book)=>{
        const row = document.createElement('tr');
        row.innerHTML = (`
               <td>${book.id}</td>
               <td>${book.name}</td>
               <td>${book.author}</td>
               <button class="toggle-btn" data-id=${book.id}>${book.read}</button>
               <button class="remove-btn" data-id=${book.id}>delete</button>
            `)
        table_body.appendChild(row);
      })
}


function handleSubmit(){
     const name = document.getElementById('name').value;
     const author = document.getElementById('author').value;
     const read = document.getElementById('read').value;
     addBooktoLibrary(name,author,read);
}

displayBooks();
const formvis = document.getElementById('form-visible');
const form = document.getElementById('form');
form.addEventListener('click',(e)=>{
    e.stopPropagation();
});
formvis.addEventListener('click',(e)=>{
    e.stopPropagation();
    form.style.display = "block";
})
const container = document.getElementById('container');
container.addEventListener('click',()=>{
    form.style.display = "none";
})

const submit = document.getElementById('submit');
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    handleSubmit();
    displayBooks();
})

const table_body = document.getElementById('table-body');

table_body.addEventListener('click',(e)=>{
    if(e.target.classList.contains('remove-btn')){
        const id = e.target.dataset.id;

        const index = Library.findIndex(book => book.id==id);
        if(index!=-1){
            Library.splice(index,1);
        }
        displayBooks();
    }

    if(e.target.classList.contains('toggle-btn')){
        const id = e.target.dataset.id;

        const book = Library.find(book=> book.id == id);
        if(book){
            book.toggleRead();
        }
        displayBooks();
    }
})




