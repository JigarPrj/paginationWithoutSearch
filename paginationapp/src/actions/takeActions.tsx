const initialState = {
    Data: [],
  };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, action:any) => {
    switch (action.type) {
      case 'GET_DATA':
        return {
          ...state,
          Data: [action.payload]
        };
      default:
        return state;
    }
  };