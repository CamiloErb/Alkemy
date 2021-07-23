import { TeamBuilder } from "../components/TeamBuilder/TeamBuilder"
import image from "../images/comic-image-3.jpg"
import styled from "styled-components"

export const Home = () => {
    return <div>
        <Bar ></Bar>
        <div className="bg-dark"><Image className="w-100" alt="comic" src={image}></Image></div>
        <Bar ></Bar>
        <Bar></Bar>
        <TeamBuilder></TeamBuilder>
    </div>
}


const Bar = styled.div`
    width: 100%;
    height: 1em;
    background-color: black;
`

const Image = styled.img`
    opacity: 0.5;
    filter: blur(1px);
    height: 27em
`