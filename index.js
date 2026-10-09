//DOM for the form
const postForm = document.getElementById("post-form");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const submitBtn = document.getElementById("submit-btn");

// DOM for the displaying result
const statusMessage = document.getElementById("status-message");
const messageList = document.getElementById("message-board");

//async function for get method
async function loadPosts() {
  //loading stage
  statusMessage.textContent = "Loading posts....";
  try {
    //fetching the posts
    const postValue = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );
    //Manual error trigger
    if (!postValue.ok) {
      throw new Error("The Post is unavailable");
    }
    //storing the fetched data and awaiting it
    const data = await postValue.json();

    //rendering that data

    messageList.innerHTML = data
      .map((d) => `Title: ${d.title} Body: ${d.body}`)
      .join("");

    //clearing the statusmessage
    statusMessage.textContent = "";
  } catch (error) {
    console.log(error.message);
  }
}
// calling the loadPosts function
loadPosts();

//wiring up the form event listener
postForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let titleInput = postTitle.value;
  let messageInput = postBody.value;

  if (titleInput.trim() === "") {
    return alert("please enter the title");
  } else if (messageInput.trim() === "") {
    return alert("please enter the body");
  }

  createNewPost(titleInput, messageInput);
  postTitle.value = "";
  postBody.value = "";
});

//creating async function for creating a post
async function createNewPost(title, body) {
  //loading state
  statusMessage.textContent = "creating post...";
  try {
    // fetching data
    const posts = { title: title, body: body };
    const postValue = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
      },
    );

    if (!postValue.ok) {
      throw new Error("Failed to save Post");
    }
    //saving the data
    const savedData = await postValue.json();

    //using the saved data to render
    const li = document.createElement("li");
    li.textContent = `Title: ${savedData.title} Body: ${savedData.body}`;
    messageList.prepend(li);
    //clearing the status message
    statusMessage.textContent = "";
  } catch (error) {
    console.log(error.message);
  }
}
