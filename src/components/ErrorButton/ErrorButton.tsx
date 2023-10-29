function ErrorButton() {
  function handleError(): never {
    throw Error('You test Error boundary functionality');
  }

  return (
    <button type="button" onClick={handleError}>
      Show error
    </button>
  );
}

export default ErrorButton;
