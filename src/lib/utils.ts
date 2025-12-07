// FUNCIÓN PARA SANITIZAR UN INPUT DE MANERA SIMPLE
export function cleanText(text: string) {
    // Validamos si es texto sino retornamos un string vació
    if (typeof text !== "string") {
        text = String(text || "");
    }
    // Validamos Regex para solo aceptar números, letras y algunos caracteres especiales
    const regex = /[^a-zA-Z0-9\s]/g;
    const cleanedText = text.replace(regex, "");
    const trimmedText = cleanedText.replace(/\s+/g, " ").trim();
    return trimmedText;
}