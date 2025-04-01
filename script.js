document.getElementById('generate-btn').addEventListener('click', function() {
    const countryCode = document.getElementById('country-code').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const message = document.getElementById('message').value;
    
    if (!phoneNumber) {
        showNotification('⚠️ Please enter a phone number');
        return;
    }
    
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    let whatsappLink = `https://wa.me/${countryCode}${cleanedPhone}`;
    
    if (message) {
        const encodedMessage = encodeURIComponent(message);
        whatsappLink += `?text=${encodedMessage}`;
    }
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p><strong>Your WhatsApp Link:</strong></p>
        <a href="${whatsappLink}" target="_blank">${whatsappLink}</a>
        <p>Click the link above to test it.</p>
        <button id="copy-btn">Copy Link</button>
    `;
    
    document.getElementById('copy-btn').addEventListener('click', function() {
        navigator.clipboard.writeText(whatsappLink)
            .then(() => showNotification('✅ Link copied!'))
            .catch(err => showNotification('❌ Failed to copy'));
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}