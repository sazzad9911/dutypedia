const initialState = [];
const ListSelection = (state = initialState, action) => {
  if (action.type == "SET_LIST_SELECTION") {
    return action.playload;
  }
  if (action.type == "ADD_LIST_SELECTION") {
    return [...state, action.playload];
  }
  return state;
};
export default ListSelection;
