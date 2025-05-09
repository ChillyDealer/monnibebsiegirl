// login + loader
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login");
  const loginContainer = document.getElementById("login-form");
  const loader = document.getElementById("loader");
  const particles = document.getElementById("particles-js");
  const container = document.querySelector(".container");
  const loginError = document.getElementById("login-error");

  loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === "skibidi" && password === "270304") { // only login
          loginContainer.classList.add("hidden");
          loader.classList.remove("hidden");
          
          setTimeout(() => {
              loader.classList.add("hidden");
              particles.classList.remove("hidden");
              container.classList.remove("hidden");
              document.body.classList.add("fade-in");
          }, 5800);
      } else {
          loginError.classList.remove("hidden");
      }
  });
});


// countdown timer
const countdownElement = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const startTime = new Date("2024-09-20T17:18:00+01:00"); // +1 for danish time

function updateCountdown() {
  const now = new Date();
  const diff = now - startTime; // date difference

  // update the countdown values
  countdownElement.days.textContent = Math.floor(diff / (1000 * 60 * 60 * 24)); // day
  countdownElement.hours.textContent = Math.floor(
    (diff / (1000 * 60 * 60)) % 24
  ); // hour
  countdownElement.minutes.textContent = Math.floor((diff / (1000 * 60)) % 60); // min
  countdownElement.seconds.textContent = Math.floor((diff / 1000) % 60); // sec

  setTimeout(updateCountdown, 1000); // every second
}

updateCountdown(); // count down call

// picture gallery
const pictures = {
  september: [], // no picture
  oktober: Array.from(
    { length: 53 },
    (_, i) => `Pictures/oktober/oktober${i + 1}.jpg`
  ),
  november: Array.from(
    { length: 39 },
    (_, i) => `Pictures/november/november${i + 1}.jpg`
  ),
  december: Array.from(
    { length: 29 },
    (_, i) => `Pictures/december/december${i + 1}.jpg`
  ),
  january: Array.from(
    { length: 77 },
    (_, i) => `Pictures/january/January${i + 1}.jpg`
  ),
}; // see in folder after var

// inactive dates
const buttons = document.querySelectorAll(".month-btn"); // all mnths
const imagesContainer = document.getElementById("images"); // container for images

buttons.forEach((button) => {
  const month = button.getAttribute("data-month"); // month for button

  // empty months
  if (
    month !== "september" &&
    (!pictures[month] || pictures[month].length === 0)
  ) {
    button.classList.add("empty-mark"); 
  }

  button.addEventListener("click", () => {
    const isActive = button.classList.contains("active"); 

    buttons.forEach((btn) => btn.classList.remove("active")); // reset all button so active can choose

    if (isActive) {
      imagesContainer.innerHTML = ""; 
      imagesContainer.classList.remove("active"); 
    } else {
      button.classList.add("active"); 
      imagesContainer.innerHTML = ""; 

      if (pictures[month] && pictures[month].length > 0) {
        pictures[month].forEach((image) => {
          const img = document.createElement("img");
          img.src = image;
          img.alt = `${month} image`; // alt text for broken img

          img.onload = () => {
            const isPortrait = img.naturalHeight > img.naturalWidth; // correct dimensions
            img.classList.add(isPortrait ? "portrait" : "landscape"); // two dimension types
          };

          imagesContainer.appendChild(img); // add to container
        });
        imagesContainer.classList.add("active"); // active container
      } else {
        const message = document.createElement("div"); // send message

        // missing images folder text
        message.textContent =
          month === "september"
            ? `ohh nooo ! 🥺 ingen billeder for ${month} ?? men i det mindste er minderne gemt i vores hjerter ❤️✨💖`
            : `hov hov ! 😮 ingen billeder for ${month} ?! men, jeg glæder mig soooo much til de minder, vi skal lave sammen ✨🥰❤️🌟`;

        // msg style
        message.style.fontSize = "1.2em";
        message.style.color = "#ff85b4";
        message.style.textAlign = "center";
        imagesContainer.appendChild(message); // add message to body
        imagesContainer.classList.add("active"); // mark as active
      }

      CallhiddenText();
    }
  });
});

function CallhiddenText() {
  if (document.querySelector(".hiddenText")) return; // don't allow multiple

  const easterEgg = document.createElement("div");
  easterEgg.className = "hiddenText";
  easterEgg.innerHTML = "😘 Jeg elsker dig Monica";

  document.body.appendChild(easterEgg);

  setTimeout(() => {
    easterEgg.remove(); 
  }, 2500); // lifespan 2.5 sec
}

