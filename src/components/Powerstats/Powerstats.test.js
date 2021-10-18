import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render} from "@testing-library/react"
import { Powerstats } from "./Powerstats"
import { mockedHeroes } from "../../tools/mockedHeroes"

test("render content", () => {
    const component = render(<Powerstats list={mockedHeroes}></Powerstats>)
    component.getByText("intelligence:")
    component.getByText("strength:")
    component.getByText("speed:")
    component.getByText("durability:")
    component.getByText("power:")
    component.getByText("combat:")
})

test("render content with 0 in every stat when no heroes are passed by props", () => {
    const component = render(<Powerstats ></Powerstats>)
    const all0 = component.queryAllByText("0")
    expect(all0.length).toBe(6)
})

test("render actual numbers of stats with mocked heroes", () => {
    const component = render(<Powerstats list={mockedHeroes}></Powerstats>)
    component.getByText("181") //intelligence 81 + 100 = 181
    component.getByText("66") //strength 40 + 26 = 66
    component.getByText("56") // speed 29 + 27 = 56
    component.getByText("105") // durability 55 + 50 = 105
    component.getByText("110") // power 47 + 63 = 110
    component.getByText("190") // combat 90 + 100
})