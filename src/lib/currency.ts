// Currency formatting utility
interface CurrencyConfig {
  symbol: string;
  code: string;
  locale: string;
  name: string;
}

export const currencyConfig: Record<string, CurrencyConfig> = {
  AED: { symbol: 'د.إ', code: 'AED', locale: 'ar-AE', name: 'UAE Dirham' },
  AFN: { symbol: '؋', code: 'AFN', locale: 'fa-AF', name: 'Afghan Afghani' },
  ALL: { symbol: 'L', code: 'ALL', locale: 'sq-AL', name: 'Albanian Lek' },
  AMD: { symbol: '֏', code: 'AMD', locale: 'hy-AM', name: 'Armenian Dram' },
  ANG: { symbol: 'ƒ', code: 'ANG', locale: 'nl-AN', name: 'Dutch Guilder' },
  AOA: { symbol: 'Kz', code: 'AOA', locale: 'pt-AO', name: 'Angolan Kwanza' },
  ARS: { symbol: '$', code: 'ARS', locale: 'es-AR', name: 'Argentine Peso' },
  AUD: { symbol: 'A$', code: 'AUD', locale: 'en-AU', name: 'Australian Dollar' },
  AWG: { symbol: 'ƒ', code: 'AWG', locale: 'nl-AW', name: 'Aruban Florin' },
  AZN: { symbol: '₼', code: 'AZN', locale: 'az-AZ', name: 'Azerbaijani Manat' },
  BAM: { symbol: 'КМ', code: 'BAM', locale: 'bs-BA', name: 'Bosnia-Herzegovina Convertible Mark' },
  BBD: { symbol: '$', code: 'BBD', locale: 'en-BB', name: 'Barbadian Dollar' },
  BDT: { symbol: '৳', code: 'BDT', locale: 'bn-BD', name: 'Bangladeshi Taka' },
  BGN: { symbol: 'лв', code: 'BGN', locale: 'bg-BG', name: 'Bulgarian Lev' },
  BHD: { symbol: '.د.ب', code: 'BHD', locale: 'ar-BH', name: 'Bahraini Dinar' },
  BIF: { symbol: 'FBu', code: 'BIF', locale: 'rn-BI', name: 'Burundian Franc' },
  BMD: { symbol: '$', code: 'BMD', locale: 'en-BM', name: 'Bermudan Dollar' },
  BND: { symbol: '$', code: 'BND', locale: 'ms-BN', name: 'Brunei Dollar' },
  BOB: { symbol: '$b', code: 'BOB', locale: 'es-BO', name: 'Bolivian Boliviano' },
  BRL: { symbol: 'R$', code: 'BRL', locale: 'pt-BR', name: 'Brazilian Real' },
  BSD: { symbol: '$', code: 'BSD', locale: 'en-BS', name: 'Bahamian Dollar' },
  BTN: { symbol: 'Nu.', code: 'BTN', locale: 'dz-BT', name: 'Bhutanese Ngultrum' },
  BWP: { symbol: 'P', code: 'BWP', locale: 'en-BW', name: 'Botswanan Pula' },
  BYN: { symbol: 'Br', code: 'BYN', locale: 'be-BY', name: 'Belarusian Ruble' },
  BZD: { symbol: 'BZ$', code: 'BZD', locale: 'en-BZ', name: 'Belize Dollar' },
  CAD: { symbol: 'C$', code: 'CAD', locale: 'en-CA', name: 'Canadian Dollar' },
  CDF: { symbol: 'FC', code: 'CDF', locale: 'fr-CD', name: 'Congolese Franc' },
  CHF: { symbol: 'Fr', code: 'CHF', locale: 'de-CH', name: 'Swiss Franc' },
  CLP: { symbol: '$', code: 'CLP', locale: 'es-CL', name: 'Chilean Peso' },
  CNY: { symbol: '¥', code: 'CNY', locale: 'zh-CN', name: 'Chinese Yuan' },
  COP: { symbol: '$', code: 'COP', locale: 'es-CO', name: 'Colombian Peso' },
  CRC: { symbol: '₡', code: 'CRC', locale: 'es-CR', name: 'Costa Rican Colón' },
  CUC: { symbol: '$', code: 'CUC', locale: 'es-CU', name: 'Cuban Convertible Peso' },
  CUP: { symbol: '₱', code: 'CUP', locale: 'es-CU', name: 'Cuban Peso' },
  CVE: { symbol: '$', code: 'CVE', locale: 'pt-CV', name: 'Cape Verdean Escudo' },
  CZK: { symbol: 'Kč', code: 'CZK', locale: 'cs-CZ', name: 'Czech Koruna' },
  DJF: { symbol: 'Fdj', code: 'DJF', locale: 'fr-DJ', name: 'Djiboutian Franc' },
  DKK: { symbol: 'kr', code: 'DKK', locale: 'da-DK', name: 'Danish Krone' },
  DOP: { symbol: 'RD$', code: 'DOP', locale: 'es-DO', name: 'Dominican Peso' },
  DZD: { symbol: 'دج', code: 'DZD', locale: 'ar-DZ', name: 'Algerian Dinar' },
  EGP: { symbol: '£', code: 'EGP', locale: 'ar-EG', name: 'Egyptian Pound' },
  ERN: { symbol: 'Nfk', code: 'ERN', locale: 'ti-ER', name: 'Eritrean Nakfa' },
  ETB: { symbol: 'Br', code: 'ETB', locale: 'am-ET', name: 'Ethiopian Birr' },
  EUR: { symbol: '€', code: 'EUR', locale: 'en-EU', name: 'Euro' },
  FJD: { symbol: '$', code: 'FJD', locale: 'en-FJ', name: 'Fijian Dollar' },
  FKP: { symbol: '£', code: 'FKP', locale: 'en-FK', name: 'Falkland Islands Pound' },
  GBP: { symbol: '£', code: 'GBP', locale: 'en-GB', name: 'British Pound Sterling' },
  GEL: { symbol: '₾', code: 'GEL', locale: 'ka-GE', name: 'Georgian Lari' },
  GGP: { symbol: '£', code: 'GGP', locale: 'en-GG', name: 'Guernsey Pound' },
  GHS: { symbol: '¢', code: 'GHS', locale: 'en-GH', name: 'Ghanaian Cedi' },
  GIP: { symbol: '£', code: 'GIP', locale: 'en-GI', name: 'Gibraltar Pound' },
  GMD: { symbol: 'D', code: 'GMD', locale: 'en-GM', name: 'Gambian Dalasi' },
  GNF: { symbol: 'FG', code: 'GNF', locale: 'fr-GN', name: 'Guinean Franc' },
  GTQ: { symbol: 'Q', code: 'GTQ', locale: 'es-GT', name: 'Guatemalan Quetzal' },
  GYD: { symbol: '$', code: 'GYD', locale: 'en-GY', name: 'Guyanaese Dollar' },
  HKD: { symbol: 'HK$', code: 'HKD', locale: 'en-HK', name: 'Hong Kong Dollar' },
  HNL: { symbol: 'L', code: 'HNL', locale: 'es-HN', name: 'Honduran Lempira' },
  HRK: { symbol: 'kn', code: 'HRK', locale: 'hr-HR', name: 'Croatian Kuna' },
  HTG: { symbol: 'G', code: 'HTG', locale: 'fr-HT', name: 'Haitian Gourde' },
  HUF: { symbol: 'Ft', code: 'HUF', locale: 'hu-HU', name: 'Hungarian Forint' },
  IDR: { symbol: 'Rp', code: 'IDR', locale: 'id-ID', name: 'Indonesian Rupiah' },
  ILS: { symbol: '₪', code: 'ILS', locale: 'he-IL', name: 'Israeli New Sheqel' },
  IMP: { symbol: '£', code: 'IMP', locale: 'en-IM', name: 'Manx Pound' },
  INR: { symbol: '₹', code: 'INR', locale: 'en-IN', name: 'Indian Rupee' },
  IQD: { symbol: 'ع.د', code: 'IQD', locale: 'ar-IQ', name: 'Iraqi Dinar' },
  IRR: { symbol: '﷼', code: 'IRR', locale: 'fa-IR', name: 'Iranian Rial' },
  ISK: { symbol: 'kr', code: 'ISK', locale: 'is-IS', name: 'Icelandic Króna' },
  JEP: { symbol: '£', code: 'JEP', locale: 'en-JE', name: 'Jersey Pound' },
  JMD: { symbol: 'J$', code: 'JMD', locale: 'en-JM', name: 'Jamaican Dollar' },
  JOD: { symbol: 'JD', code: 'JOD', locale: 'ar-JO', name: 'Jordanian Dinar' },
  JPY: { symbol: '¥', code: 'JPY', locale: 'ja-JP', name: 'Japanese Yen' },
  KES: { symbol: 'KSh', code: 'KES', locale: 'en-KE', name: 'Kenyan Shilling' },
  KGS: { symbol: 'лв', code: 'KGS', locale: 'ky-KG', name: 'Kyrgystani Som' },
  KHR: { symbol: '៛', code: 'KHR', locale: 'km-KH', name: 'Cambodian Riel' },
  KMF: { symbol: 'CF', code: 'KMF', locale: 'ar-KM', name: 'Comorian Franc' },
  KPW: { symbol: '₩', code: 'KPW', locale: 'ko-KP', name: 'North Korean Won' },
  KRW: { symbol: '₩', code: 'KRW', locale: 'ko-KR', name: 'South Korean Won' },
  KWD: { symbol: 'KD', code: 'KWD', locale: 'ar-KW', name: 'Kuwaiti Dinar' },
  KYD: { symbol: '$', code: 'KYD', locale: 'en-KY', name: 'Cayman Islands Dollar' },
  KZT: { symbol: '₸', code: 'KZT', locale: 'kk-KZ', name: 'Kazakhstani Tenge' },
  LAK: { symbol: '₭', code: 'LAK', locale: 'lo-LA', name: 'Laotian Kip' },
  LBP: { symbol: '£', code: 'LBP', locale: 'ar-LB', name: 'Lebanese Pound' },
  LKR: { symbol: '₨', code: 'LKR', locale: 'si-LK', name: 'Sri Lankan Rupee' },
  LRD: { symbol: '$', code: 'LRD', locale: 'en-LR', name: 'Liberian Dollar' },
  LSL: { symbol: 'M', code: 'LSL', locale: 'en-LS', name: 'Lesotho Loti' },
  LYD: { symbol: 'LD', code: 'LYD', locale: 'ar-LY', name: 'Libyan Dinar' },
  MAD: { symbol: 'MAD', code: 'MAD', locale: 'ar-MA', name: 'Moroccan Dirham' },
  MDL: { symbol: 'lei', code: 'MDL', locale: 'ro-MD', name: 'Moldovan Leu' },
  MGA: { symbol: 'Ar', code: 'MGA', locale: 'mg-MG', name: 'Malagasy Ariary' },
  MKD: { symbol: 'ден', code: 'MKD', locale: 'mk-MK', name: 'Macedonian Denar' },
  MMK: { symbol: 'K', code: 'MMK', locale: 'my-MM', name: 'Myanma Kyat' },
  MNT: { symbol: '₮', code: 'MNT', locale: 'mn-MN', name: 'Mongolian Tugrik' },
  MOP: { symbol: 'MOP$', code: 'MOP', locale: 'zh-MO', name: 'Macanese Pataca' },
  MRU: { symbol: 'UM', code: 'MRU', locale: 'ar-MR', name: 'Mauritanian Ouguiya' },
  MUR: { symbol: '₨', code: 'MUR', locale: 'en-MU', name: 'Mauritian Rupee' },
  MVR: { symbol: 'Rf', code: 'MVR', locale: 'dv-MV', name: 'Maldivian Rufiyaa' },
  MWK: { symbol: 'MK', code: 'MWK', locale: 'en-MW', name: 'Malawian Kwacha' },
  MXN: { symbol: '$', code: 'MXN', locale: 'es-MX', name: 'Mexican Peso' },
  MYR: { symbol: 'RM', code: 'MYR', locale: 'ms-MY', name: 'Malaysian Ringgit' },
  MZN: { symbol: 'MT', code: 'MZN', locale: 'pt-MZ', name: 'Mozambican Metical' },
  NAD: { symbol: '$', code: 'NAD', locale: 'en-NA', name: 'Namibian Dollar' },
  NGN: { symbol: '₦', code: 'NGN', locale: 'en-NG', name: 'Nigerian Naira' },
  NIO: { symbol: 'C$', code: 'NIO', locale: 'es-NI', name: 'Nicaraguan Córdoba' },
  NOK: { symbol: 'kr', code: 'NOK', locale: 'no-NO', name: 'Norwegian Krone' },
  NPR: { symbol: '₨', code: 'NPR', locale: 'ne-NP', name: 'Nepalese Rupee' },
  NZD: { symbol: 'NZ$', code: 'NZD', locale: 'en-NZ', name: 'New Zealand Dollar' },
  OMR: { symbol: '﷼', code: 'OMR', locale: 'ar-OM', name: 'Omani Rial' },
  PAB: { symbol: 'B/.', code: 'PAB', locale: 'es-PA', name: 'Panamanian Balboa' },
  PEN: { symbol: 'S/.', code: 'PEN', locale: 'es-PE', name: 'Peruvian Nuevo Sol' },
  PGK: { symbol: 'K', code: 'PGK', locale: 'en-PG', name: 'Papua New Guinean Kina' },
  PHP: { symbol: '₱', code: 'PHP', locale: 'en-PH', name: 'Philippine Peso' },
  PKR: { symbol: '₨', code: 'PKR', locale: 'ur-PK', name: 'Pakistani Rupee' },
  PLN: { symbol: 'zł', code: 'PLN', locale: 'pl-PL', name: 'Polish Zloty' },
  PYG: { symbol: 'Gs', code: 'PYG', locale: 'es-PY', name: 'Paraguayan Guarani' },
  QAR: { symbol: '﷼', code: 'QAR', locale: 'ar-QA', name: 'Qatari Rial' },
  RON: { symbol: 'lei', code: 'RON', locale: 'ro-RO', name: 'Romanian Leu' },
  RSD: { symbol: 'Дин.', code: 'RSD', locale: 'sr-RS', name: 'Serbian Dinar' },
  RUB: { symbol: '₽', code: 'RUB', locale: 'ru-RU', name: 'Russian Ruble' },
  RWF: { symbol: 'R₣', code: 'RWF', locale: 'rw-RW', name: 'Rwandan Franc' },
  SAR: { symbol: '﷼', code: 'SAR', locale: 'ar-SA', name: 'Saudi Riyal' },
  SBD: { symbol: '$', code: 'SBD', locale: 'en-SB', name: 'Solomon Islands Dollar' },
  SCR: { symbol: '₨', code: 'SCR', locale: 'en-SC', name: 'Seychellois Rupee' },
  SDG: { symbol: 'ج.س.', code: 'SDG', locale: 'ar-SD', name: 'Sudanese Pound' },
  SEK: { symbol: 'kr', code: 'SEK', locale: 'sv-SE', name: 'Swedish Krona' },
  SGD: { symbol: 'S$', code: 'SGD', locale: 'en-SG', name: 'Singapore Dollar' },
  SHP: { symbol: '£', code: 'SHP', locale: 'en-SH', name: 'Saint Helena Pound' },
  SLE: { symbol: 'Le', code: 'SLE', locale: 'en-SL', name: 'Sierra Leonean Leone' },
  SLL: { symbol: 'Le', code: 'SLL', locale: 'en-SL', name: 'Sierra Leonean Leone' },
  SOS: { symbol: 'S', code: 'SOS', locale: 'so-SO', name: 'Somali Shilling' },
  SRD: { symbol: '$', code: 'SRD', locale: 'nl-SR', name: 'Surinamese Dollar' },
  STN: { symbol: 'Db', code: 'STN', locale: 'pt-ST', name: 'São Tomé and Príncipe Dobra' },
  SVC: { symbol: '$', code: 'SVC', locale: 'es-SV', name: 'Salvadoran Colón' },
  SYP: { symbol: '£', code: 'SYP', locale: 'ar-SY', name: 'Syrian Pound' },
  SZL: { symbol: 'E', code: 'SZL', locale: 'en-SZ', name: 'Swazi Lilangeni' },
  THB: { symbol: '฿', code: 'THB', locale: 'th-TH', name: 'Thai Baht' },
  TJS: { symbol: 'SM', code: 'TJS', locale: 'tg-TJ', name: 'Tajikistani Somoni' },
  TMT: { symbol: 'T', code: 'TMT', locale: 'tk-TM', name: 'Turkmenistani Manat' },
  TND: { symbol: 'د.ت', code: 'TND', locale: 'ar-TN', name: 'Tunisian Dinar' },
  TOP: { symbol: 'T$', code: 'TOP', locale: 'to-TO', name: 'Tongan Pa\'anga' },
  TRY: { symbol: '₺', code: 'TRY', locale: 'tr-TR', name: 'Turkish Lira' },
  TTD: { symbol: 'TT$', code: 'TTD', locale: 'en-TT', name: 'Trinidad and Tobago Dollar' },
  TVD: { symbol: '$', code: 'TVD', locale: 'en-TV', name: 'Tuvaluan Dollar' },
  TWD: { symbol: 'NT$', code: 'TWD', locale: 'zh-TW', name: 'New Taiwan Dollar' },
  TZS: { symbol: 'TSh', code: 'TZS', locale: 'sw-TZ', name: 'Tanzanian Shilling' },
  UAH: { symbol: '₴', code: 'UAH', locale: 'uk-UA', name: 'Ukrainian Hryvnia' },
  UGX: { symbol: 'USh', code: 'UGX', locale: 'en-UG', name: 'Ugandan Shilling' },
  USD: { symbol: '$', code: 'USD', locale: 'en-US', name: 'US Dollar' },
  UYU: { symbol: '$U', code: 'UYU', locale: 'es-UY', name: 'Uruguayan Peso' },
  UZS: { symbol: 'лв', code: 'UZS', locale: 'uz-UZ', name: 'Uzbekistan Som' },
  VED: { symbol: 'Bs.', code: 'VED', locale: 'es-VE', name: 'Venezuelan Bolívar' },
  VES: { symbol: 'Bs.S', code: 'VES', locale: 'es-VE', name: 'Venezuelan Bolívar Soberano' },
  VND: { symbol: '₫', code: 'VND', locale: 'vi-VN', name: 'Vietnamese Dong' },
  VUV: { symbol: 'VT', code: 'VUV', locale: 'bi-VU', name: 'Vanuatu Vatu' },
  WST: { symbol: 'WS$', code: 'WST', locale: 'sm-WS', name: 'Samoan Tala' },
  XAF: { symbol: 'FCFA', code: 'XAF', locale: 'fr-CM', name: 'CFA Franc BEAC' },
  XCD: { symbol: '$', code: 'XCD', locale: 'en-AG', name: 'East Caribbean Dollar' },
  XDR: { symbol: 'SDR', code: 'XDR', locale: 'en-US', name: 'Special Drawing Rights' },
  XOF: { symbol: 'CFA', code: 'XOF', locale: 'fr-SN', name: 'CFA Franc BCEAO' },
  XPF: { symbol: '₣', code: 'XPF', locale: 'fr-PF', name: 'CFP Franc' },
  YER: { symbol: '﷼', code: 'YER', locale: 'ar-YE', name: 'Yemeni Rial' },
  ZAR: { symbol: 'R', code: 'ZAR', locale: 'en-ZA', name: 'South African Rand' },
  ZMW: { symbol: 'ZK', code: 'ZMW', locale: 'en-ZM', name: 'Zambian Kwacha' },
  ZWL: { symbol: 'Z$', code: 'ZWL', locale: 'en-ZW', name: 'Zimbabwean Dollar' }
};

export const formatCurrency = (amount: string, currencyCode: string = 'INR'): string => {
  const config = currencyConfig[currencyCode] || currencyConfig.INR;
  const numericAmount = parseFloat(amount.replace(/,/g, ''));
  
  if (isNaN(numericAmount)) {
    return `${config.symbol}${amount}`;
  }

  // Format with locale-specific number formatting
  try {
    const formatted = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericAmount);
    
    return formatted;
  } catch (error) {
    // Fallback formatting
    const formattedNumber = numericAmount.toLocaleString();
    return `${config.symbol}${formattedNumber}`;
  }
};

export const getCurrencySymbol = (currencyCode: string = 'INR'): string => {
  return currencyConfig[currencyCode]?.symbol || currencyConfig.INR.symbol;
};

export const getCurrencyOptions = () => {
  return Object.keys(currencyConfig)
    .sort()
    .map(code => {
      const config = currencyConfig[code];
      return {
        value: code,
        label: `${code} - ${config.name} (${config.symbol})`
      };
    });
};