///////////////////////////////////////////////////////////
// adding the current year dynamically to our website: 
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// making the mobile navigation work:
const headerEL = document.querySelector(".header");
const btnNav = document.querySelector(".btn-mobile-nav");

btnNav.addEventListener("click", function(){
  headerEL.classList.toggle("nav-open");
})
///////////////////////////////////////////////////////////
// Smooth scrolling animation: 
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link){
  link.addEventListener("click", function (e){
    e.preventDefault();
    const href = link.getAttribute("href");
    // scroll back to top:
    if (href === "#") window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // scroll to other links
    if (href !== "#" && href.startsWith("#")){
      const sectionEl = document.querySelector(href);
      // we couldn't use scrollTo, because we can't know which pixel to scroll to.
      sectionEl.scrollIntoView({behavior:"smooth"});
    }
    // close Mobile Navigation:
    if (link.classList.contains("main-nav-link")){
      headerEL.classList.toggle("nav-open");
    }
  });
})

///////////////////////////////////////////////////////////
// Sticky navigation:
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(function(entries){
  const ent = entries[0];
  if (ent.isIntersecting === false){
    document.body.classList.add("sticky");
  }
  if (ent.isIntersecting === true){
    document.body.classList.remove("sticky");
  }
}, 
{
  // in the viewport
  root: null,
  threshold: 0,
  // 80px since height of navigation bar is 8rem, rem or % don't work here
  // that's also why it was important to set the height manually
  // so we're forced to used px.
  rootMargin: "-80px",
});
obs.observe(sectionHeroEl);


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

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
paste this in queries for the next couples years so that if browsers don't support flex gap it will replace them with margins
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
