export async function fetchGetMasters() {
    const response = await fetch('http://localhost:3000/getM', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify()
    });


    return await response.json();
}