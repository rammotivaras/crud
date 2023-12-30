export function truncateText(inputText, maxLength) {
  if (inputText.length <= maxLength) {
    return inputText;
  } else {
    return inputText.substring(0, maxLength) + " ...";
  }
}

// export default truncateText;
