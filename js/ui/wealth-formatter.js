/**
 * Formats wealth amount in gp/sp/cp currency notation.
 * The decimal representation is interpreted as: integer.spcp
 * where sp is first decimal digit (0-9) and cp is second decimal digit (0-9).
 * @param {number} wealth
 * @returns {string}
 */
export function formatWealth(wealth) {
    const totalCopper = Math.max(0, Math.round(wealth * 100));
    const gp = Math.floor(totalCopper / 100);
    const sp = Math.floor((totalCopper % 100) / 10);
    const cp = totalCopper % 10;
    const parts = [];
    
    if (gp > 0 || (sp === 0 && cp === 0)) {
        parts.push(`${gp} gp`);
    }
    
    if (sp > 0) {
        parts.push(`${sp} sp`);
    }
    
    if (cp > 0) {
        parts.push(`${cp} cp`);
    }
    
    return parts.join(", ");
}
