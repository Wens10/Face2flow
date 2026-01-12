const collabForm = document.getElementById("collabForm");

collabForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // empêche l'envoi HTML classique

  const data = {
    name: collabForm.name.value,
    email: collabForm.email.value,
    type: collabForm.type.value,
    speciality: collabForm.speciality.value,
    project: collabForm.project.value,
    portfolio: collabForm.portfolio.value
  };

  // Sécurité minimale
  if (!data.name || !data.email || !data.project) {
    alert("Merci de remplir tous les champs obligatoires.");
    return;
  }

  try {
    const response = await fetch("https://formspree.io/f/maqqwrng", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi");
    }

    alert("✅ Proposition envoyée avec succès !");
    collabForm.reset();

  } catch (error) {
    console.error(error);
    alert("❌ Une erreur est survenue. Merci de réessayer.");
  }
});
