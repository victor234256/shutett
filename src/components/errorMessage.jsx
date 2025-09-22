// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ message }) => {
	return (
		<span className="text-sm text-red-400">{message}</span>
	);
};

export default ErrorMessage;
