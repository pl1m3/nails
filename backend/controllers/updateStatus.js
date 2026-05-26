import { connection } from "../connectionDB.js";

export function updateStatus(req, res) {

    const { id, id_status } = req.body;

    const validStatusIds = [1, 3, 4];
    
    if (!id || !id_status) {
        return res.status(400).json({ 
            success: false, 
            message: "Требуется указать id заявки и id статуса" 
        });
    }

    if (!validStatusIds.includes(id_status)) {
        return res.status(400).json({ 
            success: false, 
            message: "Недопустимое значение статуса" 
        });
    }

    const sql = `UPDATE request SET id_status = ? WHERE id = ?`;
    const values = [id_status, id];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error("Ошибка БД:", err);
            return res.status(500).json({ 
                success: false, 
                message: "Ошибка при обновлении статуса" 
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Заявка не найдена" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Статус обновлён",
            id,
            newStatusId: id_status
        });
    });
}