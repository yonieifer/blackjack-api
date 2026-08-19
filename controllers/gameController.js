import usecase from "../usecases/usecase.js"

export const startGame = async (req, res) => {
    const player = await usecase.createNewPlayer()
    res.status(201).json(player)
}

export const startRound = async (req, res) => {
    const {bet} = req.body
    const player = req.player
    const roundDetails = await usecase.startRound(player, bet)
    res.status(201).json(roundDetails)
}