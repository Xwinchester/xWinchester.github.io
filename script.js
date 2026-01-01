class PageController {
    constructor() {
        // Navigation buttons
        this.navButtons = document.querySelectorAll("[data-target]");

        // Footer
        this.yearSpan = document.getElementById("year");

        this.init();
    }

    init() {
        this.bindNavEvents();
        this.setYear();
    }

    bindNavEvents() {
        this.navButtons.forEach(button => {
            button.addEventListener("click", () => {
                const targetId = button.dataset.target;
                const section = document.getElementById(targetId);

                if (!section) return;

                section.scrollIntoView({ behavior: "smooth" });
            });
        });
    }

    setYear() {
        if (this.yearSpan) {
            this.yearSpan.textContent = new Date().getFullYear();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new PageController();
});
