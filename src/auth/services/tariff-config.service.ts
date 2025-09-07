import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TariffConfigService, ALLOWED_TARIFF_NAMES, AllowedTariffName } from '../interfaces/tariff-config.interface';

@Injectable()
export class TariffConfigServiceImpl implements TariffConfigService {
  private readonly allowedTariffs: string[];

  constructor(private readonly configService: ConfigService) {
    const allowedTariffsEnv = this.configService.get<string>('ALLOWED_TARIFFS');
    
    if (!allowedTariffsEnv) {
      // По умолчанию все тарифы разрешены
      this.allowedTariffs = [...ALLOWED_TARIFF_NAMES];
    } else {
      // Парсим строку из env переменной
      this.allowedTariffs = allowedTariffsEnv
        .split(',')
        .map(tariff => tariff.trim().toLowerCase())
        .filter(tariff => ALLOWED_TARIFF_NAMES.includes(tariff as AllowedTariffName));
    }
  }

  getAllowedTariffs(): string[] {
    return [...this.allowedTariffs];
  }

  isTariffAllowed(tariffName: string): boolean {
    if (!tariffName) {
      return false;
    }

    const normalizedTariffName = tariffName.toLowerCase().trim();
    return this.allowedTariffs.includes(normalizedTariffName);
  }
}