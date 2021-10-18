import React from "react"
import { HeroeSearch } from "../HeroeSearch/HeroeSearch"
import styled from "styled-components"
import { MyTeam } from "../MyTeam/MyTeam"

export const TeamBuilder = () => {

    return (
        <div className="bg-light">
            <Center>
                <h1>MAKE YOUR TEAM</h1>
                <h5>SEARCH FOR HEROES AND CREATE A TEAM</h5>
                <HeroeSearch ></HeroeSearch>
            </Center>
            <MyTeam ></MyTeam>
        </div>
    )
}

const Center = styled.div`
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4);
    color: white;
    font-weight: bold;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
`