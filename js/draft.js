/ الأزرار والفورم
const addContactBtn = document.getElementById('addContactBtn');
const contactForm   = document.getElementById('contactForm');

// الأماكن اللي هنعرض فيها البيانات
const contactsList      = document.getElementById('contactsList');
const emptyState        = document.getElementById('emptyState');
const totalCountEl      = document.getElementById('totalCount');
const favCountEl        = document.getElementById('favCount');
const emergencyCountEl  = document.getElementById('emergencyCount');
const contactCountLabel = document.getElementById('contactCountLabel');



let contacts = [];  // مصفوفة فاضية في الأول



// نعمل نسخة من الـ Modal
const modalElement = document.getElementById('addContactModal');
const bootstrapModal = new bootstrap.Modal(modalElement);

// لما نضغط على زرار Add Contact، نظهر المودال
addContactBtn.addEventListener('click', () => {
    bootstrapModal.show();
});


contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // منع الـ refresh

    // 1. نقرأ البيانات من الحقول
    const newContact = {
        id: Date.now(),  // رقم فريد لكل كونتاكت
        name:        document.getElementById('name').value.trim(),
        email:       document.getElementById('email').value.trim(),
        address:     document.getElementById('address').value.trim(),
        group:       document.getElementById('group').value,
        notes:       document.getElementById('notes').value.trim(),
        isFavorite:  document.getElementById('isFavorite').checked,
        isEmergency: document.getElementById('isEmergency').checked
    };

    // 2. نضيفه في المصفوفة
    contacts.push(newContact);

    // 3. نعرض البيانات الجديدة
    renderContacts();
    updateStats();

    // 4. نصفّر الفورم ونقفل المودال
    contactForm.reset();
    bootstrapModal.hide();
});


function renderContacts() {
    contactsList.innerHTML = ''; // ننضف المكان الأول

    // لو مفيش كونتاكتس، نظهر الـ Empty State
    if (contacts.length === 0) {
        emptyState.classList.remove('d-none');
        return;
    }
    emptyState.classList.add('d-none'); // نخفي الـ Empty State

    // نلف على كل كونتاكت ونعمل كارت
    contacts.forEach(contact => {
        const cardHTML = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm rounded-3 h-100">
                    <div class="card-body">
                        <h6 class="fw-bold">${contact.name}</h6>
                        <small class="text-muted">${contact.email || 'No email'}</small>
                    </div>
                </div>
            </div>
        `;
        contactsList.insertAdjacentHTML('beforeend', cardHTML);
    });
}


function updateStats() {
    // الكروت العلوية
    totalCountEl.textContent     = contacts.length;
    favCountEl.textContent       = contacts.filter(c => c.isFavorite).length;
    emergencyCountEl.textContent = contacts.filter(c => c.isEmergency).length;
    contactCountLabel.textContent = contacts.length;

    // ===== Sidebar: Favorites =====
    const favoritesList  = document.getElementById('favoritesList');
    const favSidebarText = document.getElementById('favSidebarText');
    const favContacts    = contacts.filter(c => c.isFavorite);

    if (favContacts.length === 0) {
        favSidebarText.style.display = 'block';
        favoritesList.innerHTML = '';
    } else {
        favSidebarText.style.display = 'none';
        favoritesList.innerHTML = favContacts.map(c => `
            <div class="text-start small border-bottom py-2">
                <i class="fa-solid fa-user-circle text-warning me-1"></i>
                <span class="fw-semibold">${c.name}</span>
            </div>
        `).join('');
    }

    // ===== Sidebar: Emergency =====
    const emergencyList       = document.getElementById('emergencyList');
    const emergencySidebarText = document.getElementById('emergencySidebarText');
    const emergencyContacts   = contacts.filter(c => c.isEmergency);

    if (emergencyContacts.length === 0) {
        emergencySidebarText.style.display = 'block';
        emergencyList.innerHTML = '';
    } else {
        emergencySidebarText.style.display = 'none';
        emergencyList.innerHTML = emergencyContacts.map(c => `
            <div class="text-start small border-bottom py-2">
                <i class="fa-solid fa-user-circle text-danger me-1"></i>
                <span class="fw-semibold">${c.name}</span>
            </div>
        `).join('');
    }
}


