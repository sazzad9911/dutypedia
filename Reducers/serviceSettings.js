const initialState = [
  {
    title: "Bargaining",
    value: true,
  },
  {
    title: "Fixed",
    value: false,
  },
  {
    title: "Installment",
    value: false,
  },
  {
    title: "Subscription",
    value: false,
  },
  {
    title: "Package",
    value: false,
  },
];
const serviceSettings = (state = initialState, action) => {
  if (action.type === "SET_SERVICE_SETTINGS") {
    return (state = action.playload);
  }
  if (action.type === "CHECKED") {
    let newState = state.map(d=>{
      if(d.title==action.playload){
        return {
          title: d.title,
          value: (!d.value)
        }
      }
      return d
    });
    return newState;
  }
  return state;
};
export default serviceSettings;
