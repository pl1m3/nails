export async function fetchGetAllRequest() {
    const response = await fetch ('http://localhost:3000/getAllRequest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });

        const data = await response.json()

        return data
}