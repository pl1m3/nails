export async function fetchReg(newUser) {
    const response = await fetch('http://localhost:3000/reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newUser)
    });

    const data = await response.json();

    if (!response.ok) {
        return { success: false, error: data.error || 'Ошибка авторизации' };
    }

    return { success: true, user: data.user };

}