// Fonction pour remplir automatiquement les champs du formulaire avec l'API RandomUser
function fillForm() {
  const apiUrl = "https://randomuser.me/api/";

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Récupérer les données du premier utilisateur
          const user = data.results[0];

          // Remplir les champs du formulaire
          document.getElementById("name").value = `${user.name.first} ${user.name.last}`;
          document.getElementById("email").value = user.email;
          document.getElementById("phone").value = user.phone || user.cell;
          document.getElementById("message").value = `Hello, I am ${user.name.first}. I live in ${user.location.city}, ${user.location.country}.`;
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des données de l'API:", error);
          alert("Une erreur s'est produite lors du remplissage automatique. Veuillez réessayer.");
      });
}

// Fonction pour vider le formulaire
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("message").value = "";
}

// Fonction pour valider le formulaire
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche l'envoi par défaut du formulaire

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  let isValid = true;

  if (!name.value.trim()) {
      alert("Veuillez entrer votre nom complet.");
      isValid = false;
  }

  if (!email.value.trim()) {
      alert("Veuillez entrer votre adresse email.");
      isValid = false;
  }

  if (!phone.value.trim()) {
      alert("Veuillez entrer votre numéro de téléphone.");
      isValid = false;
  }

  if (!message.value.trim()) {
      alert("Veuillez entrer votre message.");
      isValid = false;
  }

  if (isValid) {
      alert("Votre message a été envoyé avec succès !");
      clearForm();
  }
});
