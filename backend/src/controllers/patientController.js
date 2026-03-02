const db = require('../config/mysql')

exports.createPatient = async (req, res) => {
    try {
        const {
            name,
            email,
            address
        } = req.body;

        const sql = `
        INSERT INTO patients (name, email, address)
        VALUES (?,?,?)
        `
        const [result] = await db.execute(sql, [
            name,
            email,
            address
        ])

        res.status(201).json({
            mensaje: "Paciente creado exitosamente",
            id: result.insertId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al crear Paciente'
        })
    }
}