export const initialState = {
  customers: [],
  currentCustomer: null,
  measurementHistory: {},
  collar: {}, // Store collar details
  patti: {},  // Store پٹی details
  cuff: {},   // Store کف details
  pocket: {
    images: {
      pocketImage: '',     // Main pocket selection
      sideJaibImage: ''    // Side pocket selection
    },
    dropdowns: [
      { heading: 'فرنٹ جیب', value: '' },
      { heading: 'جیب سائز', value: '' },
      { heading: 'کندھے سے جیب', value: '' }
    ],
    styleSelections: []   // Selected style buttons
  }

};

export function stateReducer(state, action) {
  switch (action.type) {
    // ... (keep existing cases like ADD_CUSTOMER, SELECT_CUSTOMER, etc.)

    case 'UPDATE_COLLAR': {
      return {
        ...state,
        collar: {
          ...state.collar,
          ...action.payload,
        },
      };
    }
    
    case 'UPDATE_PATTI': {
      return {
        ...state,
        patti: {
          ...state.patti,
          ...action.payload,
        },
      };
    }

    case 'UPDATE_CUFF': {
      return {
        ...state,
        cuff: {
          ...state.cuff,
          ...action.payload,
        },
      };
    }

    case 'UPDATE_POCKET': {
      return {
        ...state,
        pocket: {
          // Keep existing pocket data
          ...state.pocket,
          // Deep merge for images
          images: {
            ...state.pocket.images,
            ...action.payload.images
          },
          // Update dropdowns if provided
          dropdowns: action.payload.dropdowns 
            ? state.pocket.dropdowns.map((item, index) => ({
                ...item,
                value: action.payload.dropdowns[index]?.value || item.value
              }))
            : state.pocket.dropdowns,
          // Update style selections
          styleSelections: action.payload.styleSelections 
            ? action.payload.styleSelections
            : state.pocket.styleSelections
        }
      };
    }

    // ... (keep other existing cases)

    default:
      return state;
  }
}