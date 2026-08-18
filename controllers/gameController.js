import usecase from "../usecases/usecase.js"

export const startGame = async (req, res) => {
    const player = await usecase.createNewPlayer()
    res.json(player)
}