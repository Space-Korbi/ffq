export const addValidString = (string, currentState, setState) => {
  // check if string is not empty, not just whitespace and not contained in the array
  if (/\S/.test(string) && !currentState.includes(string)) {
    setState((prevState) => [...prevState, string]);
  }
};

export const addValidButton = (object, currentState, setState) => {
  // check that button title is not empty, not just whitespace and that button not contained in the array
  if (
    /\S/.test(object.title) &&
    !currentState.some((stateElement) => stateElement.title === object.title)
  ) {
    setState((prevState) => [...prevState, object]);
  }
};

export const addValidCard = (element, currentState, setState) => {
  setState((prevState) => [...prevState, element]);
};
