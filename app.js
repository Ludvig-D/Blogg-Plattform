const makeBtn = document.querySelector('.makeBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const submitBtn = document.querySelector('#submitBtn');

const formContainer = document.querySelector('.formContainer');
const postContainer = document.querySelector('.postContainer');

const postForm = document.querySelector('.postForm').children[1];

function toggleForm() {
  formContainer.classList.toggle('hidden');
}

makeBtn.addEventListener('click', () => {
  toggleForm();
});

cancelBtn.addEventListener('click', () => {
  toggleForm();
});

function createPost() {
  const title = postForm[0].value;
  const username = postForm[1].value;
  const text = postForm[2].value;

  const date = new Date();
  const postDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  console.log(postDate);

  console.log('Title: ' + title);
  console.log('Username: ' + username);
  console.log('COntexxt: ' + text);

  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('headerDiv');

  // Title of post
  const titleH3 = document.createElement('h3');
  titleH3.innerText = title.charAt(0).toUpperCase() + title.slice(1);
  headerDiv.appendChild(titleH3);

  // Date of post
  const dateP = document.createElement('p');
  dateP.innerText = postDate;
  headerDiv.appendChild(dateP);

  postDiv.appendChild(headerDiv);

  // Name of creator
  const nameP = document.createElement('p');
  nameP.innerText = username;
  postDiv.appendChild(nameP);

  // Text in post
  const textP = document.createElement('p');
  textP.innerText = text;
  postDiv.appendChild(textP);

  postContainer.appendChild(postDiv);
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  createPost();
  toggleForm();
});
