// Тілді өзгерту функциясы
function changeLanguage() {
  const selectedLanguage = document.getElementById("language-select").value;
  localStorage.setItem("language", selectedLanguage); // Тілді сақтау
  applyLanguage(selectedLanguage); // Тілді қолдану
}

// Тіл аудармаларын қолдану
function applyLanguage(language) {
  const translations = {
    kk: {
      pageTitle: "Тіркелу",
      iinLabel: "ИИН:",
      passwordLabel: "Құпия сөз:",
      registerButton: "Тіркелу",
      iinError: "ИИН 12 саннан тұруы керек!",
      emptyError: "ИИН мен құпия сөзді толтырыңыз!",
      loginError: "Сіз енгізген ИИН немесе құпия сөз дұрыс емес!",
      welcomeBack: "Қош келдіңіз! Сіз жүйеге қайта кірдіңіз.",
      successRegister: "Тіркелу сәтті өтті!"
    },
    ru: {
      pageTitle: "Регистрация",
      iinLabel: "ИИН:",
      passwordLabel: "Пароль:",
      registerButton: "Зарегистрироваться",
      iinError: "ИИН должен состоять из 12 цифр!",
      emptyError: "Заполните ИИН и пароль!",
      loginError: "Введённые ИИН или пароль неверны!",
      welcomeBack: "Добро пожаловать! Вы снова вошли в систему.",
      successRegister: "Регистрация прошла успешно!"
    },
    en: {
      pageTitle: "Registration",
      iinLabel: "IIN:",
      passwordLabel: "Password:",
      registerButton: "Register",
      iinError: "IIN must be 12 digits!",
      emptyError: "Please fill in IIN and password!",
      loginError: "Entered IIN or password is incorrect!",
      welcomeBack: "Welcome back! You have logged in again.",
      successRegister: "Registration successful!"
    },
  };

  const langData = translations[language];
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (langData[key]) {
      element.textContent = langData[key];
    }
  });

  // Placeholder өзгерту
  if (document.getElementById("iin")) {
    document.getElementById("iin").placeholder = langData.iinLabel;
  }
  if (document.getElementById("password")) {
    document.getElementById("password").placeholder = langData.passwordLabel;
  }
}

// Бетті жүктегенде сақталған тілді қолдану
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "kk";
  document.getElementById("language-select").value = savedLanguage;
  applyLanguage(savedLanguage);
});

// Тіркелу функциясы
function register() {
  const iin = document.getElementById('iin').value.trim();
  const password = document.getElementById('password').value.trim();

  const language = localStorage.getItem("language") || "kk";
  const translations = {
    kk: {
      iinError: "ИИН 12 саннан тұруы керек!",
      emptyError: "ИИН мен құпия сөзді толтырыңыз!",
      loginError: "Сіз енгізген ИИН немесе құпия сөз дұрыс емес!",
      welcomeBack: "Қош келдіңіз! Сіз жүйеге қайта кірдіңіз.",
      successRegister: "Тіркелу сәтті өтті!"
    },
    ru: {
      iinError: "ИИН должен состоять из 12 цифр!",
      emptyError: "Заполните ИИН и пароль!",
      loginError: "Введённые ИИН или пароль неверны!",
      welcomeBack: "Добро пожаловать! Вы снова вошли в систему.",
      successRegister: "Регистрация прошла успешно!"
    },
    en: {
      iinError: "IIN must be 12 digits!",
      emptyError: "Please fill in IIN and password!",
      loginError: "Entered IIN or password is incorrect!",
      welcomeBack: "Welcome back! You have logged in again.",
      successRegister: "Registration successful!"
    },
  };

  const langData = translations[language];

  if (!iin || !password) {
    alert(langData.emptyError);
    return;
  }

  const iinRegex = /^\d{12}$/;
  if (!iinRegex.test(iin)) {
    alert(langData.iinError);
    return;
  }

  const allowedUsers = [
    { iin: '111111111111', password: '1' },
    { iin: '222222222222', password: '2' },
    { iin: '333333333333', password: '3' },
    { iin: '444444444444', password: '4' }
  ];

  const isAllowed = allowedUsers.some(
    user => user.iin === iin && user.password === password
  );

  if (!isAllowed) {
    alert(langData.loginError);
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.iin === iin);

  if (existingUser) {
    alert(langData.welcomeBack);
    window.location.href = '../dashboard/dashboard.html';
    return;
  }

  users.push({ iin, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert(langData.successRegister);
  window.location.href = '../dashboard/dashboard.html';
}
