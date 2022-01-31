import { NextPage } from "next";
import React from "react";
import Game2048 from "../../components/2048";

const games: NextPage = () => {
    return (
        <div>
            <Game2048 />
        </div>
    )
}

export default games;