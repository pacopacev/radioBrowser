export default async function getByGenre(server, genre) {
    // console.log(server, genre);
    try {
const url = `${server}/json/stations/bytag/${genre}`;
        // console.log(url);
        
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
        
        // console.log(data);
        return data;
        
    } catch (error) {
        console.error('Error fetching radio stations:', error);
        throw error; // Re-throw so the route handler catches it
    }
}