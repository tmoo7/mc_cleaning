const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to section
    if ((href !== "#") & href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile nav
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////
// Sticky Nav

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) document.body.classList.add("sticky");

    if (ent.isIntersecting === true) document.body.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////
// Testimonial Slider

const testimonials = [
  {
    name: "Emily T.",
    testimonial:
      "I am extremely satisfied with Mc Cleaning's top-notch cleaning service. They exceeded all my expectations and left my home sparkling clean. The team was professional, efficient, and friendly. I highly recommend Mc Cleaning for anyone looking for a reliable cleaning service.",
  },
  {
    name: "Sarah G.",
    testimonial:
      "MC Cleaning has been a game-changer for me! Their team is professional, thorough, and left my home sparkling clean with eco-friendly products. I also had them clean my office, and the transformation was amazing. I highly recommend them for anyone needing a reliable cleaning service!",
  },
  {
    name: "Gage S.",
    testimonial:
      "MC Cleaning has completely transformed our office! Their team is punctual, professional, and incredibly thorough. Since we started using their services, our workspace has never looked better. I highly recommend MC Cleaning for any business seeking a clean and healthy environment!",
  },
];

const slides = document.querySelector(".testimonial");
const btnNext = document.querySelector(".icon-forward");
const btnPrev = document.querySelector(".icon-back");

let curSlide = 0;
const maxSlide = testimonials.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

btnNext.addEventListener("click", () => {
  curSlide = (maxSlide + curSlide + 1) % maxSlide;
  displayTestimonial();
});
btnPrev.addEventListener("click", () => {
  curSlide = (maxSlide + curSlide - 1) % maxSlide;
  displayTestimonial();
});

let displayTestimonial = () => {
  slides.innerHTML = `
  <blockquote class="testimonial-txt">${testimonials[curSlide].testimonial}</blockquote>
  <p class="testimonial-name">${testimonials[curSlide].name}</p>
  `;
};
window.onload = displayTestimonial;

///////////////////////////////////////////////////////
// Form Submission
document
  .getElementById("cta-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("successMessage").innerHTML =
      "Form submitted successfully!";
  });

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
