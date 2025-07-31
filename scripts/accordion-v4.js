/**
 * Accessible Accordion V4
 * - Based directly on the original V3 script by Aleksander Knöbl.
 * - Adds ARIA attributes (aria-expanded, aria-controls) for accessibility.
 * - Adds tabindex management for keyboard navigation.
 * - Retains all original logic and class names (.active) for full backward compatibility.
 */
(function () {
	class Group {
		constructor(htmlElement) {
			this.element = htmlElement;
			this.accordions = [];
			this.closeAllTriggers = [];
			this.options = {
				openAll: (this.element.dataset.accordionOpenAll || "false") === "true",
				initFirst:
					(this.element.dataset.accordionInitFirst || "false") === "true",
				initAll: (this.element.dataset.accordionInitAll || "false") === "true",
				sync: (this.element.dataset.accordionSync || "false") === "true",
			};
			this.options.openAll =
				this.options.openAll || this.options.initAll || this.options.sync;
			if (this.options.sync) this.options.initFirst = false;

			let counter = 0; // For unique IDs
			this.element
				.querySelectorAll('[data-accordion="accordion"]')
				.forEach((elem) => {
					this.accordions.push(new Accordion(elem, this, counter++));
				});

			this.element
				.querySelectorAll('[data-accordion="close-all"]')
				.forEach((elem) => {
					this.closeAllTriggers.push(new CloseAllTrigger(elem, this));
				});
			if (this.options.initAll)
				this.accordions.forEach((elem) => elem.toggle());
			else if (this.options.initFirst) this.accordions[0].toggle();
		}
	}

	class Accordion {
		constructor(htmlElement, group, index) {
			this.element = htmlElement;
			this.group = group;
			this.trigger = this.element.querySelector('[data-accordion="trigger"]');
			this.content = this.element.querySelector('[data-accordion="content"]');

			// NEU: Accessibility-Setup
			const panelId = `accordion-panel-${index}`;
			this.content.setAttribute("id", panelId);
			this.trigger.setAttribute("aria-controls", panelId);
			this.focusableElements = this.content.querySelectorAll(
				"a, button, input, select, textarea"
			);

			this.toggle = this.toggle.bind(this);
			this.trigger.addEventListener("click", this.toggle);
			this.close();
		}

		close() {
			this.element.classList.remove("active");
			this.content.style.maxHeight = "0px";

			// NEU: ARIA-Status und Tabindex setzen
			this.trigger.setAttribute("aria-expanded", "false");
			this.focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
		}

		open() {
			this.element.classList.add("active");
			this.content.style.maxHeight = this.content.scrollHeight + "px";

			// NEU: ARIA-Status und Tabindex setzen
			this.trigger.setAttribute("aria-expanded", "true");
			this.focusableElements.forEach((el) => el.removeAttribute("tabindex"));
		}

		toggle() {
			// This is the original, proven toggle logic from V3
			if (this.group.options.sync) {
				this.element.classList.contains("active")
					? this.group.accordions.forEach((elem) => elem.close())
					: this.group.accordions.forEach((elem) => elem.open());
			} else {
				const isActive = this.element.classList.contains("active");
				if (!this.group.options.openAll) {
					this.group.accordions
						.filter((elem) => elem != this)
						.forEach((elem) => elem.close());
				}
				isActive ? this.close() : this.open();
			}
		}
	}

	class CloseAllTrigger {
		// This class remains unchanged from the original
		constructor(htmlElement, group) {
			this.element = htmlElement;
			this.group = group;
			this.closeAll = this.closeAll.bind(this);
			this.element.addEventListener("click", this.closeAll);
		}
		closeAll() {
			this.group.accordions.forEach((accordion) => accordion.close());
		}
	}

	// run
	document
		.querySelectorAll('[data-accordion="group"]')
		.forEach((elem) => new Group(elem));
})();
