const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const content = document.querySelector("#postContent").value.trim();

  if (title && content) {
    const response = await fetch("/api/post/new", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to post new blog.");
    }
  }
};

document
  .querySelector("#form-newPost")
  .addEventListener("submit", newPostFormHandler);
