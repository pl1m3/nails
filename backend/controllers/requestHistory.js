import { connection } from "../connectionDB.js";

export function requestHistory(req, res) {
    const { id_user } = req.body;

    if (!id_user) {
        return res.status(400).json({ error: 'Не указан ID пользователя' });
    }

    const sql = `select * from request where id_user = ? order by booking_datetime desc`;

    connection.query(sql, [id_user], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }

        return res.status(200).json(results);
    });
}