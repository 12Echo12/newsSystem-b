const spinReducer = (preState={spin:false},{type,next}) => {
    switch (type) {
        case "change-spin":
            let newState = { ...preState, spin: next}
            return newState;
        default:
            return preState;
    }
}
export default spinReducer;