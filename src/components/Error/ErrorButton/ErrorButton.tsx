import React from 'react';
import styles from './ErrorButton.module.css';

interface State {
  hasError: boolean;
}

class ErrorButton extends React.Component<Record<string, never>, State> {
  state: State = { hasError: false };

  handleError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('You test Error boundary functionality');
    }

    return (
      <button
        type="button"
        onClick={this.handleError}
        className={styles.errorButton}
      >
        Show error
      </button>
    );
  }
}

export default ErrorButton;
