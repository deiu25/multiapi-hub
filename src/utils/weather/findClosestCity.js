import cities from 'cities.json';

const toRadians = (degrees) => degrees * (Math.PI / 180);

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export const findClosestCity = (userLat, userLon) => {
    let closestCity = null;
    let minDistance = Infinity;

    cities.forEach(city => {
        const distance = haversineDistance(userLat, userLon, parseFloat(city.lat), parseFloat(city.lng));
        if (distance < minDistance) {
            minDistance = distance;
            closestCity = city;
        }
    });

    return closestCity;
};
