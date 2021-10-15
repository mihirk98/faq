// FAQ data
const titles = [
  "How much am I going to save?",
  "It if runs all the time, won’t it be expensive?",
  "What if 215L is just not enough for me?",
  "When will the upgrade get done?",
  "How much will it cost me?",
];
const contents = [
  "Customers transitioning from electrical hot water systems should see an approximate 60% reduction in costs compared to their existing solution.",
  "Current electrical systems are extremely inefficient with managing and maintaining optimal heat levels. While the heat pumps in our solution are continuously running, the compressor fan only kicks in when it needs to be refilled. Our tanks are designed to insulate the heat inside and keep the water inside hot for a long time.",
  "Our tanks are designed to automatically start the refilling and heating process when water reaches a certain level. Under normal consumption patterns, it would take 6 people bathing back-to-back for a tank to drain completely. If you still have concerns, please reach out to our team to explore a dual-tank setup.",
  "Installations are executed in groupings. Our installers will contact you when there are enough bookings in your area.",
  "Pricing is based on the provisions made available by the South Australian and Victorian governments. If applicable, there may be additional charges for relocating your existing water system.",
];

// Store faqContentHeights
var faqContentHeights = [];

window.addEventListener("load", onLoad);
window.addEventListener("orientationchange", pageSetUp);
window.addEventListener("resize", pageSetUp);

function onLoad() {
  pageSetUp();
  addFAQs();
}

function addFAQs() {
  let contentBodyMainFAQsEl = document.getElementById("content-body-main-faq");
  for (let i = 0; i < titles.length; i++) {
    let faq = document.createElement("faq-component");
    faq.setAttribute("title", titles[i]);
    faq.setAttribute("content", contents[i]);
    faq.setAttribute("index", i);
    contentBodyMainFAQsEl.appendChild(faq);

    // Store faq content height in faqContentHeights
    faqContentHeight();
    function faqContentHeight() {
      // Get FAQ content height
      let faqDivPEl = document.getElementById("faq-content-" + i);
      faqContentHeights.push(faqDivPEl.offsetHeight);
      // Set FAQ content height to 0px
      faqDivPEl.style.height = "0px";
    }

    // Open first FAQ
    if (i === 0) faqTitleClick(i);
  }
}

function pageSetUp() {
  headerNavOverflowListener();
  setContentLandingHeight();
  setContentLandingLeftH2FontSize();
}

function headerNavOverflowListener() {
  toggleHeaderNav();
  function toggleHeaderNav() {
    let headerNav = document.getElementById("header-container-nav");
    let headerNavHamburger = document.getElementById(
      "header-container-hamburger-menu"
    );
    if (checkWidthOverflow(headerNav)) {
      headerNav.style.visibility = "hidden";
      headerNavHamburger.style.display = "flex";
    } else {
      headerNav.style.visibility = "visible";
      headerNavHamburger.style.display = "none";
    }
  }
}

function setContentLandingHeight() {
  let contentLandingEl = document.getElementById("content-landing");
  let header = document.getElementById("header");
  let windowHeight = window.innerHeight;
  let contentLandingHeight = windowHeight - header.offsetHeight;
  contentLandingEl.style.height = contentLandingHeight + "px";
}

function setContentLandingLeftH2FontSize() {
  let contentLanding = document.getElementById("content-landing");
  let contentLandingLeft = document.getElementById("content-landing-left");
  let contentLandingLeftH2 = document.getElementById("content-landing-left-h2");
  if (contentLandingLeft.offsetHeight > contentLanding.offsetHeight) {
    contentLandingLeftH2.style.fontSize = "3rem";
  } else {
    contentLandingLeftH2.style.fontSize = "4rem";
  }
}

// Click listeners
function faqTitleClick(i) {
  let contentBodyMainFAQsEl = document.getElementById("content-body-main-faq");
  let faqs = contentBodyMainFAQsEl.getElementsByTagName("faq-component");
  let faqDivEl = faqs[i].getElementsByClassName("faq");
  let faqDivTitleEl = faqDivEl[0].getElementsByClassName("faq-title");
  let faqDivTitleH3El = faqDivTitleEl[0].getElementsByClassName("faq-title-h3");
  let faqDivTitleExpand = faqDivTitleEl[0].getElementsByClassName("faq-expand");
  let faqDivTitleExpandVertical = faqDivTitleExpand[0].getElementsByClassName(
    "faq-expand-vertical"
  );
  let faqDivTitleExpandHorizontal = faqDivTitleExpand[0].getElementsByClassName(
    "faq-expand-horizontal"
  );
  let faqDivPEl = document.getElementById("faq-content-" + i);
  if (faqDivPEl.style.opacity == 0) {
    // FAQ title color
    faqDivTitleH3El[0].style.color = "#ee7623";
    // FAQ expand animation
    faqDivTitleExpandHorizontal[0].style.backgroundColor = "#ee7623";
    faqDivTitleExpandVertical[0].style.transform = "rotate(90deg)";
    faqDivTitleExpandVertical[0].style.opacity = 0;
    // FAQ content animation
    faqDivPEl.style.paddingTop = "1rem";
    faqDivPEl.style.height = faqContentHeights[i] + "px";
    faqDivPEl.style.opacity = 1;
  } else {
    // FAQ title color
    faqDivTitleH3El[0].style.color = "#383737";
    // FAQ minimize animation
    faqDivTitleExpandHorizontal[0].style.backgroundColor = "#979797";
    faqDivTitleExpandVertical[0].style.transform = "rotate(0deg)";
    faqDivTitleExpandVertical[0].style.opacity = 1;
    // FAQ content animation
    faqDivPEl.style.paddingTop = "0rem";
    faqDivPEl.style.height = "0px";
    faqDivPEl.style.opacity = 0;
  }
}

// Util
// Determines if element width is overflowing
// Parent must have overflow: hidden and white-space: nowrap; set
function checkWidthOverflow(el) {
  let elOffsetWidth = el.offsetWidth;
  let elScrollWidth = el.scrollWidth;

  return elOffsetWidth < elScrollWidth;
}
