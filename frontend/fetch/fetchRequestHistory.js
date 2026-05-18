export async function fetchRequestHistory(id_user) {
    try {
        if (!id_user) {
            console.warn('id_user не передан');
            return [];
        }

        const response = await fetch('http://localhost:3000/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id_user: id_user })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(response.status, errorData);
            return [];
        }

        const data = await response.json();
        return data;
        
    } catch (err) {
        console.error(err);
        return [];
    }
}