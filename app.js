document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("langToggle");
    const plBlock = document.getElementById("pl");
    const enBlock = document.getElementById("en");

    // Przełączanie języka
    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const enVisible = enBlock.style.display !== "none";
            if (enVisible) {
                enBlock.style.display = "none";
                plBlock.style.display = "block";
            } else {
                enBlock.style.display = "block";
                plBlock.style.display = "none";
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Fade-in sekcji przy scrollu
    const fadeSections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    fadeSections.forEach(section => observer.observe(section));

    // Parallax
    const layers = document.querySelectorAll(".parallax-layer");

    const updateParallax = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth || "0.2");
            const translateY = scrollY * depth;
            layer.style.transform = `translateY(${translateY}px)`;
        });
    };

    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();

    // GENERACJA DESZCZU 0/1 – jaśniej, wolniej, gęściej
    const rain = document.querySelector(".binary-rain");
    if (rain) {
        const columns = 32; // ile słupów cyfr
        const baseString = "01011001011010010110";

        for (let i = 0; i < columns; i++) {
            const col = document.createElement("div");
            col.className = "binary-column";

            // więcej znaków w kolumnie (gęściej)
            let str = "";
            const len = 45 + Math.floor(Math.random() * 35); // 45–80 linii
            for (let j = 0; j < len; j++) {
                const ch = baseString[Math.floor(Math.random() * baseString.length)];
                str += ch + "\n";
            }
            col.textContent = str;

            // równomiernie po szerokości
            const left = (i / columns) * 100;
            col.style.left = left + "%";

            // wolniejszy ruch – dłuższy czas animacji
            const speed = 16 + Math.random() * 12; // 16–28 sekund
            col.style.setProperty("--speed", speed + "s");
            col.style.animationDelay = (-Math.random() * speed) + "s";

            rain.appendChild(col);
        }

        rain.style.display = "block";
    }
});