export async function geocodeAddress(address) {
  try {
    // Using Nominatim API from OpenStreetMap for geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }
    throw new Error(`Location not found for: ${address}`);
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
