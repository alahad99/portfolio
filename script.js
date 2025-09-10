// ==============================
// Portfolio Interactivity + Scroll
// ==============================
console.log("Portfolio Loaded!");

// Smooth scroll for all anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ==============================
// Typed Text Animation (Hero Section)
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("typed-text");
  if (!textElement) return;

  const words = ["Graphics Designer", "Penetration Tester"];
  let wordIndex = 0;
  let charIndex = 0;

  function typeWordByWord() {
    const currentWord = words[wordIndex];
    textElement.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex < currentWord.length) {
      setTimeout(typeWordByWord, 150);
    } else {
      // pause after word
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length; // next word
        charIndex = 0;
        textElement.textContent = "";
        typeWordByWord();
      }, 1500);
    }
  }

  typeWordByWord();
});

// ==============================
// Portfolio Filter (Projects)
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".card");
  const arrowIcon = document.querySelector("#arrow-icon");

  if (filterButtons.length === 0 || portfolioCards.length === 0) return;

  // hide all first
  portfolioCards.forEach(card => {
    card.style.display = "none";
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      // update arrow if exists
      if (arrowIcon) {
        if (filter === "graphics") {
          arrowIcon.classList.remove("fa-arrow-right");
          arrowIcon.classList.add("fa-arrow-left");
        } else if (filter === "cyber") {
          arrowIcon.classList.remove("fa-arrow-left");
          arrowIcon.classList.add("fa-arrow-right");
        }
      }

      // show/hide cards properly
      portfolioCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"; // show
        } else {
          card.style.display = "none"; // hide
        }
      });
    });
  });

  // default graphics active
  const defaultButton = document.querySelector('.filter-btn[data-filter="graphics"]');
  if (defaultButton) defaultButton.click();
});


// ==============================
// Skill Section Animation on Scroll
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const skillSection = document.querySelector("#skill");
  if (!skillSection) return;

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  skillObserver.observe(skillSection);
});

// ==============================
// Excel Download
// ==============================
function downloadExcel(file) {
  window.location.href = file;
}

// ==============================
// Contact Form Submission (Ajax)
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const status = document.createElement("p");
    status.style.color = "#00ff88";
    status.style.textAlign = "center";
    status.style.marginTop = "10px";

    const oldStatus = form.querySelector("p");
    if (oldStatus) oldStatus.remove();

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          status.textContent = "Message sent successfully!";
          form.appendChild(status);
          form.reset();
        } else {
          response.json().then(data => {
            if (data.errors) {
              status.textContent = data.errors.map(error => error.message).join(", ");
            } else {
              status.textContent = "Oops! There was a problem submitting your form.";
            }
            form.appendChild(status);
          });
        }
      })
      .catch(() => {
        status.textContent = "Oops! There was a problem submitting your form.";
        form.appendChild(status);
      });
  });
});
