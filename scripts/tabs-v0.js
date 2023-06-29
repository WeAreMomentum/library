// Tabs V 0.2
// by Aleksander Knöbl

(function(){

  document.querySelectorAll('[data-tabs="wrapper"]').forEach(wrapper => {
    const allContents = [...wrapper.querySelectorAll('[data-tabs="content"]')];
    const allTriggers = [...wrapper.querySelectorAll('[data-tabs="trigger"]')];
    allContents.forEach(content => {
      if (!content.dataset.tabsSlug) {
        content.dataset.tabsSlug = content.querySelector('[data-tabs="slug"]').dataset.tabsSlug;
      };
    });
    allTriggers.forEach(trigger => {
      if (!trigger.dataset.tabsSlug) {
        trigger.dataset.tabsSlug = trigger.querySelector('[data-tabs="slug"]').dataset.tabsSlug;
      };
      const content = allContents.find(elem => elem.dataset.tabsSlug == trigger.dataset.tabsSlug);
      function changeTab() {
        allTriggers.forEach(elem => { elem.classList.remove('active') });
        trigger.classList.add('active');
        allContents.forEach(elem => { elem.style.display = 'none' });
        content.style.display = 'block';
      }
      trigger.addEventListener('click', changeTab);
    });
    let index = 0;
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab');
    if (tab) index = allTriggers.findIndex(elem => elem.dataset.tabsSlug == tab);
    if (wrapper.querySelector('[data-filter]')) {
      setTimeout(() => allTriggers[index].click(), 1000);
    } else {
      allTriggers[index].click();
    }
  });

})();