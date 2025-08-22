import { format } from "date-fns/format";

export function formatDateForDisplay(date: Date): string {
    return format(date, "PPpp");
}

export function isWithinBusinessHours(): boolean {
    // Lógica para verificar se está dentro do horário comercial
    return false;
}