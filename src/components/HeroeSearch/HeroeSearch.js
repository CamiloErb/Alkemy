import { getSuperHeroes } from "../../services/getSuperHeroes"
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import { IssueClosedIcon } from "@primer/octicons-react"
import styled from "styled-components"
import { XIcon } from "@primer/octicons-react"
import { useAlert } from 'react-alert'

const validate = values => {
    const errors = {}
    if (!values.heroe) {
        errors.heroe = "field required"
    }
    return errors
}

export const HeroeSearch = (props) => {
    const alert = useAlert()
    const [searchedHeroes, setSearchedHeroes] = useState([])
    const [heroes, setHeroes] = useState([])
    const heroesId = heroes.map(heroe => heroe.id)
    const heroesAlignment = heroes.map(heroe => heroe.biography.alignment)
    const goodCount = (heroesAlignment.filter(v => v === "good")).length
    const badCount = (heroesAlignment.filter(v => v === "bad")).length


    useEffect(() => {
        setHeroes(props.heroes)
    }, [props.heroes])


    const handleClick = () => {
        setSearchedHeroes([])
        formik.values.heroe = ""
    }

    const formik = useFormik({
        initialValues: {
            heroe: ""
        }, validate,
        onSubmit: async (values) => {
            await getSuperHeroes(values.heroe)
                .then((heroes) => setSearchedHeroes(heroes))

        }
    })



    const addHeroes = (heroe) => {
        const alignment = heroe.biography.alignment
        if (heroes.length >= 6) {
            alert.show("team full")
        } else if (goodCount >= 3 && alignment === "good") {
            alert.show("only 3 good heroes per team")
        } else if (badCount >= 3 && alignment === "bad") {
            alert.show("only 3 bad heroes per team")
        } else {
            props.addHeroes(heroe)
        }

    }

    return (
        <div >
            <div className="position-relative ">
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group  ">
                        <input placeholder="Search a hero" className="form-control" id="heroe" name="heroe" type="text" value={formik.values.heroe} onChange={formik.handleChange} ></input>
                        <button className="btn btn-secondary" type="submit">Search</button>
                    </div>
                    {formik.errors.heroe && formik.touched.heroe ? <div className="alert alert-light p-1 m-1">{formik.errors.heroe}</div> : null}
                </form>
                {searchedHeroes.length > 0 ?
                    <Center className="container  m-auto mt-4">
                        <div className="row  p-3 m-auto">
                            <button className="btn btn-danger mb-2" onClick={handleClick}>
                                <XIcon size={20}></XIcon>
                            </button>
                            {searchedHeroes.map(heroe => {
                                return <div key={heroe.id} className="col-md-4 card  bg-dark border">
                                    <h4 className="card-title m-1" >{heroe.name}</h4>
                                    <img alt="heroeimage" className="card-img img-fluid" src={heroe.image.url} />
                                    {
                                        heroesId.includes(heroe.id) ?
                                            <div className="btn btn-success m-2" onClick={() => alert.show("Heroe already in my team")}>
                                                <IssueClosedIcon size={24} />
                                                already in my team</div>
                                            :
                                            <button className="btn btn-primary m-2 " onClick={() => addHeroes(heroe)}>Add to my team</button>
                                    }
                                </div>
                            })}
                        </div>
                    </Center>
                    : null}
            </div>
        </div>
    )
}

const Center = styled.div`
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.8);
    color: white;
    font-weight: bold;
    position: absolute;
    width: 100%;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
`




