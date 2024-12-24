export interface Place {
    name: string,
    formattedAddress: string,
    photos: [String]
    geometry: {
      location: {
        lat: number,
        long: number
      }
    }
  
  }