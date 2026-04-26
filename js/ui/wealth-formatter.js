/**
 * Formats wealth amount in gp/sp/cp currency notation.
 * The decimal representation is interpreted as: integer.spcp
 * where sp is first decimal digit (0-9) and cp is second decimal digit (0-9).
 * @param {number} wealth
 * @returns {string}
 */
export function formatWealth(wealth) {
    // Parse the number to extract integer and decimal parts
    const floorValue = Math.floor(wealth);
    const decimalPart = wealth - floorValue;
    
    let sp = 0;
    let cp = 0;
    
    if (decimalPart > 0) {
        // Get first decimal digit (tenths place) for silver pieces
        sp = Math.floor(decimalPart * 10);
        // Get second decimal digit (hundredths place) for copper pieces
        cp = Math.floor((decimalPart * 100) % 10);
    }
    
    const gp = floorValue;
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
