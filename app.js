const toggleBtn = document.querySelector('#toggleBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const submitBtn = document.querySelector('#submitBtn');

const formContainer = document.querySelector('.formContainer');
const postContainer = document.querySelector('.postContainer');

const postForm = document.querySelector('.postForm').children[1];

let posts = [];

reload();

function toggleForm() {
  formContainer.classList.toggle('hidden');
}

toggleBtn.addEventListener('click', () => {
  toggleForm();
});

cancelBtn.addEventListener('click', () => {
  toggleForm();
  postForm[0].value = '';
  postForm[1].value = '';
  postForm[2].value = '';
});

function renderPost(post) {
  const { title, username, text, id, date } = post;

  const postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.id = id;

  const topDiv = document.createElement('div');
  topDiv.classList.add('topDiv');

  // Title of post
  const titleH3 = document.createElement('h3');
  titleH3.innerText = title.charAt(0).toUpperCase() + title.slice(1);
  topDiv.appendChild(titleH3);

  // Date of post
  const dateP = document.createElement('p');
  dateP.innerText = date;
  topDiv.appendChild(dateP);

  postDiv.appendChild(topDiv);

  // Name of creator
  const nameP = document.createElement('p');
  nameP.innerText = username.charAt(0).toUpperCase() + username.slice(1);
  postDiv.appendChild(nameP);

  // Text in post
  const textP = document.createElement('p');
  textP.innerText = text;
  postDiv.appendChild(textP);

  const bottomDiv = document.createElement('div');
  bottomDiv.classList.add('bottomDiv');
  postDiv.appendChild(bottomDiv);

  const lcDiv = document.createElement('div');
  bottomDiv.appendChild(lcDiv);

  const likeBtn = document.createElement('button');
  likeBtn.innerText = 'Like';
  lcDiv.appendChild(likeBtn);

  const dislikeBtn = document.createElement('button');
  dislikeBtn.innerText = 'Dislike';
  lcDiv.appendChild(dislikeBtn);

  const commentBtn = document.createElement('button');
  commentBtn.innerText = 'Comment';
  lcDiv.appendChild(commentBtn);

  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Tabort';
  bottomDiv.appendChild(removeBtn);

  removeBtn.addEventListener('click', (e) => {
    const postCon = e.target.parentElement.parentElement.parentElement;
    const postDel = e.target.parentElement.parentElement;
    const postId = e.target.parentElement.parentElement.id;
    posts = posts.filter((post) => post.id !== postId);
    savePosts();
    postCon.removeChild(postDel);
  });

  postContainer.appendChild(postDiv);
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const post = createPostInfo();
  savePosts();
  renderPost(post);
  toggleForm();
});

async function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function reload() {
  posts = JSON.parse(localStorage.getItem('posts'));
  posts.map((post) => renderPost(post));
}

function createPostInfo() {
  const date = new Date();
  const min =
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const postDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${min}`;

  const post = {
    title: postForm[0].value,
    username: postForm[1].value,
    text: postForm[2].value,
    id: crypto.randomUUID(),
    date: postDate,
  };
  posts.push(post);
  return post;
}
