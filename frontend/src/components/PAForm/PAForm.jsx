import "./PAForm.css"
import { useState, useEffect } from "react"
import { fetchGetMasters } from "../../../fetch/fetchGetMasters"
import { createRequest } from "../../../fetch/fetchCreateRequest"

function PAForm() {
    const [masters, setMasters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedMasterId, setSelectedMasterId] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        const loadMasters = async () => {
            try {
                setLoading(true)
                const data = await fetchGetMasters()
                setMasters(data || [])
            } catch (err) {
                console.error('Error loading masters:', err)
                setError('Не удалось загрузить список мастеров')
            } finally {
                setLoading(false)
            }
        }
        loadMasters()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedMasterId || !date || !time) {
            alert("Пожалуйста, заполните все поля")
            return
        }


        const currentUserId = localStorage.getItem('userId')
        
        if (!currentUserId) {
            alert("Сначала авторизуйтесь!")
            return
        }


        const bookingDatetime = `${date} ${time}:00`

        const requestData = {
            id_user: parseInt(currentUserId),
            id_master: parseInt(selectedMasterId),
            id_status: 1,
            booking_datetime: bookingDatetime
        }

        console.log('📤 Отправляем в БД:', requestData)

        try {
            const result = await createRequest(requestData)
            
            if (result.success) {
                alert("Вы успешно записаны!")
                setSelectedMasterId('')
                setDate('')
                setTime('')
            } else {
                alert(result.error || "Ошибка при записи")
            }
        } catch (err) {
            console.error('Submission error:', err)
            alert("Ошибка соединения с сервером")
        }
    }

    if (loading) return <div className="loading">Загрузка мастеров...</div>
    if (error) return <div className="error">{error}</div>

    return (
        <div className="fullForm">
            <h2>Запись к мастеру</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="fullInput">
                    <label>Выберите мастера</label>
                    <select 
                        value={selectedMasterId} 
                        onChange={(e) => setSelectedMasterId(e.target.value)}
                        required
                    >
                        <option value="" disabled>Выберите мастера</option>
                        {masters.map(master => (
                            <option key={master.id} value={master.id}>
                                {master.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="fullInput">
                    <label>Дата</label>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="fullInput">
                    <label>Время</label>
                    <input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit"> 
                    Записаться
                </button>
            </form>
        </div>
    )
}

export default PAForm