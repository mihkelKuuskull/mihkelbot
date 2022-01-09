export function trimDiscordMessage(text: string) {
    const maxLength = 4095;
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.slice(0, maxLength - 3)}...`;
}
