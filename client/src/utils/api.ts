export const textSearch = async () => {
    try {
        const response = await fetch('/api/textSearch');
        return response;
    } catch (error) {
        console.error('Error fetching data 111:', error);
        throw error;
    }
}