export const fetchUserLocation = async () => {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
                },
                async (error) => {
                    console.warn("Geolocation error:", error);
                    try {
                        const response = await fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1", {
                            method: "GET",
                            headers: {
                                "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
                                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                            },
                        });
                        const data = await response.json();
                        if (data.data && data.data.length > 0) {
                            const city = data.data[0];
                            resolve({ lat: city.latitude, lon: city.longitude });
                        } else {
                            reject("The GeoDB API did not return any data.");
                        }
                    } catch (err) {
                        reject(err);
                    }
                }
            );
        } else {
            reject("Geolocation is not available in this browser.");
        }
    });
};
