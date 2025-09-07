export interface TariffConfigService {
  getAllowedTariffs(): string[];
  isTariffAllowed(tariffName: string): boolean;
}

export const ALLOWED_TARIFF_NAMES = ['free', 'development', 'student', 'unlimited'] as const;
export type AllowedTariffName = typeof ALLOWED_TARIFF_NAMES[number];