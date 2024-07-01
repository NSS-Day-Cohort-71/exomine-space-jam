export const governors = async () => {
    const response = await fetch("http://localhost:8088/governors?_expand=colony");
    const data = await response.json();
    return data
}