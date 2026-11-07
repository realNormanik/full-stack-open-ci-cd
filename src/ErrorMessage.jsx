const ErrorMessage = ({ error }) => (
  <div className="error-message" data-testid="error" role="alert">
    An error occured: {error.toString()}
  </div>
);

export default ErrorMessage;
