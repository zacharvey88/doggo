export async function fetchPlaces(query: string) {
  const url = "https://places.googleapis.com/v1/places:searchText";
  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.EXPO_PUBLIC_API_KEY,
    "X-Goog-FieldMask":
      "places.displayName,places.formattedAddress,places.googleMapsUri,places.id,places.primaryTypeDisplayName,places.location,places.photos,places.primaryTypeDisplayName,places.shortFormattedAddress,places.viewport,places.shortFormattedAddress,places.currentOpeningHours,places.internationalPhoneNumber,places.websiteUri",
  };

  const body = JSON.stringify({
    textQuery: query,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}
