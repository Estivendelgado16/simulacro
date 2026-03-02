import { createAppointment } from "../api/api";

export function AppointmentForm() {

  const container = document.createElement("div");
  container.className = "container";

  container.innerHTML = `
    <h1>Crear Cita</h1>

    <input id="patient" placeholder="Patient ID" />
    <input id="doctor" placeholder="Doctor ID" />
    <input id="insurance" placeholder="Insurance ID (opcional)" />
    <input id="treatment" placeholder="Treatment Code" />
    <input id="date" type="datetime-local" />

    <button id="save">Guardar Cita</button>

    <p id="result"></p>
  `;

  container.querySelector("#save")
    .addEventListener("click", async () => {

      const data = {
        patient_id: Number(container.querySelector("#patient").value),
        doctor_id: Number(container.querySelector("#doctor").value),
        insurance_id:
          container.querySelector("#insurance").value || null,
        treatment_code: container.querySelector("#treatment").value,
        appointment_date: container.querySelector("#date").value
      };

      const result = await createAppointment(data);
      console.log("RESULTADO BACKEND:", result);

      container.querySelector("#result").innerText =
        `✅ Appointment creada: ${result.appointment_id}
💰 Pago: ${result.amount_paid}`;
    });

  return container;
}