import usecase from "../usecases/usecase.js";

export const startGame = async (req, res) => {
    const player = await usecase.createNewPlayer();
    res.status(201).json(player);
};

export const startRound = async (req, res) => {
    const { bet } = req.body;
    const player = req.player;
    const roundDetails = await usecase.startRound(player, bet);
    res.status(201).json(roundDetails);
};

export const hit = async (req, res) => {
    const player = req.player;
    const roundDetails = await usecase.hit(player);
    res.status(200).json(roundDetails);
};

export const stand = async (req, res) => {
    const player = req.player;
    const roundResults = await usecase.stand(player);
    res.status(200).json(roundResults);
};

export const getMyRound = async (req, res) => {
    const player = req.player;
    const myRound = await usecase.getRoundDetails(player);
    res.status(200).json(myRound);
};
