import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render} from "@testing-library/react"
import { AvgWH } from "./AvgWH"
import { mockedHeroes } from "../../tools/mockedHeroes"

test("renders content", () => {

    const component = render(<AvgWH list={mockedHeroes}></AvgWH>)
    component.getByText("weight")
    component.getByText("height")
    component.getByText(/lbs/)
    component.getByText(/kgs/)
    component.getByText(/cms/)
    component.getByText(/fts/)
})
test("renders content with 0 in every appearence stat if heroes are not passed by props", () => {

    const component = render(<AvgWH ></AvgWH>)
    component.getByText("weight")
    component.getByText("height")
    component.getByText("0 lbs")
    component.getByText("0 kgs")
    component.getByText("0 cms")
    component.getByText("0 fts")
})
//mockedHeroes weight [170lb, 77kg] [ '210 lb', '95 kg']
// weight in lb should be 190.0 lbs (170 + 210 / 2)
// weight in kgs should be 86.0 kgs (77 + 95 / 2)  

test("show correct weight ", () => {
    const component = render(<AvgWH list={mockedHeroes}></AvgWH>)
    component.getByText("190.0 lbs")
    component.getByText("86.0 kgs")
})

//mockedHeroes height ['5 fts', '178 cm'] ['6 fts','188 cm']
// height in fts should be 5.5 fts (5  + 6  / 2)
// weight in cms should be 183.0 cms (178 + 188 / 2)  

test("show correct height ", () => {
    const component = render(<AvgWH list={mockedHeroes}></AvgWH>)
    component.getByText("5.5 fts")
    component.getByText("183.0 cms")
})

