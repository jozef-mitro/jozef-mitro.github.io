export async function writeClipboardText(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
        if (!document.execCommand("copy")) {
            throw new Error("document.execCommand('copy') returned false.");
        }
    } finally {
        document.body.removeChild(textArea);
    }
}
