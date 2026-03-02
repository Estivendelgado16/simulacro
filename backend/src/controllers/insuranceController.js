const db = require('../config/mysql')

exports.createInsurance = async (req, res) => {
    try {
        const {
            name,
            coverage_percentage 
        } = req.body;

        const sql = `
        INSERT INTO insurances (name, coverage_percentage )
        VALUES (?,?)
        `
        const [result] = await db.execute(sql, [
            name,
            coverage_percentage 
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