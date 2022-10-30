'use strict';

class Modal {
  constructor(modalText, acceptText, cancelText) {
      this.modalText = modalText || 'Are you sure you want to continue';
      this.acceptText = acceptText || 'Yes';
      this.cancelText = cancelText || 'No';

      this.parent = document.body;

      this.modal = undefined;
      this.acceptButton = undefined;
      this.cancelButton = undefined;

      this._createModal();
  }

  popup() {
    return new Promise((resolve, reject) => {
        if (!this.modal || !this.acceptButton || !this.cancelButton) {
            reject('There was a problem creating the modal window!');
            return;
        }
        this.acceptButton.focus();

        this.acceptButton.addEventListener('click', () => {
            resolve(this.acceptText);
            this._destroyModal();
        });

        this.cancelButton.addEventListener('click', () => {
            resolve(this.cancelText);
            this._destroyModal();
        });
    })
  }

  _createModal() {
    // Creating Modal Dialog Box
    this.modal = document.createElement('dialog');
    this.modal.classList.add('modal-dialog');
    this.modal.show();

    // Appending Modal Content to Modal
    const window = document.createElement('div');
    window.classList.add('modal-content');
    this.modal.appendChild(window);

    // Appending Main text to Modal
    const text = document.createElement('div');
    text.classList.add('modal-text');
    text.textContent = this.modalText;
    window.appendChild(text);

    // Appending Button Group to Modal
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('modal-button-group');
    window.appendChild(buttonGroup);

    // Appending Accept button to Button Group
    this.acceptButton = document.createElement('button');
    this.acceptButton.type = 'button';
    this.acceptButton.classList.add('modal-button');
    this.acceptButton.classList.add('accept-button');
    this.acceptButton.textContent = this.acceptText;
    buttonGroup.appendChild(this.acceptButton);

    // Appending Cancel button to Button Group
    this.cancelButton = document.createElement('button');
    this.cancelButton.type = 'button';
    this.cancelButton.classList.add('modal-button');
    this.cancelButton.classList.add('cancel-button');
    this.cancelButton.textContent = this.cancelText;
    buttonGroup.appendChild(this.cancelButton);

    this.parent.appendChild(this.modal);
  }

  _destroyModal() {
    this.parent.removeChild(this.modal);
    delete this;
  }
}
