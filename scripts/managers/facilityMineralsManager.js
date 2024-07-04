export const facilityMinerals = async () => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral");
    const data = await response.json();
    return data
}