import { connection } from "../connectionDB.js";

export function regForm(req, res) {
    const { id_role, login, password, full_name, phone } = req.body

    const sql = `insert into user(id_role, login, password, full_name, phone) values (?,?,?,?,? )`

    const values = [id_role, login, password, full_name, phone]

    connection.query(sql, values, (err, results) => {
        if (err) {
            return console.log(err)
        }
        return res.json(results)
    })
}