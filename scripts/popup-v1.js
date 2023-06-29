// Popup V 1.2
// by Aleksander Knöbl

(function(){

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function popupHide(wrapper) {
    wrapper.style.display = 'none';
    document.documentElement.classList.remove('popup-open');
  }
  function popupShow(wrapper) {
    wrapper.style.display = 'flex';
    document.documentElement.classList.add('popup-open');
  }
  function initiateShowButton(button) {
    const popupID = button.dataset.popupId || button.querySelector('[data-popup-id]').dataset.popupId;
    const popup = document.querySelector('#' + popupID);
    if (popup) {
      button.addEventListener('click', () => { popupShow(popup) });
    }
  }
  function initiatePopup(wrapper) {
    wrapper.id = wrapper.dataset.popupId || wrapper.querySelector('[data-popup-id]').dataset.popupId;
    wrapper.querySelectorAll('[data-popup="hide"]').forEach(elem => {
      elem.addEventListener('click', () => { popupHide(wrapper) });
    });
    // prev- & next-buttons
    const navButtons = [
      {
        'button': wrapper.querySelector('[data-popup="prev"]'),
        'wrapper': wrapper.previousElementSibling,
      },
      {
        'button': wrapper.querySelector('[data-popup="next"]'),
        'wrapper': wrapper.nextElementSibling,
      },
    ];
    navButtons.forEach(elem => {
      if (elem.button) {
        if (elem.wrapper && elem.wrapper.dataset.popup == 'wrapper') {
          elem.button.addEventListener('click', () => {
            wrapper.style.display = 'none';
            elem.wrapper.style.display = 'flex';
          });
        } else {
          elem.button.style.opacity = '0%';
          elem.button.style.pointerEvents = 'none';
        };
      };
    });
    // show on page load
    const init = wrapper.getAttribute('data-popup-show-init');
    if (init == 'true') {
      // show always
      popupShow(wrapper);
    } else if (Number.isInteger(parseInt(init, 10))) {
      // show once per session after time
      let sessionItem = sessionStorage.getItem(wrapper.id);
      if (!sessionItem) {
        sleep(parseInt(init, 10)).then(() => {
          popupShow(wrapper);
          sessionStorage.setItem(wrapper.id, 'true');
        });
      }
    }
  }
  
  // run
  document.querySelectorAll('[data-popup="wrapper"]').forEach(wrapper => { initiatePopup(wrapper) });
  document.querySelectorAll('[data-popup="show"]').forEach(button => { initiateShowButton(button) });
  
})();