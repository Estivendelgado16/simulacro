const db = require("../config/mysql");
const PatientHistory = require("../models/PatientHistory"); 

exports.createAppointment = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const {
      patient_id,
      doctor_id,
      insurance_id,
      treatment_code,
      appointment_date
    } = req.body;

    await connection.beginTransaction();

    const [patient] = await connection.execute(
      "SELECT * FROM patients WHERE id = ?",
      [patient_id]
    );

    if (patient.length === 0)
      throw new Error("Paciente no existe");


    const [doctor] = await connection.execute(
      "SELECT * FROM doctors WHERE id = ?",
      [doctor_id]
    );

    if (doctor.length === 0)
      throw new Error("Doctor no existe");

    
    const [treatment] = await connection.execute(
      "SELECT * FROM treatments WHERE code = ?",
      [treatment_code]
    );

    if (treatment.length === 0)
      throw new Error("Tratamiento no existe");

    const baseCost = treatment[0].base_cost;

    let coverage = 0;

    if (insurance_id) {
      const [insurance] = await connection.execute(
        "SELECT coverage_percentage FROM insurances WHERE id = ?",
        [insurance_id]
      );

      if (insurance.length === 0)
        throw new Error("Seguro no existe");

      coverage = insurance[0].coverage_percentage;
    }

    
    const discount = (baseCost * coverage) / 100;
    const amountPaid = baseCost - discount;

    
    const appointment_id =
      "APT-" + Date.now();

    
    const sql = `
      INSERT INTO appointment (
        appointment_id,
        appointment_date,
        patient_id,
        doctor_id,
        insurance_id,
        treatment_code,
        treatment_cost,
        amount_paid
      )
      VALUES (?,?,?,?,?,?,?,?)
    `;

    const [result] = await connection.execute(sql, [
      appointment_id,
      appointment_date,
      patient_id,
      doctor_id,
      insurance_id || null,
      treatment_code,
      baseCost,
      amountPaid
    ]);

    await connection.commit();

    
    await PatientHistory.findOneAndUpdate(
      { patientEmail: patient[0].email },
      {
        patientName: patient[0].name,
        $push: {
          appointments: {
            appointment_id,
            date: appointment_date,
            doctor: doctor[0].name,
            treatment: treatment[0].description,
            amountPaid
          }
        }
      },
      { upsert: true }
    );

    res.status(201).json({
      message: "Cita creada exitosamente",
      id: result.insertId,
      amountPaid
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  } finally {
    connection.release();
  }
};