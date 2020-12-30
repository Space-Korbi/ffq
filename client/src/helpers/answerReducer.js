import AnswerType from '../types/answer-type';

const reducerHelper = {
  /**
   * * Reducer Helper
   * The Reducer is initalized in the QuestionEditor component.
   * The dispatch method is passed down to the component that recieves the user input.
   * Then dispatch is called with one of the following action types.
   * Each function either adds, removes or changes a value of the answer object.
   * The answer object only contains one type of answer option. All other keys will be omitted.
   * i.e. addButton() returns only left and right button arrays.
   */

  setDefaultState: (action) => {
    let options = [];
    if (action.payload.answerType === AnswerType.Frequency) {
      options = { left: [], right: [] };
    }
    return {
      type: action.payload.answerType,
      options
    };
  },
  addButton: (state, action) => {
    const newButton = { id: action.payload.id, title: action.payload.title };
    if (action.payload.position === 'left') {
      const buttonsLeft = state.options.left.concat(newButton);
      return {
        type: AnswerType.Frequency,
        options: { left: buttonsLeft, right: state.options.right }
      };
    }
    const buttonsRight = state.options.right.concat(newButton);
    return {
      type: AnswerType.Frequency,
      options: { left: state.options.left, right: buttonsRight }
    };
  },
  removeButton: (state, action) => {
    if (action.payload.position === 'left') {
      const buttonsLeft = state.options.left.filter((button) => button.id !== action.payload.id);
      return {
        type: AnswerType.Frequency,
        options: { left: buttonsLeft, right: state.options.right }
      };
    }
    const buttonsRight = state.options.right.filter((button) => button.id !== action.payload.id);
    return {
      type: AnswerType.Frequency,
      options: { left: state.options.left, right: buttonsRight }
    };
  },
  changeButtonTitle: (state, action) => {
    if (action.payload.position === 'left') {
      const newState = state.options.left.map((el) =>
        el.id === action.payload.id ? { ...el, title: action.payload.title } : el
      );
      return {
        type: AnswerType.Frequency,
        options: { left: newState, right: state.options.right }
      };
    }
    const newState = state.options.right.map((el) =>
      el.id === action.payload.id ? { ...el, title: action.payload.title } : el
    );
    return {
      type: AnswerType.Frequency,
      options: { left: state.options.left, right: newState }
    };
  },

  addCard: (state, action) => {
    const newCard = {
      id: action.payload.id,
      title: '',
      imageURL: ''
    };
    const cards = state.options.concat(newCard);
    return {
      type: AnswerType.Amount,
      options: cards
    };
  },
  removeCard: (state, action) => {
    const cards = state.options.filter((card) => card.id !== action.payload.id);
    return {
      type: AnswerType.Amount,
      options: cards
    };
  },
  changeCardTitle: (state, action) => {
    const newState = state.options.map((el) =>
      el.id === action.payload.id ? { ...el, title: action.payload.title } : el
    );
    return {
      type: AnswerType.Amount,
      options: newState
    };
  },
  changeCardImage: (state, action) => {
    const newState = state.options.map((el) => {
      return el.id === action.payload.id
        ? { ...el, imageURL: action.payload.imageURL, imageData: action.payload.imageData }
        : el;
    });
    return {
      type: AnswerType.Amount,
      options: newState
    };
  },
  removeCardImage: (state, action) => {
    const newState = state.options.map((el) => {
      return el.id === action.payload.id ? { ...el, imageURL: '', imageData: undefined } : el;
    });
    return {
      type: AnswerType.Amount,
      options: newState
    };
  },
  addTextInput: (state, action) => {
    const newTextInput = {
      id: action.payload.id,
      title: 'Title',
      hasNumberInput: false
    };
    const textInputs = state.options.concat(newTextInput);
    return {
      type: AnswerType.UserInput,
      options: textInputs
    };
  },
  removeTextInput: (state, action) => {
    const textInputs = state.options.filter((textInput) => textInput.id !== action.payload.id);
    return {
      type: AnswerType.UserInput,
      options: textInputs
    };
  },
  changeTextInputTitle: (state, action) => {
    const newState = state.options.map((el) =>
      el.id === action.payload.id ? { ...el, title: action.payload.title } : el
    );
    return {
      type: AnswerType.UserInput,
      options: newState
    };
  },
  addNumberInput: (state, action) => {
    const newState = state.options.map((el) =>
      el.id === action.payload.id
        ? { ...el, hasNumberInput: true, numberInputTitle: action.payload.numberInputTitle }
        : el
    );
    return {
      type: AnswerType.UserInput,
      options: newState
    };
  },
  removeNumberInput: (state, action) => {
    const newState = state.options.map((el) =>
      el.id === action.payload.id ? { ...el, hasNumberInput: false } : el
    );
    return {
      type: AnswerType.UserInput,
      options: newState
    };
  },
  changeNumberInputTitle: (state, action) => {
    const newState = state.options.map((el) =>
      el.id === action.payload.id
        ? { ...el, numberInputTitle: action.payload.numberInputTitle }
        : el
    );
    return {
      type: AnswerType.UserInput,
      options: newState
    };
  }
};

const answerReducer = (state, action) => {
  switch (action.type) {
    case 'setDefaultState':
      return reducerHelper.setDefaultState(action);
    case 'addButton':
      return reducerHelper.addButton(state, action);
    case 'removeButton':
      return reducerHelper.removeButton(state, action);
    case 'changeButtonTitle':
      return reducerHelper.changeButtonTitle(state, action);
    case 'addCard':
      return reducerHelper.addCard(state, action);
    case 'removeCard':
      return reducerHelper.removeCard(state, action);
    case 'changeCardTitle':
      return reducerHelper.changeCardTitle(state, action);
    case 'changeCardImage':
      return reducerHelper.changeCardImage(state, action);
    case 'removeCardImage':
      return reducerHelper.removeCardImage(state, action);
    case 'addTextInput':
      return reducerHelper.addTextInput(state, action);
    case 'removeTextInput':
      return reducerHelper.removeTextInput(state, action);
    case 'changeTextInputTitle':
      return reducerHelper.changeTextInputTitle(state, action);
    case 'addNumberInput':
      return reducerHelper.addNumberInput(state, action);
    case 'removeNumberInput':
      return reducerHelper.removeNumberInput(state, action);
    case 'changeNumberInputTitle':
      return reducerHelper.changeNumberInputTitle(state, action);
    default:
      return state;
  }
};

export default answerReducer;
