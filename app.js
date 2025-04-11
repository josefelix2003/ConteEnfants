// app.js

// Fonction pour charger dynamiquement le contenu
function loadPage(url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      // Créer un document temporaire pour extraire le contenu
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('#content');

      // Remplacer le contenu actuel
      document.querySelector('#content').innerHTML = newContent.innerHTML;

      // Mettre à jour l'URL sans recharger la page
      history.pushState(null, '', url);
    })
    .catch(error => console.error('Erreur lors du chargement de la page:', error));
}

// Gérer les clics sur les liens
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', event => {
    const target = event.target.closest('a');
    if (target && target.getAttribute('href')) {
      const url = target.getAttribute('href');
      if (url.startsWith('http') || url.startsWith('#')) return; // Lien externe ou ancre

      event.preventDefault();
      loadPage(url);
    }
  });

  // Gérer la navigation avec les boutons du navigateur
  window.addEventListener('popstate', () => {
    loadPage(location.pathname);
  });
});
