// Weglot Conditional Display V 1.0
// by Aleksander Knöbl

(function(){

  function conditionalDisplay(lang) {
    const langElements = [...document.querySelectorAll('[data-weglot-conditional-display]')];
    const currentLangElements = langElements.filter(elem => elem.dataset.weglotConditionalDisplay.includes(lang));
    langElements.forEach(elem => {
      elem.classList.add('hidden');
    });
    currentLangElements.forEach(elem => {
      elem.classList.remove('hidden');
    });
  }
  Weglot.on('languageChanged', function(newLang, prevLang) {
    conditionalDisplay(newLang);
  })
  Weglot.on("switchersReady", function(initialLanguage) {
    conditionalDisplay(initialLanguage);
  })
  
})();