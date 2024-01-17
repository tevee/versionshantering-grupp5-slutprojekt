export function autoHeightOnTextArea() {
    const textareaEl = document.querySelector('#message')
    textareaEl.style.height = '1px';
    textareaEl.style.height = `${textareaEl.scrollHeight}px`;
}