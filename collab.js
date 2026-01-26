
    (function () {
        emailjs.init("BDuPNByBtyP5dytd0"); 
    })();

    const collabForm = document.getElementById('collabForm');

    if (collabForm) {
        collabForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const form = this;
            const btn = form.querySelector('button');
            const originalBtnText = btn.textContent;

            // Récupération précise selon tes nouveaux attributs "name"
            const params = {
                fullname: form.querySelector('[name="name"]').value,
                email: form.querySelector('[name="email"]').value,
                phone: form.querySelector('[name="phone"]').value || "Non renseigné",
                subject: form.querySelector('[name="subject"]').value, // Type de collab
                speciality: form.querySelector('[name="speciality"]').value,
                message: form.querySelector('[name="message"]').value, // Description projet
                portfolio: form.querySelector('[name="portfolio"]').value || "Aucun lien",
                time: new Date().toLocaleString("fr-FR")
            };

            btn.disabled = true;
            btn.textContent = "Envoi en cours...";

            // Envoi des deux emails (Admin + Client)
            emailjs.send("service_u13few8", "template_sa4f1sn", params)
                .then(() => {
                    return emailjs.send("service_u13few8", "template_ttc2fr3", params);
                })
                .then(() => {
                    alert("Proposition envoyée avec succès !");
                    form.reset();
                })
                .catch((err) => {
                    console.error("Erreur:", err);
                    alert("Erreur lors de l'envoi.");
                })
                .finally(() => {
                    btn.disabled = false;
                    btn.textContent = originalBtnText;
                });
        });
    }
