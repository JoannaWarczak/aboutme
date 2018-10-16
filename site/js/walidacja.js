//PODPOWIEDZI DLA UŻYTKOWNIKA

const FormValidate = function (form, options) {
   const defaultOptions = {
      classError: 'error'
   }

   this.form = form;
   this.options = Object.assign({}, defaultOptions, options);

   //wyłączamy htmlową walidację
   this.form.setAttribute('novalidate', 'novalidate');

   this.prepareElements();
};

FormValidate.prototype.prepareElements = function () {
   const elements = this.form.querySelectorAll('[required]');

   [].forEach.call(elements, function (element) {
      //sprawdzamy typ pola
      if (element.nodeName.toUpperCase() === 'INPUT') {
         const type = element.type.toUpperCase();

         //dla każdego pola dodajemy obsługę funkcji sprawdzającej
         if (type === 'TEXT') {
            element.addEventListener('input', function (e) {
               this.testInputText(e.target);
            }.bind(this));
         }
         if (type === 'EMAIL') {
            element.addEventListener('input', function (e) {
               this.testInputEmail(e.target);
            }.bind(this));
         }
         if (type === 'URL') {
            element.addEventListener('input', function (e) {
               this.testInputURL(e.target);
            }.bind(this));
         }
         if (type === 'CHECKBOX') {
            element.addEventListener('click', function () {
               this.testInputCheckbox(e.target);
            }.bind(this));
         }
         if (type === 'RADIO') {
            element.addEventListener('click', function () {
               this.testInputCheckbox(e.target);
            }.bind(this));
         }
      }
      if (element.nodeName.toUpperCase() === 'TEXTAREA') {
         element.addEventListener('input', function (e) {
            this.testInputText(e.target);
         }.bind(this));
      }
      if (element.nodeName.toUpperCase() === 'SELECT') {
         element.addEventListener('change', function (e) {
            this.testInputSelect(e.target);
         }.bind(this));
      }
   }, this);
};

FormValidate.prototype.showFieldValidation = function (input, inputIsValid) {
   if (!inputIsValid) {
      input.parentElement.classList.add(this.options.classError);
   } else {
      input.parentElement.classList.remove(this.options.classError);
   }
};

FormValidate.prototype.testInputText = function (input) {
   let inputIsValid = true;
   const pattern = input.getAttribute('pattern');

   if (pattern !== null) {
      const reg = new RegExp(pattern, 'gi');
      if (!reg.test(input.value)) {
         inputIsValid = false;
      }
   } else {
      if (input.value === '') {
         inputIsValid = false;
      }
   }

   if (inputIsValid) {
      this.showFieldValidation(input, true);
      return true;
   } else {
      this.showFieldValidation(input, false);
      return false;
   }
};

FormValidate.prototype.testInputEmail = function (input) {
   const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');

   if (!mailReg.test(input.value)) {
      this.showFieldValidation(input, false);
      return false;
   } else {
      this.showFieldValidation(input, true);
      return true;
   }
};

FormValidate.prototype.testInputURL = function (input) {
   const urlReg = new RegExp('^https?:\/\/.+', 'i');

   if (!urlReg.test(input.value)) {
      this.showFieldValidation(input, false);
      return false;
   } else {
      this.showFieldValidation(input, true);
      return true;
   }
};

FormValidate.prototype.testInputSelect = function (select) {
   if (select.options[select.selectedIndex].value === '' || select.options[select.selectedIndex].value === '-1') {
      this.showFieldValidation(select, false);
      return false;
   } else {
      this.showFieldValidation(select, true);
      return true;
   }
};

FormValidate.prototype.testInputCheckbox = function (input) {
   const name = input.getAttribute('name');
   const group = input.form.querySelectorAll('input[name="' + name + '"]:checked');

   if (group.length) {
      this.showFieldValidation(input, true);
      return true;
   } else {
      this.showFieldValidation(input, false);
      return false;
   }
};

document.addEventListener("DOMContentLoaded", function() {
   const cfg = {};
   const form = new FormValidate(document.querySelector('.form'), cfg);
});

//SPRAWDZANIE DANYCH PRZY WYSYŁANIU FORMULARZA

FormValidate.prototype.bindSubmit = function() {
   this.form.addEventListener('submit', function(e) {
      e.preventDefault();

      let formIsValidated = true;
      const elements = this.form.querySelectorAll('[required]');

      [].forEach.call(elements, function(element) {
         if (element.nodeName.toUpperCase() === 'INPUT') {
            const type = element.type.toUpperCase();

            if (type === 'EMAIL') {
               if (!this.testInputEmail(element)) {
                  formIsValidated = false;
               }
            }
            if (type === 'URL') {
               if (!this.testInputURL(element)) {
                  formIsValidated = false;
               }
            }
            if (type === 'TEXT') {
               if (!this.testInputText(element)) {
                  formIsValidated = false;
               }
            }
            if (type === 'CHECKBOX') {
               if (!this.testInputCheckbox(element)) {
                  formIsValidated = false;
               }
            }
            if (type === 'RADIO') {
               if (!this.testInputCheckbox(element)) {
                  formIsValidated = false;
               }
            }
         }

         if (element.nodeName.toUpperCase() === 'TEXTAREA') {
            if (!this.testInputText(element)) {
               formIsValidated = false;
            }
         }
         if (element.nodeName.toUpperCase() === 'SELECT') {
            if (!this.testInputSelect(element)) {
               formIsValidated = false;
            }
         }
      }, this);

      if (formIsValidated) {
         e.target.submit();
      } else {
         return false;
      }
   }.bind(this));
};

const FormValidate = function(form, options) {
   const defaultOptions = {
      classError : 'error'
   }

   this.form = form;
   this.options = Object.assign({}, defaultOptions, options);

   //wyłączamy htmlową walidację
   this.form.setAttribute('novalidate', 'novalidate');

   this.prepareElements();
   this.bindSubmit();
};
