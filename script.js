class PageController {
    constructor() {
        this.navButtons = document.querySelectorAll("[data-target]");
        this.yearSpan = document.getElementById("year");
        this.subtitle = document.querySelector(".subtitle");
        
        // The "G-Code" sequence to type out
        this.gcodeSequence = [
            "G28 G91 Z0.",
            "T1 M06",
            "G0 G90 G54 X0. Y0.",
            "G43 H1 Z1. M08",
            "CNC Programmer • Automation • Process Optimization"
        ];

        this.init();
    }

    
    init() {
        this.bindNavEvents();
        this.setYear();
        this.runTerminalEffect();
        this.revealSections(); 
    }

    revealSections() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.25 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    bindNavEvents() {
        this.navButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Check for both ID and section name (your HTML used 'about' for 'about-me')
                const targetId = button.dataset.target;
                let section = document.getElementById(targetId) || 
                              document.getElementById(`${targetId}-me`);

                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }

    async runTerminalEffect() {
        if (!this.subtitle) return;
        
        this.subtitle.innerHTML = ""; // Clear existing text
        this.subtitle.style.fontFamily = "monospace";

        for (let line of this.gcodeSequence) {
            await this.typeLine(line);
            // If it's not the last line, pause then clear for the next "command"
            if (line !== this.gcodeSequence[this.gcodeSequence.length - 1]) {
                await new Promise(r => setTimeout(r, 600));
                this.subtitle.innerHTML = "";
            }
        }
    }

    typeLine(text) {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                this.subtitle.innerHTML += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, 80); // Typing speed in ms
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

