document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');

    // Click para mostrar más información
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.getAttribute('data-service');
            showServiceDetails(serviceType);
        });
    });
});

// Función para mostrar detalles del servicio
function showServiceDetails(serviceType) {
    const serviceInfo = {
        web: {
            title: 'Desarrollo Web',
            description: 'Creamos sitios web profesionales y modernos que destacan tu marca.',
            features: [
                'Diseño UX/UI personalizado',
                'Optimización SEO',
                'Integración con CMS',
                'Análisis de rendimiento',
                'Soporte técnico continuo'
            ]
        },
        app: {
            title: 'Desarrollo de Apps',
            description: 'Desarrollamos aplicaciones móviles nativas y multiplataforma.',
            features: [
                'Desarrollo iOS y Android',
                'Diseño intuitivo',
                'Integración con APIs',
                'Notificaciones push',
                'Análisis de usuario'
            ]
        },
        ecommerce: {
            title: 'E-Commerce',
            description: 'Implementamos soluciones completas de comercio electrónico.',
            features: [
                'Catálogo de productos',
                'Gestión de inventario',
                'Pasarelas de pago',
                'Panel administrativo',
                'Informes de ventas'
            ]
        },
        consulting: {
            title: 'Consultoría IT',
            description: 'Asesoramiento experto para optimizar tus sistemas.',
            features: [
                'Auditoría de sistemas',
                'Optimización de procesos',
                'Seguridad informática',
                'Planes estratégicos',
                'Capacitación'
            ]
        }
    };

    const service = serviceInfo[serviceType];
    if (!service) return;

    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${service.title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>${service.description}</p>
                <h3>Características principales:</h3>
                <ul>
                    ${service.features.map(feature => `<li><i class='bx bx-check'></i>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Agregar estilos al modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(14, 18, 23, 0.9);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: rgba(74, 207, 238, 0.05);
        border: 2px solid #4acfee;
        border-radius: 20px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        position: relative;
        transform: translateY(-20px);
        transition: transform 0.3s ease;
        box-shadow: 0 0 30px rgba(74, 207, 238, 0.3);
        backdrop-filter: blur(10px);
    `;

    // Estilos para el contenido
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    `;

    const modalTitle = modal.querySelector('h2');
    modalTitle.style.cssText = `
        color: #4acfee;
        font-size: 28px;
        margin: 0;
    `;

    const closeButton = modal.querySelector('.close-modal');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: #4acfee;
        font-size: 32px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.cssText = `
        color: white;
    `;

    const featuresList = modal.querySelector('ul');
    featuresList.style.cssText = `
        list-style: none;
        padding: 0;
        margin: 20px 0;
    `;

    const features = modal.querySelectorAll('li');
    features.forEach(feature => {
        feature.style.cssText = `
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 16px;
        `;
    });

    const checkIcons = modal.querySelectorAll('li i');
    checkIcons.forEach(icon => {
        icon.style.cssText = `
            color: #4acfee;
            margin-right: 10px;
            font-size: 20px;
        `;
    });

    // Agregar el modal al DOM
    document.body.appendChild(modal);

    // Mostrar el modal con animación
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    });

    // Cerrar modal
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'translateY(-20px)';
        setTimeout(() => modal.remove(), 300);
    };

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}