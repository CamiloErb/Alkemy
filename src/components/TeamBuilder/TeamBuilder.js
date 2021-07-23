import React, { useState } from "react"
import { HeroeSearch } from "../HeroeSearch/HeroeSearch"
import styled from "styled-components"
import { MyTeam } from "../MyTeam/MyTeam"

export const TeamBuilder = () => {

    const [heroes, setHeroes] = useState([])

    const addHeroes = (heroe) => {
        setHeroes([...heroes, heroe])
    }

    const deleteHeroes = (id) => {
        const updatedHeroes = heroes.filter(heroe => heroe.id !== id)
        setHeroes(updatedHeroes)

    }

    return (
        <div className="bg-light">
            <Center>
                <h1>MAKE YOUR TEAM</h1>
                <h5>SEARCH FOR A HERO AND ADD IT TO YOUR TEAM</h5>
                <HeroeSearch addHeroes={addHeroes} heroes={heroes} ></HeroeSearch>
            </Center>
            <MyTeam deleteHeroes={deleteHeroes} heroes={heroes}></MyTeam>
        </div>
    )
}


const Center = styled.div`
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4);
    color: white;
    font-weight: bold;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
`