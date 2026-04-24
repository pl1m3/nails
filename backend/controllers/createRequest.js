import { connection } from "../connectionDB.js";

export function createRequest(req, res) {
    
    const { id_user, id_master, id_status, booking_datetime } = req.body;


    if (!id_user || !id_master || !booking_datetime) {
        return res.status(400).json({ 
            error: 'Обязательные поля: id_user, id_master, booking_datetime' 
        });
    }

    const sql = `INSERT INTO request (id_user, id_master, id_status, booking_datetime) VALUES (?, ?, ?, ?)`;
    const values = [id_user, id_master, id_status || 1, booking_datetime];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'Неверный id_user или id_master' });
            }
            
            return res.status(500).json({ 
                error: 'Ошибка при создании записи', 
                details: process.env.NODE_ENV === 'development' ? err.message : undefined 
            });
        }
        
        res.status(201).json({ 
            message: 'Запись успешно создана', 
            requestId: results.insertId,
            data: { id_user, id_master, booking_datetime }
        });
    });
}