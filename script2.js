const search = document.getElementById("talentSearch");
const cards = document.querySelectorAll(".talent-card");
const count = document.getElementById("talentCount");

function filterTalents() {
  const value = search.value.toLowerCase().trim();
  let visible = 0;

  cards.forEach(card => {
    const name = card.dataset.name;

    if (name.includes(value)) {
      card.style.display = "block";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  count.textContent = visible;
}

search.addEventListener("input", filterTalents);
filterTalents();
