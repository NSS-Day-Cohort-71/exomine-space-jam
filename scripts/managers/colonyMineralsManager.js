export const colonyMinerals = async () => {
    const response = await fetch("http://localhost:8088/colonyMinerals?_expand=mineral");
    const data = await response.json();
    return data
}