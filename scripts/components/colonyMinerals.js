import { colonyMinerals } from "../managers/colonyMineralsManager.js"
import { minerals } from "../managers/mineralManager.js"

export const getColonyMinerals = async (colonyId) => {
    const colonyMineralsData = await colonyMinerals()
    const mineralsData = await minerals()

    return colonyMineralsData
        .filter(cm => cm.colonyId === colonyId)
        .map(cm => {
            const mineral = mineralsData.find(m => m.id === cm.mineralId)
            return {
                mineral: mineral.type,
                quantity: cm.quantity
            }
        })
}