// heart animation
const heartTypes = ["🩷", "💖", "❤️‍🔥", "💝"]; 

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".month-btn");

  buttons.forEach((button) => {
    let animationActive = false; // bool for hover active

    button.addEventListener("mouseenter", () => {
      if (!animationActive) {
        animationActive = true; // call animation
        spawnHearts(button); // start it
      }
    });

    button.addEventListener("mouseleave", () => {
      animationActive = false; // stop animation if hover off
    });
  });

  function spawnHearts(button) {
    const heartCount = Math.floor(Math.random() * (8 - 4 + 1)) + 4; // random number max 8 min 4

    for (let i = 0; i < heartCount; i++) {
      createFlyingHeart(button); 
    }

    setTimeout(() => {
      if (button.matches(":hover")) {
        spawnHearts(button); // infinite
      }
    }, 1500); // lifespan 1.5 sec
  }

  function createFlyingHeart(button) {
    const randomHeart =
      heartTypes[Math.floor(Math.random() * heartTypes.length)]; // random hearts
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = randomHeart; // set heart

    document.body.appendChild(heart); // add to whole page and not button only

    const rect = button.getBoundingClientRect(); // button pos
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    const randomX = (Math.random() - 0.5) * 300; // rand x offset
    const randomY = (Math.random() - 0.5) * 300; // rand y offset
    const randomSize = Math.random() * (50 - 10) + 10; // rand size
    const scaleEnd = Math.random() * (1.8 - 0.5) + 0.5; // rand scale

    heart.style.left = `${buttonCenterX}px`; // heart positions
    heart.style.top = `${buttonCenterY}px`;
    heart.style.setProperty("--x", `${randomX}px`);
    heart.style.setProperty("--y", `${randomY}px`);
    heart.style.setProperty("--size", `${randomSize}px`);
    heart.style.setProperty("--scale", "1");
    heart.style.setProperty("--scale-end", scaleEnd);

    heart.addEventListener("animationend", () => {
      heart.remove(); // use animationend to remove from DOM
    });
  }
});

// Lighthouse 
const lighthouse = document.getElementById("lighthouse");
const lighthouseImg = document.getElementById("lighthouse-img");
const closeBtn = document.getElementById("close");

let currentImages = [];
let currentIndex = 0;

// open
function openLighthouse(images, index) {
  currentImages = images;
  currentIndex = index;
  lighthouseImg.src = images[index];
  lighthouse.classList.add("visible");
  document.body.style.overflow = "hidden"; // disable scroll
}

// close
function closeLighthouse() {
  lighthouse.classList.remove("visible");
  document.body.style.overflow = ""; // enable scroll
}

// navigation
function navigateLighthouse(direction) {
  currentIndex =
    (currentIndex + direction + currentImages.length) % currentImages.length;
  lighthouseImg.src = currentImages[currentIndex];
}

// listener for close and nav
closeBtn.addEventListener("click", closeLighthouse);
lighthouse.addEventListener("click", (e) => {
  if (e.target === lighthouseImg) {
    const rect = lighthouseImg.getBoundingClientRect();
    const clickX = e.clientX;
    const midPoint = rect.left + rect.width / 2;

    if (clickX < midPoint) {
      navigateLighthouse(-1); // left
    } else {
      navigateLighthouse(1); // right
    }
  } else if (e.target === lighthouse) {
    closeLighthouse(); 
  }
});

// keyboard nav
document.addEventListener("keydown", (e) => {
  if (lighthouse.classList.contains("visible")) {
    if (e.key === "ArrowLeft") {
      navigateLighthouse(-1); // previous picture
    } else if (e.key === "ArrowRight") {
      navigateLighthouse(1); // next pic
    } else if (e.key === "Escape") {
      closeLighthouse(); 
    }
  }
});

// find current picture clicked
imagesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const month = [...buttons]
      .find((btn) => btn.classList.contains("active"))
      .getAttribute("data-month");
    const images = pictures[month];
    const imageSrc = e.target.src;
    const baseImage = imageSrc.substring(imageSrc.lastIndexOf("/") + 1); // find curent image
    const imageIndex = parseInt(baseImage.replace(/\D/g, ""), 10) - 1; // convert to index in dec
    openLighthouse(images, imageIndex);
  }
});

// stars
function configureParticles() {
  const isMobile = window.innerWidth < 768;

  particlesJS("particles-js", {
    particles: {
      number: {
        value: isMobile ? 150 : 400,
        density: {
          enable: true,
          value_area: isMobile ? 300 : 700,
        },
      },
      color: {
        value: "#ff0000",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 1,
          color: "#ffffff",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: true,
          speed: 5,
          opacity_min: 0,
        },
      },
      size: {
        value: isMobile ? 1 : 1.2,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          size_min: 0,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.2 : 0.4,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 500,
          rotateY: 1000,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false, // keep to false cauz idk how to fix with true lol
          mode: "bubble",
        },
        onclick: {
          enable: false, // here too lol
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 4000,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 200, 
          size: 10,
          duration: 3,
          opacity: 1,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}

window.addEventListener("resize", configureParticles); // check for viewport change so no squish
configureParticles();
