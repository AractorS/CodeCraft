// Inicializar EmailJS
emailjs.init('-xFrgAlYwMRpRTd1P');

const btn = document.getElementById('button');

// Función para mostrar notificaciones tipo toast
function showToast(message, isError = false) {
    // Remover toast anterior si existe
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast-notification ${isError ? 'error' : 'success'}`;

    // Agregar icono
    const icon = document.createElement('i');
    icon.className = isError ? 'bx bx-x-circle' : 'bx bx-check-circle';
    toast.appendChild(icon);

    // Agregar mensaje
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    toast.appendChild(messageSpan);
    
    // Agregar al documento
    document.body.appendChild(toast);

    // Remover después de 3 segundos
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 500);
    }, 3000);
}

document.getElementById('form')
    .addEventListener('submit', function(event) {
        event.preventDefault();

        // Validar campos
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const title = this.querySelector('#title').value.trim();

        if (!name || !email || !title) {
            showToast('Por favor, complete todos los campos requeridos', true);
            return;
        }

        btn.value = 'Enviando...';
        btn.disabled = true;

        const serviceID = 'default_service';
        const templateID = 'template_eoucwl4';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                btn.disabled = false;
                showToast('¡Mensaje enviado exitosamente!');
                this.reset();
            }, (err) => {
                btn.value = 'Send Email';
                btn.disabled = false;
                showToast('Error al enviar el mensaje. Por favor, intente nuevamente.', true);
                console.error('Error:', err);
            });
    }); 