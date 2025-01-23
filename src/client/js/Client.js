function checkForName(inputText) {
    const pattern = /^(http|https):\/\/[^ "]+$/;
    return pattern.test(inputText);
}

export { checkForName };