const questions = document.querySelectorAll(".faq-question");

questions.forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    const open = q.classList.contains("open");

    document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);
    document.querySelectorAll(".faq-question").forEach(b => b.classList.remove("open"));

    if (!open) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      q.classList.add("open");
    }
  });
});
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // empêche l'envoi HTML classique

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value,
    message: form.message.value
  };

  try {
    const response = await fetch("https://formspree.io/f/xnjjakey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Erreur Formspree");
    }

    alert("✅ Message envoyé avec succès !");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("❌ Une erreur est survenue. Merci de réessayer.");
  }
});
