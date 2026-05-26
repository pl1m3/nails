import { connection } from "../connectionDB.js";

export function getMasters(req, res) {
    
    const sql = `SELECT * FROM master`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('DB Error in getMasters:', err);
            return res.status(500).json({ 
                error: 'Ошибка при загрузке мастеров', 
                details: process.env.NODE_ENV === 'development' ? err.message : undefined 
            });
        }
        
        console.log(`Найдено мастеров: ${results.length}`);
        res.status(200).json(results);
    });
}