document.addEventListener("DOMContentLoaded", function () {
  const specializationSelect = document.getElementById("specialization");
  const doctorSelect = document.getElementById("doctor");
  const appointmentsTable = document.getElementById("appointments-table");

  // Мамандығы мен дәрігерлер тізімі
  const doctors = {
    therapist: ["Ермек Тұрсынов", "Айгүл Сейтқасымова", "Мұрат Жандосов", "Гүлнәр Ерғалиқызы", "Серік Әлиханұлы"],
    pediatrician: ["Жансая Бекболатқызы", "Нұрлан Еркінұлы", "Айша Оразбайқызы", "Ернар Талғатұлы", "Салтанат Бақтиярқызы"],
    cardiologist: ["Әлібек Бейсенов", "Гүлсім Қабылханқызы", "Жанат Омарбеков", "Айбар Кәкімұлы", "Сағдат Ермаханұлы"],
    dentist: ["Қуаныш Сейітқасымов", "Динара Нұрғазықызы", "Арман Еркінұлы", "Әлия Қанатқызы", "Жандос Мұратұлы"],
  };

  // Мамандығы өзгергенде дәрігерлерді көрсету
  specializationSelect.addEventListener("change", function () {
    const specialization = specializationSelect.value;

    // Дәрігерлер тізімін тазалау және қайта қосу
    doctorSelect.innerHTML = '<option value="" disabled selected>Дәрігерді таңдаңыз</option>';
    if (doctors[specialization]) {
      doctors[specialization].forEach((doctor) => {
        const option = document.createElement("option");
        option.value = doctor;
        option.textContent = doctor;
        doctorSelect.appendChild(option);
      });
    }
  });

  // Жазбаны сақтау
  window.saveAppointment = function () {
    const specialization = specializationSelect.value;
    const doctor = doctorSelect.value;
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;

    if (!specialization || !doctor || !date || !time) {
      alert("Барлық мәліметтерді толтырыңыз!");
      return;
    }

    const appointment = { specialization, doctor, date, time };

    // Жазбаны localStorage-қа сақтау
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Кестеге жазбаны қосу
    addAppointmentToTable(appointment);
    alert("Жазылу сәтті сақталды!");
  };

  // Жазбаны кестеге қосу
  function addAppointmentToTable(appointment) {
    if (!appointmentsTable) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${appointment.specialization}</td>
      <td>${appointment.doctor}</td>
      <td>${appointment.date}</td>
      <td>${appointment.time}</td>
    `;
    appointmentsTable.querySelector("tbody").appendChild(row);
  }

  // Жазбаларды жүктеу
  function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.forEach(addAppointmentToTable);
  }

  // Бет жүктелгенде жазбаларды көрсету
  loadAppointments();
});
