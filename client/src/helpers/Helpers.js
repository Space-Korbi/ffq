const appendState = (element, currentState, setState) => {
  // check if element is not empty, not just whitespace and not contained in the array
  if (
    /\S/.test(element.title) &&
    !currentState.some((stateElement) => stateElement.title === element.title)
  ) {
    setState((prevState) => [...prevState, element]);
  }
};
export default appendState;
