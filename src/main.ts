import "./styles.css";

const ideas = [
  "Legacy debate clips from match-day moments",
  "Faceless football explainers from one fixture",
  "Fan gear pages that route attention into links",
  "AI edit workflows for football pages",
  "Match-day newsletters built from social trends",
];

const rotatingIdea = document.querySelector<HTMLElement>(".rotating-idea");
let ideaIndex = 0;

if (rotatingIdea && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => {
    ideaIndex = (ideaIndex + 1) % ideas.length;
    rotatingIdea.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(-8px)" },
      ],
      { duration: 180, easing: "ease-out" },
    ).finished.then(() => {
      rotatingIdea.textContent = ideas[ideaIndex];
      rotatingIdea.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 220, easing: "ease-out" },
      );
    });
  }, 2600);
}

const status = document.querySelector<HTMLElement>("#download-status");
document.querySelectorAll<HTMLAnchorElement>(".js-free-download").forEach((link) => {
  link.addEventListener("click", () => {
    if (!status) return;
    status.textContent = "Downloading the free starter PDF...";
    window.setTimeout(() => {
      status.textContent = "If the download did not start, check your browser downloads.";
    }, 1800);
  });
});
