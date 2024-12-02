// Hàm thông báo tự thiết kế
export function customAlert({
    title = '', 
    message = '', 
    type = '', 
    duration = 3000
}) {
    const main = document.getElementById('custom-alert');
    if (main) {
        const alert = document.createElement('div');
        // Tự động xóa thông báo sau thời gian xác định
        const autoRemoveId = setTimeout(function() {
            main.removeChild(alert);
        }, duration + 1000);
        // Xóa thông báo khi người dùng nhấp vào
        alert.onclick = function(e) {
            if (e.target.closest('.custom-alert__close')) {
                main.removeChild(alert);
                clearTimeout(autoRemoveId);
            }
        };
        const icons ={
            success: 'fa-solid fa-circle-check',
            warning: 'fa-solid fa-circle-exclamation',
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);
        alert.classList.add('custom-alert', `custom-alert--${type}`);
        alert.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        alert.innerHTML = `
            <div class="custom-alert__icon">
                <i class="${icon}"></i>
            </div>
            <div class="custom-alert__body">
                <h3 class="custom-alert__title">${title}</h3>
                <p class="custom-alert__msg">${message}</p>
            </div>
            <div class="custom-alert__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(alert);
    }
}

export function customConfirm(message, callback) {
    // Tạo phần tử modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Nội dung của modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-confirm');
  
    // Thông điệp
    const msg = document.createElement('p');
    msg.textContent = message;
  
    // Container cho nút
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
  
    // Nút "Có"
    const yesButton = document.createElement('button');
    yesButton.textContent = 'Có';
    yesButton.id = 'confirmYes';
    yesButton.onclick = function() {
      document.body.removeChild(modal);
      callback(true);
    };
  
    // Nút "Không"
    const noButton = document.createElement('button');
    noButton.textContent = 'Không';
    noButton.id = 'confirmNo';
    noButton.onclick = function() {
      document.body.removeChild(modal);
      callback(false);
    };
  
    // Lắp ráp các phần tử
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    modalContent.appendChild(msg);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    // Hiển thị modal
    modal.style.display = 'flex';
}