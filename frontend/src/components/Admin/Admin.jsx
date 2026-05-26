import { useEffect, useState } from "react"
import { fetchGetAllRequest } from "../../../fetch/fetchGetAllRequest"
import { fetchUpdateStatus } from "../../../fetch/fetchUpdateStatus"
import "./Admin.css"
import { Link } from "react-router-dom"

function Admin() {

    const [history, setHistory] = useState([])
    const [updatingId, setUpdatingId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))

                if (!user) {
                    console.warn('Пользователь не авторизован')
                    setLoading(false)
                    return
                }

                const data = await fetchGetAllRequest()
                setHistory(Array.isArray(data) ? data : [])

            } catch (err) {
                console.error("Ошибка загрузки:", err)
                setError("Не удалось загрузить данные")
            } finally {
                setLoading(false)
            }
        }
        loadHistory()
    }, [])

    const handleStatusChange = async (requestId, newStatusId) => {
        const statusId = Number(newStatusId)

        setUpdatingId(requestId)
        setError(null)

        try {
            const result = await fetchUpdateStatus(requestId, statusId)

            setHistory(prev =>
                prev.map(req =>
                    req.id === requestId
                        ? { ...req, id_status: statusId }
                        : req
                )
            )

        } catch (err) {
            console.error("Ошибка обновления:", err)
            setError(err.message || "Не удалось обновить статус")
        } finally {
            setUpdatingId(null)
        }
    }

    if (loading) return <div>Загрузка истории...</div>
    if (error) return <div>{error}</div>
    if (!history || history.length === 0) {
        return <div>У вас пока нет записей</div>
    }

    return (
        <div className="full">
            <h3>Записи всех пользователей:</h3>
            <Link to={'/aut'}>Вернуться к авторизации</Link>
            {history.map((request) => (
                <div key={request.id} className="request_card">
                    <p><strong>Дата:</strong> {new Date(request.booking_datetime).toLocaleString('ru-RU')}</p>
                    <p><strong>Клиент:</strong> {request.user_name || `ID: ${request.user_id}`}</p>
                    <p><strong>Телефон:</strong> {request.user_phone || 'не указан'}</p>
                    <p><strong>Мастер:</strong> {request.master_name || `ID: ${request.master_id}`}</p>
                    <p>
                        <strong>Статус:</strong>{' '}
                        <select
                            value={request.id_status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            disabled={updatingId === request.id}
                        >
                            <option value={1}>Новое</option>
                            <option value={4}>Подтверждено</option>
                            <option value={3}>Отменено</option>
                        </select>
                        {updatingId === request.id && <small>Обновление...</small>}
                    </p>

                    <p><strong>ID записи:</strong> {request.id}</p>
                </div>
            ))}
        </div>
    )
}

export default Admin