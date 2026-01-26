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



  (function () {
    emailjs.init("BDuPNByBtyP5dytd0"); // Remplace par ta clé
        })();

  document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

  const form = this;
  const btn = form.querySelector('button');
  const originalBtnText = btn.textContent;

  // Récupération des données par l'attribut "name"
  const params = {
    fullname: form.querySelector('[name="name"]').value,
  email: form.querySelector('[name="email"]').value,
  phone: form.querySelector('[name="phone"]').value || "Non spécifié",
  subject: form.querySelector('[name="subject"]').value,
  message: form.querySelector('[name="message"]').value,
  time: new Date().toLocaleString("fr-FR")
            };

  btn.disabled = true;
  btn.textContent = "Envoi en cours...";

  // 1. Envoi vers Wenceslas
  emailjs.send("service_u13few8", "template_sa4f1sn", params)
                .then(() => {
                    // 2. Envoi de l'accusé au client
                    return emailjs.send("service_u13few8", "template_ttc2fr3", params);
                })
                .then(() => {
    alert("Merci ! Votre message a bien été envoyé.");
  form.reset();
                })
                .catch((err) => {
    console.error("Erreur:", err);
  alert("Une erreur est survenue lors de l'envoi.");
                })
                .finally(() => {
    btn.disabled = false;
  btn.textContent = originalBtnText;
                });
        });
