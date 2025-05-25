function previewImage(event, id) {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById(id).src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

document.getElementById("loan-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const email = form.email.value;
  if (!email.includes('@')) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    const response = await fetch("https://loanbackend-yg11.onrender.com/submit", {
      method: "POST",
      body: data
    });

    if (response.ok) {
      document.getElementById("form-message").textContent =
        "Your loan request has been received. Your credit limit will be sent via email or SMS. Please check regularly!";
      form.reset();
      document.getElementById("preview-front").src = "";
      document.getElementById("preview-back").src = "";
    } else {
      const err = await response.json();
      alert("Submission failed: " + (err.message || "Unknown error"));
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error("❌ Submission Error:", error);
  }
});
