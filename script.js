// Import GSAP library.  Make sure you have included the GSAP library in your HTML file.  e.g., <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
import gsap from "gsap"

document.addEventListener("DOMContentLoaded", () => {
  // Welcome animation
  const welcomeAnimation = document.getElementById("welcome-animation")
  gsap.to(welcomeAnimation, {
    opacity: 0,
    duration: 1.5,
    delay: 2,
    onComplete: () => {
      welcomeAnimation.style.display = "none"
    },
  })

  // Responsive navigation
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active")

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })

    burger.classList.toggle("toggle")
  })

  // Page navigation
  const mainContent = document.getElementById("main-content")
  const navItems = document.querySelectorAll(".nav-links a, .cta-button")

  async function loadContent(page) {
    try {
      const response = await fetch(`${page}.html`)
      const content = await response.text()
      mainContent.innerHTML = content
      initializePageAnimations()
    } catch (error) {
      console.error("Error loading page:", error)
      mainContent.innerHTML = "<p>Error loading content. Please try again.</p>"
    }
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      const page = e.target.getAttribute("data-page")
      loadContent(page)
    })
  })

  // Load initial content (Beranda)
  loadContent("beranda")

  // Scroll character animation
  const scrollCharacter = document.querySelector(".scroll-character")
  gsap.to(scrollCharacter, {
    y: "100vh",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  })

  function initializePageAnimations() {
    // Scroll animations for sections
    gsap.utils.toArray("section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
    })

    // Registration form submission
    const registrationForm = document.getElementById("registration-form")
    if (registrationForm) {
      registrationForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(registrationForm)
        const registrationNumber = generateRegistrationNumber()

        // Here you would typically send the form data to a server
        // For this example, we'll just show an alert with the registration number
        alert(`Pendaftaran berhasil! Nomor pendaftaran Anda: ${registrationNumber}`)
        registrationForm.reset()
      })
    }
  }

  function generateRegistrationNumber() {
    return "REG" + Math.random().toString(36).substr(2, 8).toUpperCase()
  }
})

