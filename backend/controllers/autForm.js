import { connection } from "../connectionDB.js";

export function autForm(req, res) {
    const { login, password } = req.body

    const sql = `select * from user where login = ? and password = ?`

    connection.query(sql, [login, password], (err, results) => {
        if (err) {
            return console.log(err)
        }
        if (results.length === 0) {
            return res.status(401).json({ 
                success: false, 
                error: "Неверный логин или пароль" 
            });
        }
        const user = results[0]
        return res.json({
            user: {
                id: user.id,
                id_role: user.id_role,
                login: user.login,
                full_name: user.full_name
            }
        })
    })
}