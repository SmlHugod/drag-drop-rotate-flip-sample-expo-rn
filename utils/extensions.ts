/**
 * Vérifie si une chaîne de caractères est nulle, indéfinie ou vide après suppression des espaces.
 * @returns {boolean} true si la chaîne est nulle, indéfinie ou vide, false sinon.
 */

export function loadExtensions() {
    String.prototype.isNullOrEmpty = function (): boolean {
    return this === null || this === undefined || this.trim() === "";
    };
}