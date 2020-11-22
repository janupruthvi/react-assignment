export const actionCreators = {
  addToList: data => ({ type: "ADD_TO_LIST", payload: data }),
  maskItAsFav: data => ({ type: "MARK_AS_FAV", payload: data }),
};