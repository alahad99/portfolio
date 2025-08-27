// Portfolio interactivity
console.log("Portfolio Loaded!");

// Simple smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


//text animation //
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("typed-text");
  const words = ["Graphics", "Designer"];
  let wordIndex = 0;
  let charIndex = 0;

  function typeWordByWord() {
    if (wordIndex < words.length) {
      const currentWord = words[wordIndex];
      textElement.textContent = words.slice(0, wordIndex).join(" ") + " " + currentWord.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex <= currentWord.length) {
        setTimeout(typeWordByWord, 150);
      } else {
        wordIndex++;
        charIndex = 0;
        setTimeout(typeWordByWord, 500);
      }
    } else {
      // All words typed, reset after 3 seconds
      setTimeout(() => {
        wordIndex = 0;
        charIndex = 0;
        textElement.textContent = "";
        typeWordByWord();
      }, 3000);
    }
  }

  typeWordByWord();
});

  //from empty
 document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact form");
    
    form.addEventListener("submit", function (e) {
      e.preventDefault();  // ফর্ম সাবমিট ডিফল্ট একশন আটকাবে
      
      const formData = new FormData(form);
      const status = document.createElement("p");
      status.style.color = "#00ff88";
      status.style.textAlign = "center";
      status.style.marginTop = "10px";

      // যদি আগের মেসেজ থাকে, ফর্ম থেকে সরিয়ে ফেলো
      const oldStatus = form.querySelector("p");
      if(oldStatus) oldStatus.remove();

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      })
      .then(response => {
        if(response.ok) {
          status.textContent = "Message sent successfully!";
          form.appendChild(status);
          form.reset();  // ফর্ম ক্লিয়ার করবে
        } else {
          response.json().then(data => {
            if(data.errors) {
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

// Portfolio interactivity
console.log("Portfolio Loaded!");

// Simple smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


//text animation //
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("typed-text");
  const words = ["Graphics", "Designer"];
  let wordIndex = 0;
  let charIndex = 0;

  function typeWordByWord() {
    if (wordIndex < words.length) {
      const currentWord = words[wordIndex];
      textElement.textContent = words.slice(0, wordIndex).join(" ") + " " + currentWord.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex <= currentWord.length) {
        setTimeout(typeWordByWord, 150);
      } else {
        wordIndex++;
        charIndex = 0;
        setTimeout(typeWordByWord, 500);
      }
    } else {
      // All words typed, reset after 3 seconds
      setTimeout(() => {
        wordIndex = 0;
        charIndex = 0;
        textElement.textContent = "";
        typeWordByWord();
      }, 3000);
    }
  }

  typeWordByWord();
});


//excel
  function downloadExcel() {
    window.location.href = 'img/admission.xlsx'; 
  }

//skill
  const skillSection = document.querySelector('#skill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  skillObserver.observe(skillSection);

  //from empty
 document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact form");
    
    form.addEventListener("submit", function (e) {
      e.preventDefault();  // ফর্ম সাবমিট ডিফল্ট একশন আটকাবে
      
      const formData = new FormData(form);
      const status = document.createElement("p");
      status.style.color = "#00ff88";
      status.style.textAlign = "center";
      status.style.marginTop = "10px";

      // যদি আগের মেসেজ থাকে, ফর্ম থেকে সরিয়ে ফেলো
      const oldStatus = form.querySelector("p");
      if(oldStatus) oldStatus.remove();

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      })
      .then(response => {
        if(response.ok) {
          status.textContent = "Message sent successfully!";
          form.appendChild(status);
          form.reset();  // ফর্ম ক্লিয়ার করবে
        } else {
          response.json().then(data => {
            if(data.errors) {
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
//end