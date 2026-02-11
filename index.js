const monthlyScriptURL = 'https://script.google.com/macros/s/AKfycbzvS08vYfbQh8wv00gnOChZuATnmpNkiKFWrvlAfsEsecqcnu99ojvBq1DSrGRlqCU3/exec';

document.getElementById('monthlyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const loader = document.getElementById('loader');
    const formSection = document.getElementById('formSection');
    const successSection = document.getElementById('bookingSuccessDetails');

    // Data Extraction
    const formData = {
        name: document.getElementById('monthlyName').value,
        phone: document.getElementById('monthlyPhone').value,
        gothram: document.getElementById('monthlyGothram').value || 'సాధారణ',
        start: document.getElementById('startMonth').value,
        end: document.getElementById('endMonth').value,
        id: 'POL-' + Date.now().toString().slice(-6)
    };

    loader.classList.remove('hidden');

    try {
        // Optional: Send to Google Sheet
        /* await fetch(monthlyScriptURL, { method: 'POST', body: new FormData(e.target) });
        */

        // Map data to Ticket
        document.getElementById('displayBookingID').innerText = formData.id;
        document.getElementById('displayName').innerText = formData.name;
        document.getElementById('displayPhone').innerText = formData.phone;
        document.getElementById('displayGothram').innerText = formData.gothram;
        document.getElementById('displayPeriod').innerText = `${formData.start} నుండి ${formData.end}`;

        // Generate QR Code with Verification URL
        const qrContainer = document.getElementById('qrcode-container');
        qrContainer.innerHTML = ""; // Clear old QR
        new QRCode(qrContainer, {
            text: `https://srichiralapoleramma.github.io/verify?id=${formData.id}`,
            width: 128,
            height: 128,
            colorDark: "#2c3e50",
            colorLight: "#ffffff"
        });

        loader.classList.add('hidden');
        formSection.classList.add('hidden');
        successSection.classList.remove('hidden');

        Swal.fire('విజయవంతం!', 'మీ టికెట్ జనరేట్ చేయబడింది.', 'success');
    } catch (err) {
        loader.classList.add('hidden');
        Swal.fire('Error', 'సమస్య ఏర్పడింది. మళ్ళీ ప్రయత్నించండి.', 'error');
    }
});

// 📱 WhatsApp Sharing Logic
function shareWhatsApp() {
    const id = document.getElementById('displayBookingID').innerText;
    const name = document.getElementById('displayName').innerText;
    const period = document.getElementById('displayPeriod').innerText;
    
    const message = `*శ్రీ పోలేరమ్మ తల్లి దేవస్థానం - టికెట్*%0A%0A🔖 *ID:* ${id}%0A👤 *పేరు:* ${name}%0A📅 *కాలం:* ${period}%0A%0Aటికెట్ డౌన్లోడ్ చేసుకోండి: https://srichiralapoleramma.github.io/Temple-tickets/`;
    
    window.open(`https://wa.me/?text=${message}`, '_blank');
}

// 🖼️ Save as Image Logic
function downloadAsImage() {
    const ticket = document.getElementById('ticketArea');
    html2canvas(ticket, { 
        backgroundColor: "#ffffff",
        scale: 2 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Temple_Ticket_${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}
