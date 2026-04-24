export async function fetchAut({ login, password }) {
    const response = await fetch('http://localhost:3000/aut', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ login, password })
    });

    const data = await response.json();

    if (!response.ok) {
        return { success: false, error: data.error };
    }

    return { success: true, user: data.user };

}