const buttons = document.querySelectorAll('.filters button');
const searchInput = document.getElementById('search');
const articles = document.querySelectorAll('.card');
const count = document.getElementById('count');

let activeCategory = 'all';
let searchTerm = '';

/* NORMALISE TEXTE (supprime accents, casse, etc.) */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")                 // sépare accents
    .replace(/[\u0300-\u036f]/g, "")  // supprime accents
    .trim();
}

function filterArticles() {
  let visible = 0;
  const normalizedSearch = normalizeText(searchTerm);

  articles.forEach(article => {
    const category = article.dataset.category;

    const title = normalizeText(article.dataset.title || "");
    const content = normalizeText(article.textContent || "");

    /* catégorie */
    const matchCategory =
      activeCategory === 'all' || category === activeCategory;

    /* recherche intelligente */
    const matchSearch =
      normalizedSearch === "" ||
      title.includes(normalizedSearch) ||
      content.includes(normalizedSearch);

    if (matchCategory && matchSearch) {
      article.style.display = 'block';
      visible++;
    } else {
      article.style.display = 'none';
    }
  });

  count.textContent = visible;
}

/* FILTRES */
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeCategory = btn.dataset.category;
    filterArticles();
  });
});

/* RECHERCHE */
searchInput.addEventListener('input', e => {
  searchTerm = e.target.value;
  filterArticles();
});

/* INIT */
filterArticles();
