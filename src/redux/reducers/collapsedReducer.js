const collapsedReducer =(preState = {collapsed:false},{type})=>{
    switch (type) {
        case "change-collapsed":
            let newState = { ...preState, collapsed: !preState.collapsed };
            return newState;
        default:
            return preState;

    }
}
export default collapsedReducer