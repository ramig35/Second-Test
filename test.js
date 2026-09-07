// Ce fichier utilise le tableau "produits" defini dans produits.js
// (verifie que produits.js est bien charge avant detail.js dans le HTML)


// ===== ETAPE 1 : lire l'id dans l'URL =====
var urlParams = new URLSearchParams(window.location.search);
var idDemande = parseInt(urlParams.get("id"));


// ===== ETAPE 2 : trouver le produit avec cet id =====

var produitTrouve = null;

for (var i = 0; i < produits.length; i++) {
  if (produits[i].id === idDemande) {
    produitTrouve = produits[i];
  }
}


// ===== ETAPE 3 : afficher le produit dans la page =====

if (produitTrouve === null) {

  document.body.innerHTML = "<p>Produit introuvable. <a href='index.html'>Retour a l'accueil</a></p>";

} else {

  // On remplit chaque element HTML un par un
  document.getElementById("produit-image").src = produitTrouve.image;
  document.getElementById("produit-image").alt = produitTrouve.nom;
  document.getElementById("produit-nom").textContent = produitTrouve.nom;
  document.getElementById("produit-description").textContent = produitTrouve.description;
  document.getElementById("produit-prix").textContent = produitTrouve.prix.toLocaleString() + " Ar";

  // Pour les caracteristiques, on cree un <li> pour chacune
  var liste = document.getElementById("produit-caracteristiques");

  for (var j = 0; j < produitTrouve.caracteristiques.length; j++) {
    var element = document.createElement("li");
    element.textContent = produitTrouve.caracteristiques[j];
    liste.appendChild(element);
  }
}


// ===== AJOUTER AU PANIER (partage avec l'accueil via localStorage) =====

function ajouterAuPanierDepuisDetail() {
  // On lit le panier actuel depuis localStorage
  var donnees = localStorage.getItem("panier");
  var panier = donnees === null ? [] : JSON.parse(donnees);

  // On cherche si le produit est deja dans le panier
  var articleExistant = null;
  for (var i = 0; i < panier.length; i++) {
    if (panier[i].nom === produitTrouve.nom) {
      articleExistant = panier[i];
    }
  }

  // Si deja present, on augmente la quantite
  if (articleExistant !== null) {
    articleExistant.quantite = articleExistant.quantite + 1;
  } else {
    panier.push({ nom: produitTrouve.nom, prix: produitTrouve.prix, quantite: 1 });
  }

  // On sauvegarde dans localStorage
  localStorage.setItem("panier", JSON.stringify(panier));

  // On affiche le message de confirmation
  document.getElementById("message-ajout").style.display = "block";

  setTimeout(function() {
    document.getElementById("message-ajout").style.display = "none";
  }, 3000);
}
