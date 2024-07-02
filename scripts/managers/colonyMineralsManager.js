export const colonyMinerals = async () => {
    const response = await fetch("http://localhost:8088/colonyMinerals");
    const data = await response.json();
    return data
}