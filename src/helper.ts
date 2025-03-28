const kebabCaseToTitleCase = (colorName: string) => {
    const colorWithSpaces = colorName.replace(/-/g, " ");
    const colorWithCaps = colorWithSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
    return colorWithCaps;

}

export default kebabCaseToTitleCase
