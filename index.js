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
const addParticipant = (person) => {
  let participantsDiv = document.querySelector('.rsvp-participants');
  let newP = document.createElement('p');
  newP.textContent = `🎟️ ${person.name} from ${person.hometown} has RSVP'd.`;
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

  // Create person object with form values
  let person = {
    name: nameInput.value,
    hometown: stateInput.value,
    email: emailInput.value
  };

  // Validate Name: min 2 chars
  if (person.name.length < 2) {
    containsErrors = true;
    nameInput.classList.add("error");
  } else {
    nameInput.classList.remove("error");
  }

  // Validate State: min 2 chars
  if (person.hometown.length < 2) {
    containsErrors = true;
    stateInput.classList.add("error");
  } else {
    stateInput.classList.remove("error");
  }

  // Validate Email: min 2 chars and must contain "@"
  if (person.email.length < 2 || !person.email.includes("@")) {
    containsErrors = true;
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }

  // Only allow RSVP if ALL fields valid
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);
  }
};

// Register ONLY the validation handler for RSVP submission
let rsvpButton = document.getElementById('rsvp-button');
rsvpButton.addEventListener('click', validateForm);


/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
    let modal = document.getElementById('success-modal');
    
    // Update modal display to flex
    modal.style.display = "flex";

    // Update modal text to personalized message
    let modalText = document.getElementById('modal-text');
    modalText.textContent = `Thank you for RSVPing, ${person.name}! We can't wait to see you at Unbroken Voices!`;

    // Start image animation with setInterval (only if motion is enabled)
    let intervalId;
    if (motionEnabled) {
        intervalId = setInterval(animateImage, 500);
    }

    // Set modal timeout to 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
        if (intervalId) {
            clearInterval(intervalId);
        }
    }, 5000);
};

// Animation variables and animateImage() function
let rotateFactor = 0;
let modalImage = document.getElementById('modal-image');

const animateImage = () => {
    // Toggle rotateFactor between 0 and -10 using ternary operator
    rotateFactor = rotateFactor === 0 ? -10 : 0;
    
    // Apply rotation to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};


/*** Close Modal Button (STRETCH FEATURE) ***/
let closeModalBtn = document.getElementById('close-modal-btn');

const closeModal = () => {
    let modal = document.getElementById('success-modal');
    modal.style.display = "none";
};

closeModalBtn.addEventListener('click', closeModal);


/*** Reduce Motion Feature (STRETCH FEATURE) ***/
let motionEnabled = true;
let reduceMotionButton = document.getElementById('reduce-motion-button');

const reduceMotion = () => {
    motionEnabled = !motionEnabled;
    
    if (motionEnabled) {
        reduceMotionButton.textContent = 'Reduce Motion';
    } else {
        reduceMotionButton.textContent = 'Enable Motion';
    }
};

reduceMotionButton.addEventListener('click', reduceMotion);
