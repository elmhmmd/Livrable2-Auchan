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

  // Récupération 
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  //  add Regex
  const nameRegex = /^[a-zA-Z\s]+$/; // Lettres et espaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format email simple
  const phoneRegex = /^[0-9]{10,}$/; // Minimum 10 chiffres

  // Validation Nom
  if (!name.value.trim() || !nameRegex.test(name.value)) {
    name.style.borderColor = "red";
    isValid = false;
} else {
    name.style.borderColor = ""; // Réinitialisation
}

// Validation Email
if (!email.value.trim() || !emailRegex.test(email.value)) {
    email.style.borderColor = "red";
    isValid = false;
} else {
    email.style.borderColor = "";
}

// Validation Téléphone
if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
    phone.style.borderColor = "red";
    isValid = false;
} else {
    phone.style.borderColor = "";
}

// Validation Message
if (!message.value.trim()) {
    message.style.borderColor = "red";
    isValid = false;
} else {
    message.style.borderColor = "";
}

return isValid;
}

// soumission du formulaire
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Empêcher la soumission par défaut

  // Vérifier si le formulaire est valide
  if (validateForm()) {
      alert("Votre message a été envoyé avec succès !");
      clearForm(); // Vider le formulaire après soumission
  } else {
      alert("Veuillez remplir tous les champs correctement.");
  }
});