const toggleBtn = document.querySelector('#toggleBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const submitBtn = document.querySelector('#submitBtn');

const delBtn = document.querySelector('.delBtn');

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
  postForm[0].value = '';
  postForm[1].value = '';
  postForm[2].value = '';
});

cancelBtn.addEventListener('click', () => {
  toggleForm();
});

function renderPost(post) {
  const { title, username, text, id, date, dislikes, likes } = post;

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
  const author = document.createElement('p');
  author.innerText = username.charAt(0).toUpperCase() + username.slice(1);
  author.classList.add('author');
  postDiv.appendChild(author);

  // Text in post
  const textP = document.createElement('p');
  textP.innerText = text;
  textP.classList.add('text');
  postDiv.appendChild(textP);

  const bottomDiv = document.createElement('div');
  bottomDiv.classList.add('bottomDiv');
  postDiv.appendChild(bottomDiv);

  const lcDiv = document.createElement('div');
  lcDiv.classList.add('lcDiv');

  bottomDiv.appendChild(lcDiv);

  // Like Button
  const likeBtn = document.createElement('button');
  likeBtn.dataset.Type = 'likes';
  const likeSpan = document.createElement('span');
  likeSpan.innerText = likes;
  likeBtn.appendChild(likeSpan);
  const likeIcon = document.createElement('img');
  likeIcon.src = './icons/heart.png';
  likeBtn.appendChild(likeIcon);
  likeBtn.classList.add('likeBtn');
  lcDiv.appendChild(likeBtn);

  likeBtn.addEventListener('click', (e) => {
    likeHandler(e);
  });

  // Dislike Button
  const dislikeBtn = document.createElement('button');
  dislikeBtn.dataset.Type = 'dislikes';
  const dislikeSpan = document.createElement('span');
  dislikeSpan.innerText = dislikes;
  dislikeBtn.appendChild(dislikeSpan);
  const dislikeIcon = document.createElement('img');
  dislikeIcon.src = './icons/heart-crack.png';
  dislikeBtn.appendChild(dislikeIcon);
  dislikeBtn.classList.add('dislikeBtn');

  dislikeBtn.addEventListener('click', (e) => {
    likeHandler(e);
  });

  lcDiv.appendChild(dislikeBtn);

  // Renders comment div
  renderCommentDiv(lcDiv, postDiv);

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Tabort';
  removeBtn.classList.add('delBtn');
  bottomDiv.appendChild(removeBtn);

  removeBtn.addEventListener('click', (e) => {
    const postDel = e.target.closest('.post');
    const postId = postDel.id;
    posts = posts.filter((post) => post.id !== postId);
    savePosts();
    postContainer.removeChild(postDel);
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

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function likeHandler(e) {
  const btn = e.currentTarget;
  const dataType = btn.dataset.Type;
  const currentPost = btn.closest('.post');

  let btnText = parseInt(btn.children[0].innerText);
  btn.children[0].innerText = btnText += 1;

  posts.filter((post) => {
    if (post.id === currentPost.id) {
      if (dataType == 'dislikes') {
        return (post.dislikes = post.dislikes += 1);
      } else if (dataType == 'likes') {
        return (post.likes = post.likes += 1);
      }
    }
    return post;
  });
  savePosts();
}

function reload() {
  posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.map((post) => renderPost(post));
}

function createPostInfo() {
  if (
    postForm[0].value == '' ||
    postForm[1].value == '' ||
    postForm[2].value == ''
  ) {
    return;
  }
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
    dislikes: 0,
    likes: 0,
    comments: [],
    id: crypto.randomUUID(),
    date: postDate,
  };
  posts.push(post);
  return post;
}

function createComment(e, commentValue) {
  const author = commentValue.author;
  const comment = commentValue.comment;
  if (author == '' || comment == '') {
    return;
  }
  const date = new Date();
  const min =
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const postDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${min}`;

  const postid = e.target.closest('.post').id;
  const newComment = {
    author: author,
    comment: comment,
    id: crypto.randomUUID(),
    date: postDate,
  };

  posts.filter((post) => {
    if (post.id == postid) {
      return post.comments.push(newComment);
    }
    return post;
  });
  savePosts();
  return newComment;
}

function renderCommentDiv(lcDiv, postDiv) {
  // Comment button
  const commentBtn = document.createElement('button');
  commentBtn.innerText = 'Commentarer';
  commentBtn.classList.add('commentBtn');
  lcDiv.appendChild(commentBtn);

  const commentContainer = document.createElement('div');
  commentContainer.classList.add('commentContainer');
  commentContainer.classList.add('hidden');
  postDiv.appendChild(commentContainer);

  const addCommentDiv = document.createElement('div');

  commentContainer.appendChild(addCommentDiv);

  const commentForm = document.createElement('form');
  addCommentDiv.classList.add('commentForm');
  addCommentDiv.appendChild(commentForm);

  const commentAuthorFormLabel = document.createElement('label');
  commentAuthorFormLabel.innerText = 'Commentarer';
  commentForm.appendChild(commentAuthorFormLabel);

  const commentAuthorFormInput = document.createElement('input');
  commentAuthorFormInput.placeholder = 'Author';
  commentAuthorFormInput.classList.add('comment');

  commentForm.appendChild(commentAuthorFormInput);

  const commentFormTextArea = document.createElement('textarea');
  commentFormTextArea.placeholder = 'Comment';
  commentFormTextArea.classList.add('comment');

  commentForm.appendChild(commentFormTextArea);

  const commentFormBtn = document.createElement('button');
  commentFormBtn.innerText = 'Commentera';
  commentForm.appendChild(commentFormBtn);

  commentFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const commentInfo = {
      author: commentForm[0].value,
      comment: commentForm[1].value,
    };
    const comment = createComment(e, commentInfo);
    renderComment(comment, commentsDiv);

    commentForm[0].value = '';
    commentForm[1].value = '';
  });

  const commentsDiv = document.createElement('div');
  commentContainer.appendChild(commentsDiv);

  commentBtn.addEventListener('click', () => {
    commentContainer.classList.toggle('hidden');
  });

  posts.map((post) => {
    if (post.id == postDiv.id) {
      post.comments.map((comment) => {
        renderComment(comment, commentsDiv);
      });
    }
  });
}

function renderComment(comment, commentsDiv) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  commentDiv.id = comment.id;

  const adDiv = document.createElement('div');
  adDiv.classList.add('adDiv');
  commentDiv.appendChild(adDiv);

  const commentAuthor = document.createElement('p');
  commentAuthor.innerText = comment.author;
  adDiv.appendChild(commentAuthor);

  const commentDate = document.createElement('p');
  commentDate.innerText = comment.date;
  adDiv.appendChild(commentDate);

  const commentText = document.createElement('p');
  commentText.innerText = comment.comment;
  commentDiv.appendChild(commentText);

  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Tabort';
  removeBtn.classList.add('delBtn');
  commentDiv.appendChild(removeBtn);

  removeBtn.addEventListener('click', (e) => {
    const commentDel = e.target.closest('.comment');
    const postId = commentDel.closest('.post').id;
    const commentId = commentDel.id;

    posts = posts.map((post) => {
      if (post.id == postId) {
        const comments = post.comments;
        post.comments = comments.filter((comment) => comment.id != commentId);
      }
      return post;
    });
    savePosts();
    commentsDiv.removeChild(commentDel);
  });

  commentsDiv.appendChild(commentDiv);
}
