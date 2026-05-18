import { useEffect, useState } from "react";
import { fetchRequestHistory } from "../../../fetch/fetchRequestHistory";

function RequestHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const currentUserId = localStorage.getItem('userId');
                
                if (!currentUserId) {
                    console.warn('Пользователь не авторизован');
                    setLoading(false);
                    return;
                }

                const id_user = parseInt(currentUserId);
                
                const data = await fetchRequestHistory(id_user);
                
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
                <div key={request.id}>
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