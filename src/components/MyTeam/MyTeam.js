import { useState } from "react"
import { Powerstats } from "../Powerstats/Powerstats"
import { XIcon, InfoIcon } from "@primer/octicons-react"
import { AvgWH } from "../AvgWH/AvgWH"
import { Details } from "../Details/Details"
import {useSelector,useDispatch } from "react-redux";
import { removeHero } from "./teamSlice"
import Swal from "sweetalert2";

export const MyTeam = () => {
    const dispatch = useDispatch()
    const {myTeam} = useSelector((state) => state.team)
    const [isOpen, setIsOpen] = useState(false)
    const [clickedHeroe, setClickedHeroe] = useState({})
    const biography = clickedHeroe.biography
    const appearance = clickedHeroe.appearance



    const handleModal = (e, heroe) => {
        if (e.target.name === "deleteButton") {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setIsOpen(!isOpen)
            setClickedHeroe(heroe)
        }

    }
    const handleDelete = (id) => {
        dispatch(removeHero(id))
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Heroe deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
    }

    return <div className="bg-white ">
        <div className="container border border-dark shadow-lg mt-3 m-auto row ">
            <div className="container  border border-dark border-1 mt-3 col-lg-9  ">
                <h2 className="m-2 mt-3">MY TEAM:</h2>
                <div >

                    {myTeam.length > 0 ? null : <h4 className="m-auto mt-5 w-25 text-secondary" >no heroes added </h4>}
                    {myTeam.map(heroe => {
                        const powerstats = heroe.powerstats
                        const keys = Object.keys(powerstats)
                        return <div key={heroe.id}onClick={(e) => handleModal(e, heroe)}>
                           {isOpen ? <Details isOpen={isOpen} handleModal={handleModal} >
                                <h5>full name: {biography[`full-name`]}</h5>
                                <h5>height: {appearance.height[0]} ft/{appearance.height[1]}</h5>
                                <h5>weight: {appearance.weight[0]}/{appearance.weight[1]}</h5>
                                <h5>aliases: {biography.aliases.join(", ")}</h5>
                                <h5>eyes color: {appearance[`eye-color`]}</h5>
                                <h5>hair color: {appearance[`hair-color`]}</h5>
                                <h5>work place: {clickedHeroe.work.base}</h5>
                            </Details> : null}
                            <div key={heroe.id} className="d-flex flex-column shadow border border-secondary border-1 justify-content-between">
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="m-2"><h4 className="m-0 mt-1 ">{heroe.name}</h4></div>
                                    <div className="m-2 ">
                                        <button name="deleteButton" className="btn btn-danger p-1 " onClick={() => handleDelete(heroe.id)}>Remove<XIcon size={22} />
                                        </button>
                                    </div>
                                </div>
                                <div className=" row m-2">
                                    <div className="col-lg-3 ">
                                        <img alt="not found" className="w-100" src={heroe.image.url} />
                                    </div>
                                    <div className=" col-lg-9  d-flex justify-content-between border border-secondary">
                                        <div className="m-2"> <h3 className="m-2">powerstats</h3>
                                            <div className="m-2">{keys.map(key =>
                                                <h5 key={key} className="list-group-item-light">{key}: {powerstats[key]}</h5>
                                            )}</div></div>
                                        <div className="btn m-1" ><InfoIcon size={24} />Details</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    })}</div>
            </div>
            <div className=" mt-3 border border-secondary border-1 col-lg-3">
                <div>
                    <h3 className="m-3">Team powerstats</h3>
                    <Powerstats list={myTeam}></Powerstats>
                </div>
                <div>
                    <h3 className="m-3">team weights and heights (avg)</h3>
                    <AvgWH list={myTeam}></AvgWH>
                </div>

            </div>
        </div>

    </div>
}

