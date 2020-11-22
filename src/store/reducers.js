import initialState from './data'

const maskItAsFavourite = (array, action) => {
  return array.map((advert, index) => {
    if (index !== action.payload) {
      return advert;
    }

    if (advert.isfavourite) {
      return {
        ...advert,
        isfavourite: false
      };
    } else {
      return {
        ...advert,
        isfavourite: true
      };
    }
  });
};


export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_LIST":
      return {
        ...state,
        adverts: [
          ...state.adverts,
          {            
            name: action.payload.title,
            description: action.payload.description,
            category: action.payload.category,
            isfavourite: false,
            imageUrl:"https://picsum.photos/id/166/200/300",
          }
        ]
      };
    case "MARK_AS_FAV":
      return {
        ...state,
        adverts: maskItAsFavourite(state.adverts, action)
      };
    default:
      return state;
  }
};