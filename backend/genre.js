export default async function getByGenre(genre) {
    try {
        const url = `http://de1.api.radio-browser.info/json/stations/bytag/${genre}`;
        
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
        return data;
        
    } catch (error) {
        console.error('Error fetching radio stations:', error);
        throw error; // Re-throw so the route handler catches it
    }
}