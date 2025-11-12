const formData = {
    email: '',
    message: '',
};

const form = document.querySelector('.feedback-form');
const key = 'feedback-form-state';
const dataLS = loadFromLS(key);

formData.email = dataLS?.email || '';
formData.message = dataLS?.message || '';
form.elements.email.value = dataLS?.email || '';
form.elements.message.value = dataLS?.message || '';

function setToLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

function loadFromLS(key) {
    const data = localStorage.getItem(key);

    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
};

form.addEventListener('input', e => {
    const newData = new FormData(form);

    formData.email = newData.get('email').trim();
    formData.message = newData.get('message').trim();

    setToLS(key, formData);
});


form.addEventListener('submit', e => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.message.trim()) {
        alert('Fill please all fields');
        return;
    };

    console.log(formData);

    localStorage.removeItem(key);
    formData.email = '';
    formData.message = '';
    form.reset();
})
