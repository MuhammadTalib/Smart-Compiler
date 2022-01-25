import { CHANGE_TEXT } from "./action";

const initialState = {
  text: "#include <stdio.h>\nint main(){\n}",
};

export const editor_reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TEXT: {
      return {
        ...state,
        text: action.text,
      };
    }
    default:
      return state;
  }
};
