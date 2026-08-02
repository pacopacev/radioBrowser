export default async function getByGenre(server, genre) {
    try {
        const normalizedServer = server.replace(/\/$/, '');
        const url = `${normalizedServer}/json/stations/bytag/${encodeURIComponent(genre)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching radio stations:', error);
        throw new Error(`Unable to fetch stations for genre "${genre}": ${error.message}`);
    }
}