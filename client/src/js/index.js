//import modules
import './form';
import { toggleForm, clearForm } from './form';
import { initdb, getDb, postDb, deleteDb, editDb } from './database';
import { fetchCards } from './cards';

//import static images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

//import css
import '../css/index.css';

//import Bootstrap
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

if ('serviceWorker' in navigator) {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  })
}

window.addEventListener('load', function () {
  initdb();
  fetchCards();
  document.getElementById('logo').src = Logo;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});

//install button
const installBtn = document.getElementById('installBtn');

//event listener to make install button visible
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';
  installBtn.addEventListener('click', () => {
    //prompt user for installation
    event.prompt();
    //if user allows install, disable button and change text to Installed!
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
  });
});

//event listener to check if app is installed
window.addEventListener('appinstalled', (event) => {
  console.log('installed', 'appinstalled', event);
})



// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
  toggleForm()
})

form.addEventListener('submit', event => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    editDb(profileId, name, email, phone, profile);
    fetchCards();
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});

//deleteCard must be scoped to window, otherwise the onClick=deleteCard(this) property of all the
//html delete buttons fails
window.deleteCard = (e) => {
  //grab id from button element attached to contact card
  let id = parseInt(e.id);
  //delete the card
  deleteDb(id);
  //reload DOM
  fetchCards();
}

//triggered by onclick property of edit buttons
window.editCard = (e) => {
  //grabs the id from the button element attached to the contact card and
  //sets the global profileId variable that will be used in the form element
  profileId = parseInt(e.dataset.id);

  //grabs info to prepopulate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  //set values of the input fields to captured data
  document.getElementById('name').value = editName;
  document.getElementById('email').value = editEmail;
  document.getElementById('phone').value = editPhone;

  //show hidden form element
  form.style.display = 'block';

  //toggles submit button so that it now updates an existing contact instead of
  //posting a new one
  submitBtnToUpdate = true;
}