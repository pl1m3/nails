import { useEffect, useState } from "react";
import { fetchRequestHistory } from "../../../fetch/fetchRequestHistory";
import "./RequestHistory.css"

function RequestHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                
                if (!user) {
                    console.warn('Пользователь не авторизован');
                    setLoading(false);
                    return;
                }
                
                const data = await fetchRequestHistory(user.id);
                
                setHistory(Array.isArray(data) ? data : []);
                
            } catch (err) {
                console.error(err);
                setHistory([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadHistory();
    }, []);

    if (loading) return <div>Загрузка истории...</div>;

    if (!history || history.length === 0) {
        return <div>У вас пока нет записей</div>;
    }

    return (
        <div>
            <h3>Ваши записи:</h3>
            {history.map((request) => (
                <div key={request.id} className="historyCard">
                    <p><strong>Дата:</strong> {new Date(request.booking_datetime).toLocaleString('ru-RU')}</p>
                    <p><strong>Мастер (ID):</strong> {request.id_master}</p>
                    <p><strong>Статус (ID):</strong> {request.id_status}</p>
                    <p><strong>ID записи:</strong> {request.id}</p>
                </div>
            ))}
        </div>
    );
}

export default RequestHistory;