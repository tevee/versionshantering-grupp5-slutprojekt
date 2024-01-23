function hexToRgb(hexColor) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

export function setContrast(hexColor) {
    const rgb = hexToRgb(hexColor)
    const brightness = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000)
    const textColor = (brightness > 125) ? '#000000' : '#ffffff'

    return textColor;
}