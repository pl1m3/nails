import { connection } from "../connectionDB.js";

export function getAllRequest(req, res) {
    const sql = `select 
    r.id, r.booking_datetime, r.id_status, u.id as user_id, u.full_name as user_name, u.phone as user_phone, m.id as master_id, m.name as master_name
    from request r
    left join user u on r.id_user = u.id
    left join master m on r.id_master = m.id
    order by r.booking_datetime desc`

    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }
        return res.json(results)
    })
}