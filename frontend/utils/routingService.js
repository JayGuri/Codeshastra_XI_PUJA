export async function getRouteCoordinates(startLat, startLng, endLat, endLng) {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
    );
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes && data.routes[0]) {
      return data.routes[0].geometry.coordinates;
    }
    throw new Error('No route found');
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
}