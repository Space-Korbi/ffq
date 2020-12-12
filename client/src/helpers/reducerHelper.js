import AnswerType from './answer-type';

const reducerHelper = {
  addButton: (state, action) => {
    const newButton = { id: action.payload.id, title: action.payload.title };
    if (action.payload.position === 'left') {
      const buttonsLeft = state.frequencyOptions.left.concat(newButton);
      return {
        type: AnswerType.Frequency,
        frequencyOptions: { left: buttonsLeft, right: state.frequencyOptions.right },
        amountOptions: [],
        userInputOptions: {}
      };
    }
    const buttonsRight = state.frequencyOptions.right.concat(newButton);
    return {
      type: AnswerType.Frequency,
      frequencyOptions: { left: state.frequencyOptions.left, right: buttonsRight },
      amountOptions: [],
      userInputOptions: {}
    };
  },

  removeButton: (state, action) => {
    if (action.payload.position === 'left') {
      const buttonsLeft = state.frequencyOptions.left.filter(
        (button) => button.id !== action.payload.id
      );
      return {
        type: AnswerType.Frequency,
        frequencyOptions: { left: buttonsLeft, right: state.frequencyOptions.right },
        amountOptions: [],
        userInputOptions: {}
      };
    }
    const buttonsRight = state.frequencyOptions.right.filter(
      (button) => button.id !== action.payload.id
    );
    return {
      type: AnswerType.Frequency,
      frequencyOptions: { left: state.frequencyOptions.left, right: buttonsRight },
      amountOptions: [],
      userInputOptions: {}
    };
  },

  changeButtonTitle: (state, action) => {
    if (action.payload.position === 'left') {
      const newState = state.frequencyOptions.left.map((el) =>
        el.id === action.payload.id ? { ...el, title: action.payload.title } : el
      );
      return {
        type: AnswerType.Frequency,
        frequencyOptions: { left: newState, right: state.frequencyOptions.right },
        amountOptions: [],
        userInputOptions: {}
      };
    }
    const newState = state.frequencyOptions.right.map((el) =>
      el.id === action.payload.id ? { ...el, title: action.payload.title } : el
    );
    return {
      type: AnswerType.Frequency,
      frequencyOptions: { left: state.frequencyOptions.left, right: newState },
      amountOptions: [],
      userInputOptions: {}
    };
  }
};

export default reducerHelper;
