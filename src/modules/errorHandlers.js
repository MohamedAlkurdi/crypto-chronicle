export const handleCallsLimitError = (retryInMilliseconds = 60000) => {
    const errorMessage = document.createElement('div');
    errorMessage.innerText = 'API call limit error, retrying in a minute...';
    errorMessage.id = 'api-error-message';
    errorMessage.style = 'position: fixed; bottom: 10px; left: 10px; background-color: red; color: white; padding: 10px; z-index: 1000;';
    document.body.appendChild(errorMessage);

    const timeout = setTimeout(() => {
        location.reload();
    }, retryInMilliseconds);

    return () => {
        clearTimeout(timeout);
        const existingMessage = document.getElementById('api-error-message');
        if (existingMessage) {
            document.body.removeChild(existingMessage);
        }
    };
};
