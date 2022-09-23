console.log("Hello World")

const editPostFormHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {

    const id = event.target.getAttribute('data-id');
    const title = document.querySelector("#postTitle").value.trim();
    const content = document.querySelector("#postContent").value.trim();

    if (id && title && content) {
      const response = await fetch(`/api/post/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update blog post.");
      }
    }

  }



  if (id && title && content) {
    const response = await fetch(`/api/post/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update blog post.");
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector("#editPost")
  .addEventListener("click", editPostFormHandler);

document
  .querySelector("#deletePost")
  .addEventListener("click", delButtonHandler);