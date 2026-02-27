const db = require('../config/mysql')

exports.createDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            specialty
        } = req.body;

        const sql = `
        INSERT INTO doctors (name, email, speciality)
        VALUES (?,?,?)
        `
        const [result] = await db.execute(sql, [
            name,
            email,
            specialty
        ])

        res.status(201).json({
            mensaje: "Doctor creado exitosamente",
            id: result.insertId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al crear Doctor'
        })
    }
}