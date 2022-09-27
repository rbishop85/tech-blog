const newPostFormHandler = async (event) => {
  event.preventDefault();

  // Pull new post title and content from form
  const title = document.querySelector("#postTitle").value.trim();
  const content = document.querySelector("#postContent").value.trim();

  // If both values exist, submit request
  if (title && content) {
    const response = await fetch("/api/post/new", {
      method: "POST",
      // Include both values in request's body
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If new blog post successfully created, re-route to user's dashboard
      document.location.replace("/dashboard");
    } else {
      alert("Failed to post new blog.");
    }
  }
};

// Add event listener to "post to blog" button
document
  .querySelector("#form-newPost")
  .addEventListener("submit", newPostFormHandler);
