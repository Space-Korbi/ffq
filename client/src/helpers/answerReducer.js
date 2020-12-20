import AnswerType from './answer-type';

const reducerHelper = {
  /**
   * * Reducer Helper
   * The Reducer is initalized in the QuestionEditor component.
   * The dispatch method is passed down to the component that recieves the user input.
   * Then dispatch is called with one of the following action types.
   * Each function either adds, removes or changes a value of the answer object.
   * The answer object only contains one type of answer option. All other keys will be omitted.
   * i.e. addButton() returns only frequencyOptions.
   * The other keys for amountOptions and userInputOptions are omitted.
   */

  setDefaultState: (action) => {
    return {
      type: action.payload.answerType,
      frequencyOptions: { left: [], right: [] },
      amountOptions: [],
      userInputOptions: []
    };
  },
  addButton: (state, action) => {
    const newButton = { id: action.payload.id, title: action.payload.title };
    if (action.payload.position === 'left') {
      const buttonsLeft = state.frequencyOptions.left.concat(newButton);
      return {
        type: AnswerType.Frequency,
        frequencyOptions: { left: buttonsLeft, right: state.frequencyOptions.right }
      };
    }
    const buttonsRight = state.frequencyOptions.right.concat(newButton);
    return {
      type: AnswerType.Frequency,
      frequencyOptions: { left: state.frequencyOptions.left, right: buttonsRight }
    };
  },
  removeButton: (state, action) => {
    if (action.payload.position === 'left') {
      const buttonsLeft = state.frequencyOptions.left.filter(
        (button) => button.id !== action.payload.id
      );
      return {
        type: AnswerType.Frequency,
        frequencyOptions: { left: buttonsLeft, right: state.frequencyOptions.right }
      };
    }
    const buttonsRight = state.frequencyOptions.right.filter(
      (button) => button.id !== action.payload.id
    );
    return {
      type: AnswerType.Frequency,
      frequencyOptions: { left: state.frequencyOptions.left, right: buttonsRight }
    };
  },
  changeButtonTitle: (state, action) => {
    if (action.payload.position === 'left') {
      const newState = state.frequencyOptions.left.map((el) =>
        el.id === action.payload.id ? { ...el, title: action.payload.title } : el
      );
      return {
        type: AnswerType.Frequency,
        frequencyOptions: { left: newState, right: state.frequencyOptions.right }
      };
    }
    const newState = state.frequencyOptions.right.map((el) =>
      el.id === action.payload.id ? { ...el, title: action.payload.title } : el
    );
    return {
      type: AnswerType.Frequency,
      frequencyOptions: { left: state.frequencyOptions.left, right: newState }
    };
  },

  addCard: (state, action) => {
    const newCard = {
      id: action.payload.id,
      title: '',
      imageURL: ''
    };
    const cards = state.amountOptions.concat(newCard);
    return {
      type: AnswerType.Amount,
      amountOptions: cards
    };
  },
  removeCard: (state, action) => {
    const cards = state.amountOptions.filter((card) => card.id !== action.payload.id);
    return {
      type: AnswerType.Amount,
      amountOptions: cards
    };
  },
  changeCardTitle: (state, action) => {
    const newState = state.amountOptions.map((el) =>
      el.id === action.payload.id ? { ...el, title: action.payload.title } : el
    );
    return {
      type: AnswerType.Amount,
      amountOptions: newState
    };
  },
  changeCardImage: (state, action) => {
    const newState = state.amountOptions.map((el) => {
      return el.id === action.payload.id
        ? { ...el, imageURL: action.payload.imageURL, imageData: action.payload.imageData }
        : el;
    });
    return {
      type: AnswerType.Amount,
      amountOptions: newState
    };
  },
  removeCardImage: (state, action) => {
    const newState = state.amountOptions.map((el) => {
      return el.id === action.payload.id ? { ...el, imageURL: '', imageData: undefined } : el;
    });
    return {
      type: AnswerType.Amount,
      amountOptions: newState
    };
  },
  addTextInput: (state, action) => {
    const newTextInput = {
      id: action.payload.id,
      title: 'Title',
      hasNumberInput: false
    };
    const textInputs = state.userInputOptions.concat(newTextInput);
    return {
      type: AnswerType.UserInput,
      userInputOptions: textInputs
    };
  },
  removeTextInput: (state, action) => {
    const textInputs = state.userInputOptions.filter(
      (textInput) => textInput.id !== action.payload.id
    );
    return {
      type: AnswerType.UserInput,
      userInputOptions: textInputs
    };
  },
  changeTextInputTitle: (state, action) => {
    const newState = state.userInputOptions.map((el) =>
      el.id === action.payload.id ? { ...el, title: action.payload.title } : el
    );
    return {
      type: AnswerType.UserInput,
      userInputOptions: newState
    };
  },
  addNumberInput: (state, action) => {
    const newState = state.userInputOptions.map((el) =>
      el.id === action.payload.id
        ? { ...el, hasNumberInput: true, numberInputTitle: action.payload.numberInputTitle }
        : el
    );
    return {
      type: AnswerType.UserInput,
      userInputOptions: newState
    };
  },
  removeNumberInput: (state, action) => {
    const newState = state.userInputOptions.map((el) =>
      el.id === action.payload.id ? { ...el, hasNumberInput: false } : el
    );
    return {
      type: AnswerType.UserInput,
      userInputOptions: newState
    };
  },
  changeNumberInputTitle: (state, action) => {
    const newState = state.userInputOptions.map((el) =>
      el.id === action.payload.id
        ? { ...el, numberInputTitle: action.payload.numberInputTitle }
        : el
    );
    return {
      type: AnswerType.UserInput,
      userInputOptions: newState
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
