function ErrorMessage({ message }) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <img src="./PepeSadge.webp" className="w-50 h-64" />
            <p className="text-gray-300 text-2xl">{message}</p>
        </div>
      );
}

export default ErrorMessage;