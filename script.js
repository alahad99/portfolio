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

  const words = ["3D Artist",
    "Product Visualization Specialist",
    "3D Modeler & Renderer",
    "Lighting & CGI Artist"];
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


document.addEventListener("DOMContentLoaded", () => {

  const btns = document.querySelectorAll(".filter-btn");
  const graphics = document.getElementById("graphics-section");
  const cyber = document.getElementById("cyber-section");
  const arrow = document.getElementById("arrow-icon");

  // ===============================
  // Default State (Graphics Active)
  // ===============================
  graphics.classList.add("top", "slide-up");
  cyber.classList.add("bottom", "slide-down");
  arrow.className = "fas fa-arrow-left";

  btns.forEach(btn => {
    btn.addEventListener("click", () => {

      // active button
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      // ===============================
      // GRAPHICS CLICK
      // ===============================
      if (filter === "graphics") {

        arrow.className = "fas fa-arrow-left";

        graphics.classList.add("top", "slide-up");
        graphics.classList.remove("bottom", "slide-down");

        cyber.classList.add("bottom", "slide-down");
        cyber.classList.remove("top", "slide-up");
      }

      // ===============================
      // CYBER CLICK
      // ===============================
      else if (filter === "cyber") {

        arrow.className = "fas fa-arrow-right";

        cyber.classList.add("top", "slide-up");
        cyber.classList.remove("bottom", "slide-down");

        graphics.classList.add("bottom", "slide-down");
        graphics.classList.remove("top", "slide-up");
      }

    });
  });

});




//video size fix>>>>>>>>>>>>>>>>>>>//
document.querySelectorAll(".video-wrapper video").forEach(video => {

  video.addEventListener("play", () => {
    video.parentElement.classList.add("active");
  });

  video.addEventListener("ended", () => {
    video.parentElement.classList.remove("active");
  });

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




//////////////////////



// ==========================================
// POPUP FULL GALLERY WITH NAV + THUMBNAILS
// ==========================================
const lightbox = document.getElementById("lightbox");
const viewerImg = document.getElementById("viewer-img");
const viewerVideo = document.getElementById("viewer-video");
const thumbStrip = document.getElementById("thumb-strip");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const closeBtn3 = document.querySelector(".close-btn");

let currentItems = [];
let currentIndex = 0;

// Main function to show item
function showItem(index) {
  const item = currentItems[index];

  viewerImg.style.display = "none";
  viewerVideo.style.display = "none";

  if (item.tagName === "IMG") {
    viewerImg.src = item.src;
    viewerImg.style.display = "block";
  } else {
    viewerVideo.src = item.src;
    viewerVideo.style.display = "block";
  }

  // Active thumbnail highlight
  document.querySelectorAll(".thumb-strip *").forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
}

// ==============================
// When clicking a card (FINAL)
// ==============================

document.querySelectorAll(".media-box").forEach(box => {
  box.addEventListener("click", () => {

    currentItems = [];
    currentIndex = 0;

    // -------------------------
    // Collect media
    // -------------------------
    const main = box.querySelector(".main-preview");
    if (main) currentItems.push(main);

    box.querySelectorAll(".extra").forEach(extra => {
      currentItems.push(extra);
    });

    // -------------------------
    // LIGHTBOX DESCRIPTION
    // -------------------------
    const lightboxDesc = document.getElementById("lightbox-desc");
    const card = box.closest(".card");
    const desc = card ? card.querySelector(".project-desc") : null;

    if (lightboxDesc && desc && desc.textContent.trim() !== "") {
      lightboxDesc.textContent = desc.textContent.trim();
      lightboxDesc.style.display = "block";
    } else if (lightboxDesc) {
      lightboxDesc.textContent = "";
      lightboxDesc.style.display = "none";
    }

    // -------------------------
    // Build thumbnails
    // -------------------------
    thumbStrip.innerHTML = "";

    currentItems.forEach((media, i) => {

      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";

      const t = media.cloneNode(true);
      t.style.display = "block";
      t.controls = false;

      t.addEventListener("click", () => {
        currentIndex = i;
        showItem(currentIndex);
      });

      wrapper.appendChild(t);

      // Video badge
      if (media.tagName === "VIDEO") {
        const badge = document.createElement("span");
        badge.classList.add("thumb-video-icon");
        badge.innerHTML = `<i class="fas fa-play"></i>`;
        wrapper.appendChild(badge);
      }

      thumbStrip.appendChild(wrapper);
    });

    // -------------------------
    // Show lightbox
    // -------------------------
    lightbox.style.display = "flex";
    showItem(0);
  });
});


// next
nextBtn.addEventListener("click", () => {
  if (currentIndex < currentItems.length - 1) {
    currentIndex++;
    showItem(currentIndex);
  }
});

// prev
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showItem(currentIndex);
  }
});

// close
closeBtn3.addEventListener("click", () => {
  lightbox.style.display = "none";
  viewerVideo.pause();
});


// <<<<  FIXED: Build thumbnails   >>>>
function showItem(index) {
  if (!currentItems || currentItems.length === 0) return;

  currentIndex = index;
  const item = currentItems[index];
  const videoIcon = document.getElementById("video-icon");

  // reset view
  viewerImg.style.display = "none";
  viewerVideo.style.display = "none";
  videoIcon.style.display = "none";

  // show correct media
  if (item.tagName === "IMG") {
    viewerImg.src = item.src;
    viewerImg.style.display = "block";
  }
  else if (item.tagName === "VIDEO") {
    viewerVideo.src = item.src;
    viewerVideo.style.display = "block";
    videoIcon.style.display = "block";
  }

  const thumbs = document.querySelectorAll("#thumb-strip img, #thumb-strip video");

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });

  // auto scroll slider to active thumb
  const activeThumb = thumbs[index];
  if (activeThumb) {
    activeThumb.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }


  // ===============================
  // FIX: ONLY ONE ACTIVE THUMBNAIL
  // ===============================
  document.querySelectorAll("#thumb-strip img, #thumb-strip video").forEach((thumb, i) => {
    thumb.classList.remove("active");
    if (i === index) {
      thumb.classList.add("active");
    }
  });
}

