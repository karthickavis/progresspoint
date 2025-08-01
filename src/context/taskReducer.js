const taskReducer=(state,action)=>{
    switch(action.type){
        case 'ADD':
            return [...state,action.payload];
        case 'DELETE':
        return state.filter(task=>task.id!==action.payload);

        case 'EDIT':
            return state.map(task=>task.id===action.payload.id?action.payload:task);

        case 'TOGGLE':
            return state.map(task=>task.id===action.payload?{...task,completed:!task.completed}:task);

        default :
        return state;
    }

}
export default taskReducer;