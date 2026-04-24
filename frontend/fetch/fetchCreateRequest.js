export async function createRequest(data) {
    try {
        const response = await fetch('http://localhost:3000/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || 'Ошибка сервера' };
        }

        return { success: true, data: result };
        
    } catch (err) {
        console.error('Network error in createRequest:', err);
        return { success: false, error: 'Нет связи с сервером' };
    }
}