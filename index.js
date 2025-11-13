/*** Dark Mode ***/
// Step 1: Select the theme button
let themeButton = document.getElementById('theme-button');

// Step 2: Callback function toggles dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  // Show which mode is active
  if (document.body.classList.contains('dark-mode')) {
    themeButton.textContent = 'Toggle Light Mode';
  } else {
    themeButton.textContent = 'Toggle Dark Mode';
  }
};
// Step 3: Register dark mode event listener
themeButton.addEventListener('click', toggleDarkMode);


/*** RSVP Section Logic ***/
// One global counter for participants
let count = 3;

// Function adds a valid participant to the RSVP list
const addParticipant = (event) => {
  event.preventDefault();
  let name = document.getElementById('rsvp-name').value;
  let state = document.getElementById('rsvp-state').value;
  let participantsDiv = document.querySelector('.rsvp-participants');
  let newP = document.createElement('p');
  newP.textContent = `🎟️ ${name} from ${state} has RSVP'd.`;
  participantsDiv.appendChild(newP);

  // Update the RSVP count
  let oldCount = document.getElementById('rsvp-count');
  if (oldCount) oldCount.remove();
  count += 1;
  let countP = document.createElement('p');
  countP.id = 'rsvp-count';
  countP.textContent = `⭐ ${count} people have RSVP'd to this event!`;
  participantsDiv.appendChild(countP);

  document.getElementById('rsvp-form').reset();
};


/*** Form Validation ***
  - Checks for at least 2 characters in every field
  - State must be 2 letters
  - Email must have '@' (stretch)
  - Highlights invalid fields
  - Only adds RSVP if all are valid
***/
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  let nameInput = document.getElementById("rsvp-name");
  let stateInput = document.getElementById("rsvp-state");
  let emailInput = document.getElementById("rsvp-email");

  // Validate Name: min 2 chars
  if (nameInput.value.length < 2) {
    containsErrors = true;
    nameInput.classList.add("error");
  } else {
    nameInput.classList.remove("error");
  }

  // Validate State: min 2 chars
  if (stateInput.value.length < 2) {
    containsErrors = true;
    stateInput.classList.add("error");
  } else {
    stateInput.classList.remove("error");
  }

  // Validate Email: min 2 chars and must contain "@"
  if (emailInput.value.length < 2 || !emailInput.value.includes("@")) {
    containsErrors = true;
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }

  // Only allow RSVP if ALL fields valid
  if (!containsErrors) {
    addParticipant(event);
    // No need to reset here, addParticipant already resets form!
  }
};

// Register ONLY the validation handler for RSVP submission
let rsvpButton = document.getElementById('rsvp-button');
rsvpButton.addEventListener('click', validateForm);
