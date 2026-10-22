
/* CP SANITARY - INTERACTIVE WEBSITE */

document.documentElement.classList.add("js-ready");

/* 1. PRELOADER */

const preloader = document.getElementById("preloader");

function hidePreloader() {
    if (preloader) {
        preloader.classList.add("hide");
    }
}

window.addEventListener("load", hidePreloader);

// Fallback: slow internet par preloader ko indefinitely na rehne do.
setTimeout(hidePreloader, 2500);


/* 2. AUTOMATIC COPYRIGHT YEAR */

const currentYear = new Date().getFullYear();

document.getElementById("heroYear").textContent = currentYear;
document.getElementById("footerYear").textContent = currentYear;


/* 3. MOBILE NAVBAR */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});


/* 4. NAVBAR SCROLL EFFECT */

const navbar = document.getElementById("navbar");

function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


/* 5. SCROLL REVEAL ANIMATION */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {

    // Older browsers: show content without scroll animations.
    revealElements.forEach(function (element) {
        element.classList.add("show");
    });

}


/* 6. PRODUCT CATEGORY FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.filter;

        // Active button change
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        // Filter the cards
        productCards.forEach(function (card) {

            const category = card.dataset.category;

            const shouldShow =
                selectedCategory === "all" ||
                category === selectedCategory;

            card.classList.toggle("filtered-out", !shouldShow);

            if (shouldShow) {
                card.classList.remove("show");
                void card.offsetWidth;
                card.classList.add("show");
            }

        });

    });

});


/* 7. ACTIVE NAVIGATION LINK */

const pageSections = document.querySelectorAll(
    "#home, #about, #collections, #why-us, #contact"
);

const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(function (link) {
                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {
                            link.classList.add("active");
                        }
                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });

}


/* 8. WHATSAPP INQUIRY */

/*
   Replace this sample with your actual business number.
   Pakistan format: 92 + mobile number without the first zero.
   Example format: 923001234567
*/

const whatsappNumber = "923001234567";

const whatsappMessage =
    "Assalam o Alaikum! I am interested in CP Sanitary products. Please share your product details and prices.";

const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(whatsappMessage);

const whatsappButtons = [
    document.getElementById("whatsappBtn"),
    document.getElementById("floatingWhatsapp")
];

whatsappButtons.forEach(function (button) {

    if (button) {
        button.href = whatsappURL;
        button.target = "_blank";
        button.rel = "noopener noreferrer";
    }

});


/* 9. PREVENT EMPTY EMAIL LINK */

const emailLink = document.querySelector(
    '.contact-actions a[href^="mailto:"]'
);

if (emailLink) {
    emailLink.addEventListener("click", function (event) {

        if (emailLink.href.includes("YOUR_EMAIL@example.com")) {
            event.preventDefault();

            alert(
                "Please add your actual business email in index.html."
            );
        }

    });
    
/* ===== ADVANCED MOUSE ANIMATIONS ===== */

const heroVisual = document.querySelector(".hero-visual");
const heroFrame = document.querySelector(".hero-image-frame");

if (
    heroVisual &&
    heroFrame &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
    heroVisual.addEventListener("mousemove", function (event) {
        const rect = heroVisual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        heroFrame.style.transform =
            "rotateX(" + rotateX + "deg) " +
            "rotateY(" + rotateY + "deg)";
    });

    heroVisual.addEventListener("mouseleave", function () {
        heroFrame.style.transform = "rotateX(0) rotateY(0)";
    });
}

/* Product cards 3D tilt */

const cards = document.querySelectorAll(".product-card");

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    cards.forEach(function (card) {
        card.addEventListener("mousemove", function (event) {
            if (card.classList.contains("filtered-out")) return;

            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 10;
            const rotateX = (0.5 - y) * 10;

            card.style.transform =
                "perspective(900px) rotateX(" + rotateX + "deg) " +
                "rotateY(" + rotateY + "deg) translateY(-6px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });
    });
}

}
