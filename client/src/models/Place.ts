export interface Place {
    name: string,
    formattedAddress: string,
    photos: [string]
    geometry: {
      location: {
        lat: number,
        long: number
      }
    }
  
  }