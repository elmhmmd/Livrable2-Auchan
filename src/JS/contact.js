// Fonction pour vider le formulaire
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("message").value = "";
}

// Fonction pour valider le formulaire
function validateForm() {
  let isValid = true; // Initialiser à vrai

  