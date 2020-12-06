const appendState = (element, currentState, setState) => {
  // check if element is not empty and not just whitespace
  if (/\S/.test(element) && !currentState.includes(element)) {
    setState((prevState) => [...prevState, element]);
  }
};
export default appendState;
