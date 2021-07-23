

export const AvgWH = (props) => {
    const heights = props.list.map(heroe => heroe.appearance.height)
    const weights = props.list.map(heroe => heroe.appearance.weight)
    const lbs = weights.map(v => v[0])
    const kgs = weights.map(v => v[1])
    const fts = heights.map(v => v[0])
    const cms = heights.map(v => v[1])

    const transformList = list => {
        const sliced = list.map(str => str.slice(0, 3))
        const stringToNumber = sliced.map(string => parseInt(string))
        const sumNumbers = stringToNumber.reduce((a, b) => a + b, 0)
        const avg = sumNumbers / list.length
        const fixed = avg.toFixed(1)
        if(list.length) {
            return fixed
        } else {
            return 0
        }
    }


    return <div className="m-2 list-group">
        <div className="list-group-item">
            <h5>weight</h5>
            <div >
                <h5 className="list-group-item">{transformList(lbs)} lbs</h5>
                <h5 className="list-group-item">{transformList(kgs)} kgs</h5>
            </div>
        </div>
        <div className="list-group-item">
            <h4>height</h4>
            <div >
                <h5 className="list-group-item">{transformList(fts)} fts</h5>
                <h5 className="list-group-item" >{transformList(cms)} cms</h5>
            </div>
        </div>
    </div>
}