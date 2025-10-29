// Ключ для localStorage
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт стану поза будь-якими функціями
let formData = { email: '', message: '' };

// Посилання на елементи
const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

// 1) Відновлення стану при завантаженні
restoreForm();

function restoreForm() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    // підставляємо тільки очікувані поля, без undefined
    formData.email = saved.email ?? '';
    formData.message = saved.message ?? '';

    email.value = formData.email;
    message.value = formData.message;
  } catch {
    // якщо в сховищі сміття — ігноруємо
    localStorage.removeItem(STORAGE_KEY);
  }
}

// 2) Делегування input на всю форму
form.addEventListener('input', onFormInput);

function onFormInput(e) {
  const { name, value } = e.target;

  // реагуємо лише на поля email/message
  if (!(name in formData)) return;

  // зберігаємо обрізані по краях значення
  formData[name] = value.trim();

  // пишемо актуальний об'єкт у localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// 3) Сабміт форми з валідацією
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  // фінально обрізаємо і перевіряємо
  const current = {
    email: email.value.trim(),
    message: message.value.trim(),
  };

  if (!current.email || !current.message) {
    alert('Fill please all fields');
    return;
  }

  // виводимо актуальні дані
  console.log(current);

  // очищаємо все
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
}
