export enum TransactionState {
  PAYEDOUT = 'PayedOut',
  SETTLED = 'Settled',
  INPROGRESS = 'InProgress',
  AUTHORIZED = 'Authorized',
  CLEARED = 'Cleared'
}

export enum PaymentMethodChannel {
  CNP = 'CNP', // Card Not Present
  CP = 'CP' // Card Present (add if relevant)
}

export enum CardScheme {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX' // Add if relevant
}

export enum TransactionType {
  INCREMENTAL = 'Incremental',
  REFUND = 'Refund',
  REVERSAL = 'Reversal',
  SALE = 'Sale',
  DISPUTE = 'Dispute',
  PARTIALREVERSAL = 'PartialReversal'
}

export interface Address {
  country: string;
  postcode: string;
  line1: string;
  line2?: string; // Optional field if not always required
  verification: boolean;
}

export interface Card {
  cvc: boolean;
  address: Address;
  scheme: CardScheme;
  method: string;
  channel: PaymentMethodChannel;
  expiry: number;
  pan: string;
  issuer: string;
  token: string;
}

export interface PaymentMethod {
  card: Card;
}

export interface Amounts {
  amount: number;
  original: number;
  settled: number;
  cleared: number;
}

export interface Fees {
  fx: number;
  scheme: number;
}

export interface Timestamps {
  initiated: number;
  authorized: number;
  cleared: number;
}

export interface Customer {
  name: string;
  id: string;
  email: string;
}

export interface Event {
  type: string;
  message: string;
  timestamp: number;
}

export interface Transaction {
  linkedTransactions: unknown[]; // Define the specific type if available
  fees: Fees;
  timestamps: Timestamps;
  description: string;
  type: TransactionType;
  decimalPrecision: string;
  rrn: string; // Retrieval Reference Number
  amounts: Amounts;
  paymentMethod: PaymentMethod;
  currency: string;
  id: string;
  state: TransactionState;
  arn: string; // Acquirer Reference Number
  events: Event[];
  customer: Customer;
}

export interface ResponseWrapper<T> {
  size: number;
  results: T;
  facets: { [key: string]: { count: number; id: string }[] };
}

export const TransactionData: ResponseWrapper<Transaction[]> = {
  size: 20,
  results: [
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 795
      },
      timestamps: {
        initiated: 1689910574875,
        authorized: 1689910874875,
        cleared: 1689911174875
      },
      description: 'Order number 1708779382',
      type: TransactionType.INCREMENTAL,
      decimalPrecision: '2',
      rrn: '2ro51SEh',
      amounts: {
        amount: 56303,
        original: 56303,
        settled: 55508,
        cleared: 56303
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 1452,
          pan: '1020987107469377',
          issuer: 'ACME International Bank',
          token: 'FAw8OkA9Ygxq53WDKANVAGUaeFVTltnu'
        }
      },
      currency: 'EUR',
      id: 'A1oHIdJVHDluaEBZ',
      state: TransactionState.CLEARED,
      arn: 'UIxeXqRm',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574876
        }
      ],
      customer: {
        name: 'Irma Richmond',
        id: 'Ul6pXUW1dT7bFQ5z',
        email: 'irma.richmond@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2705
      },
      timestamps: {
        initiated: 1689910574876,
        authorized: 1689910874876,
        cleared: 1689911174876
      },
      description: 'Order number -226907101',
      type: TransactionType.REFUND,
      decimalPrecision: '2',
      rrn: '2oPHk1Nx',
      amounts: {
        amount: 30669,
        original: 30669,
        settled: 27964,
        cleared: 30669
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 2221,
          pan: '4432753783770326',
          issuer: 'ACME International Bank',
          token: 'iLVM8TIISGOn9NaZp9SE99DVHLUTaYzJ'
        }
      },
      currency: 'BGN',
      id: '7eC3mk5uLk4s4ORg',
      state: TransactionState.CLEARED,
      arn: 'yCAMWhGc',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574876
        }
      ],
      customer: {
        name: 'Hattie Frye',
        id: 'rLUh8KkdMvM2Q9a4',
        email: 'hattie.frye@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2310
      },
      timestamps: {
        initiated: 1689910574877,
        authorized: 1689910874877,
        cleared: 1689911174877
      },
      description: 'Order number 893373777',
      type: TransactionType.REVERSAL,
      decimalPrecision: '2',
      rrn: '9BsNG53b',
      amounts: {
        amount: 58701,
        original: 66306,
        settled: 56391,
        cleared: 58701
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 1808,
          pan: '3696556018788856',
          issuer: 'ACME International Bank',
          token: 'ziA7QdX3zSEtpNsP5o50tONXi3SEYreQ'
        }
      },
      currency: 'USD',
      id: 'xNsgWfJUlRk30muZ',
      state: TransactionState.PAYEDOUT,
      arn: 'JChauWch',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574877
        }
      ],
      customer: {
        name: 'Yareli Reagan',
        id: 'KPKKdM3ORdXzXCgq',
        email: 'yareli.reagan@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1757
      },
      timestamps: {
        initiated: 1689910574877,
        authorized: 1689910874877,
        cleared: 1689911174877
      },
      description: 'Order number -230684915',
      type: TransactionType.REVERSAL,
      decimalPrecision: '2',
      rrn: 'Ua3SSOl7',
      amounts: {
        amount: 65500,
        original: 66161,
        settled: 63743,
        cleared: 65500
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 2773,
          pan: '8634451677115194',
          issuer: 'ACME International Bank',
          token: 'qjtWOUbNGVJf1ryrkbkaZVeJwhw2oq7M'
        }
      },
      currency: 'USD',
      id: 'HeShDFUC3ZZEhCyK',
      state: TransactionState.PAYEDOUT,
      arn: 'q2jeu5Gw',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574877
        }
      ],
      customer: {
        name: 'Gino North',
        id: 'd7HUZ7W6ZagEDD5m',
        email: 'gino.north@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1629
      },
      timestamps: {
        initiated: 1689910574878,
        authorized: 1689910874878,
        cleared: 1689911174878
      },
      description: 'Order number -193974443',
      type: TransactionType.REFUND,
      decimalPrecision: '2',
      rrn: 'H4Q3UPdr',
      amounts: {
        amount: 14902,
        original: 14902,
        settled: 13273,
        cleared: 14902
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 260,
          pan: '5864187663114934',
          issuer: 'ACME International Bank',
          token: 'x4meifovPrTBpbo0nPWj0DwLGK3SQTRT'
        }
      },
      currency: 'USD',
      id: '2f62KeqKc5jWXAbc',
      state: TransactionState.CLEARED,
      arn: 'QXMSDHwO',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574878
        }
      ],
      customer: {
        name: 'Devan Hays',
        id: 'ajVJCmNTG7KgL5vg',
        email: 'devan.hays@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1057
      },
      timestamps: {
        initiated: 1689910574878,
        authorized: 1689910874878,
        cleared: 1689911174878
      },
      description: 'Order number -597114315',
      type: TransactionType.SALE,
      decimalPrecision: '2',
      rrn: 'e5USgl5x',
      amounts: {
        amount: 56782,
        original: 56782,
        settled: 55725,
        cleared: 56782
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 1101,
          pan: '0435573845745567',
          issuer: 'ACME International Bank',
          token: 'XDm2CracEDdD9Wvoc2Lzg65FwgQymfhO'
        }
      },
      currency: 'USD',
      id: 'kHJfwo9GEnVwUz7r',
      state: TransactionState.SETTLED,
      arn: 'owdPDKTv',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574878
        }
      ],
      customer: {
        name: 'Jayson Casper',
        id: '0jkDyjH8dUXiv814',
        email: 'jayson.casper@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1294
      },
      timestamps: {
        initiated: 1689910574878,
        authorized: 1689910874878,
        cleared: 1689911174878
      },
      description: 'Order number -747480126',
      type: TransactionType.REFUND,
      decimalPrecision: '2',
      rrn: 'cPVOA26r',
      amounts: {
        amount: 39877,
        original: 39877,
        settled: 38583,
        cleared: 39877
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 2142,
          pan: '9484133658040686',
          issuer: 'ACME International Bank',
          token: 'bCw3wvEYmZLLKueDRROQy3nOOk0X8kDy'
        }
      },
      currency: 'USD',
      id: 'otThzG8feKwKlXev',
      state: TransactionState.PAYEDOUT,
      arn: 'GtfX0BV8',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574878
        }
      ],
      customer: {
        name: 'Jayson Casper',
        id: 'zOUqHq2EC3N0Q1SS',
        email: 'jayson.casper@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2462
      },
      timestamps: {
        initiated: 1689910574879,
        authorized: 1689910874879,
        cleared: 1689911174879
      },
      description: 'Order number 148231896',
      type: TransactionType.SALE,
      decimalPrecision: '2',
      rrn: 'pkFidii1',
      amounts: {
        amount: 34387,
        original: 34387,
        settled: 31925,
        cleared: 34387
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 330,
          pan: '9357283212849592',
          issuer: 'ACME International Bank',
          token: '059GGmk9r1XyjvmH56ZGDlm2EjKhxSnf'
        }
      },
      currency: 'USD',
      id: '0EmjLFSG2xUEBxov',
      state: TransactionState.CLEARED,
      arn: 'KUFraUXz',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574879
        }
      ],
      customer: {
        name: 'Gladys Monroy',
        id: 'q6D3NKPyVHHhZBjp',
        email: 'gladys.monroy@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1011
      },
      timestamps: {
        initiated: 1689910574879,
        authorized: 1689910874879,
        cleared: 1689911174879
      },
      description: 'Order number -1530188627',
      type: TransactionType.SALE,
      decimalPrecision: '2',
      rrn: '6eOlCWq5',
      amounts: {
        amount: 73560,
        original: 73560,
        settled: 72549,
        cleared: 73560
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 204,
          pan: '9674147902280505',
          issuer: 'ACME International Bank',
          token: 's1acoDCKrUSz3Em9yxiuF86cRuY1euVR'
        }
      },
      currency: 'USD',
      id: 'NgM6snEAevTGiOuF',
      state: TransactionState.CLEARED,
      arn: 'QIDmje3A',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574879
        }
      ],
      customer: {
        name: 'Cecelia Garland',
        id: '0X1YyTLvwAeNKyzm',
        email: 'cecelia.garland@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2985
      },
      timestamps: {
        initiated: 1689910574879,
        authorized: 1689910874879,
        cleared: 1689911174879
      },
      description: 'Order number -1772696690',
      type: TransactionType.DISPUTE,
      decimalPrecision: '2',
      rrn: 'MMkxSSyc',
      amounts: {
        amount: 14659,
        original: 14659,
        settled: 11674,
        cleared: 14659
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 1694,
          pan: '7730774250096696',
          issuer: 'ACME International Bank',
          token: 'ym8XvWCrGpRvSVmTQwxRT9sw7YkdknCX'
        }
      },
      currency: 'USD',
      id: 'imUWxEh5um1i6MCc',
      state: TransactionState.INPROGRESS,
      arn: 'A9Ldjk4c',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574879
        }
      ],
      customer: {
        name: 'Jayson Casper',
        id: 'X3j0hja8nN09IWgp',
        email: 'jayson.casper@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2307
      },
      timestamps: {
        initiated: 1689910574879,
        authorized: 1689910874879,
        cleared: 1689911174879
      },
      description: 'Order number 1919136595',
      type: TransactionType.REFUND,
      decimalPrecision: '2',
      rrn: 'z0PbHp5q',
      amounts: {
        amount: 7398,
        original: 7398,
        settled: 5091,
        cleared: 7398
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 2905,
          pan: '5119184155181660',
          issuer: 'ACME International Bank',
          token: 'UQJumfchsnCjlA8vziBudqfUYYeRPoqV'
        }
      },
      currency: 'USD',
      id: 'CAoIb8lB9yRs0NCB',
      state: TransactionState.INPROGRESS,
      arn: 'TV3X5Nuc',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574879
        }
      ],
      customer: {
        name: 'Zaria Finney',
        id: 'QmKMPrRiJD5j3AmK',
        email: 'zaria.finney@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1756
      },
      timestamps: {
        initiated: 1689910574880,
        authorized: 1689910874880,
        cleared: 1689911174880
      },
      description: 'Order number 1708686503',
      type: TransactionType.REFUND,
      decimalPrecision: '2',
      rrn: 'sXjyTSR8',
      amounts: {
        amount: 8509,
        original: 8509,
        settled: 6753,
        cleared: 8509
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 800,
          pan: '8828169588858048',
          issuer: 'ACME International Bank',
          token: '95WBnH6SyMJlrjuyUJ89v2PP1BM9a6o4'
        }
      },
      currency: 'USD',
      id: 'Hfr63Xtkrdbjk7cS',
      state: TransactionState.INPROGRESS,
      arn: 'eeN0Visj',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574880
        }
      ],
      customer: {
        name: 'Yamile Dennis',
        id: 'CiVrAE1I3iBNoirW',
        email: 'yamile.dennis@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2963
      },
      timestamps: {
        initiated: 1689910574880,
        authorized: 1689910874880,
        cleared: 1689911174880
      },
      description: 'Order number 1939045074',
      type: TransactionType.INCREMENTAL,
      decimalPrecision: '2',
      rrn: 'WWeReT83',
      amounts: {
        amount: 15532,
        original: 15532,
        settled: 12569,
        cleared: 15532
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 221,
          pan: '2910887555892805',
          issuer: 'ACME International Bank',
          token: 'cusdi9wR2iM4RfClUE1RXwYPBfRobF4o'
        }
      },
      currency: 'USD',
      id: 'kBAsAJDQ7uEkzBZd',
      state: TransactionState.PAYEDOUT,
      arn: 'sFde2UCe',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574880
        }
      ],
      customer: {
        name: 'Dale Benoit',
        id: 'jDD5yAtdw4zuPAwQ',
        email: 'dale.benoit@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 617
      },
      timestamps: {
        initiated: 1689910574880,
        authorized: 1689910874880,
        cleared: 1689911174880
      },
      description: 'Order number 1868503300',
      type: TransactionType.REFUND,
      decimalPrecision: '2',
      rrn: 'Wk3TGLun',
      amounts: {
        amount: 59553,
        original: 59553,
        settled: 58936,
        cleared: 59553
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 631,
          pan: '3056324500119017',
          issuer: 'ACME International Bank',
          token: '5Px09qi4sPhC3Nbd4cpjd1WaZUDRw4DT'
        }
      },
      currency: 'USD',
      id: 'Q3BzRsvXfI4qzMHu',
      state: TransactionState.AUTHORIZED,
      arn: 'Md9r1LQf',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574880
        }
      ],
      customer: {
        name: 'Pablo Stone',
        id: 'smzUlQUqaHWmbuy1',
        email: 'pablo.stone@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1670
      },
      timestamps: {
        initiated: 1689910574880,
        authorized: 1689910874880,
        cleared: 1689911174880
      },
      description: 'Order number -73514056',
      type: TransactionType.PARTIALREVERSAL,
      decimalPrecision: '2',
      rrn: 'ekj4f7wf',
      amounts: {
        amount: 92985,
        original: 95138,
        settled: 91315,
        cleared: 92985
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 2448,
          pan: '2453935579010262',
          issuer: 'ACME International Bank',
          token: 'UTpP00Vdd1G7eiwKZEKo3QR2yCAnOFod'
        }
      },
      currency: 'USD',
      id: 'OOuF1BjyLOknNtkg',
      state: TransactionState.AUTHORIZED,
      arn: 'rBlSRHGe',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574880
        }
      ],
      customer: {
        name: 'Emma Clay',
        id: 'EoPIYA1L0JlFxTEt',
        email: 'emma.clay@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 1479
      },
      timestamps: {
        initiated: 1689910574970,
        authorized: 1689910874970,
        cleared: 1689911174970
      },
      description: 'Order number -1855949187',
      type: TransactionType.REVERSAL,
      decimalPrecision: '2',
      rrn: 'nqo3zosT',
      amounts: {
        amount: 67005,
        original: 71357,
        settled: 65526,
        cleared: 67005
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 1057,
          pan: '0282107037109185',
          issuer: 'ACME International Bank',
          token: 'WDUokfSXOsCOYQG1GrS9BMWrHmYMB3SF'
        }
      },
      currency: 'USD',
      id: 'efv1ghDDScl4a3vH',
      state: TransactionState.INPROGRESS,
      arn: 'F9FlHOqO',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574970
        }
      ],
      customer: {
        name: 'Pablo Stone',
        id: 'MqPXcd3TxR5nPxU1',
        email: 'pablo.stone@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 518
      },
      timestamps: {
        initiated: 1689910574971,
        authorized: 1689910874971,
        cleared: 1689911174971
      },
      description: 'Order number -1182722017',
      type: TransactionType.DISPUTE,
      decimalPrecision: '2',
      rrn: 'hLzgnHcW',
      amounts: {
        amount: 40755,
        original: 40755,
        settled: 40237,
        cleared: 40755
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 1495,
          pan: '0357784986037064',
          issuer: 'ACME International Bank',
          token: 'AVPudHkEoHWujTSOsB3POPvJyaGGMlmL'
        }
      },
      currency: 'USD',
      id: 'lDnO1zz84veB3cOP',
      state: TransactionState.SETTLED,
      arn: 'md2QqTpL',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574971
        }
      ],
      customer: {
        name: 'Noel Horan',
        id: '5aDk9vtIKn9cymho',
        email: 'noel.horan@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2550
      },
      timestamps: {
        initiated: 1689910574971,
        authorized: 1689910874971,
        cleared: 1689911174971
      },
      description: 'Order number -180118940',
      type: TransactionType.PARTIALREVERSAL,
      decimalPrecision: '2',
      rrn: 'n8UDvwld',
      amounts: {
        amount: 7333,
        original: 11820,
        settled: 4783,
        cleared: 7333
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.VISA,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 1473,
          pan: '4994525186093301',
          issuer: 'ACME International Bank',
          token: 'T1mpCTq8rDJRQgDFNKTsg4oNvpN2qerc'
        }
      },
      currency: 'USD',
      id: 'WwncjWvYK1DvIFhP',
      state: TransactionState.SETTLED,
      arn: 'Z4DyGHyv',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574971
        }
      ],
      customer: {
        name: 'Rolando Wisniewski',
        id: 'HelNE6dWFh2wYZkC',
        email: 'rolando.wisniewski@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2125
      },
      timestamps: {
        initiated: 1689910574971,
        authorized: 1689910874971,
        cleared: 1689911174971
      },
      description: 'Order number -72942748',
      type: TransactionType.REVERSAL,
      decimalPrecision: '2',
      rrn: 'JutITBLT',
      amounts: {
        amount: 27112,
        original: 34234,
        settled: 24987,
        cleared: 27112
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 131,
          pan: '2340272207600302',
          issuer: 'ACME International Bank',
          token: 'oNCIGrptqeyltG8fTUNvzg07q2NmrBQz'
        }
      },
      currency: 'USD',
      id: 'k8A8a1SKuOfy37wR',
      state: TransactionState.AUTHORIZED,
      arn: 'TCAdl2Qp',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574971
        }
      ],
      customer: {
        name: 'Beau Meier',
        id: 'hSDRu1fLUKXZyb3y',
        email: 'beau.meier@gmail.com'
      }
    },
    {
      linkedTransactions: [],
      fees: {
        fx: 0,
        scheme: 2706
      },
      timestamps: {
        initiated: 1689910574971,
        authorized: 1689910874971,
        cleared: 1689911174971
      },
      description: 'Order number -896118170',
      type: TransactionType.REFUND,
      decimalPrecision: '2',
      rrn: 'NQmuPqCY',
      amounts: {
        amount: 32591,
        original: 32591,
        settled: 29885,
        cleared: 32591
      },
      paymentMethod: {
        card: {
          cvc: true,
          address: {
            country: 'United States',
            postcode: '13433',
            line2: 'Wyoming',
            line1: '123 Brik Road',
            verification: true
          },
          scheme: CardScheme.MASTERCARD,
          method: 'EMV',
          channel: PaymentMethodChannel.CNP,
          expiry: 318,
          pan: '2327189364782829',
          issuer: 'ACME International Bank',
          token: 'rSxeuveBZDRKyZxT1k7PI6LWJ8dcN4bK'
        }
      },
      currency: 'USD',
      id: 'H7wDu2xNJh5siHZK',
      state: TransactionState.AUTHORIZED,
      arn: 'dE3ESjsJ',
      events: [
        {
          type: 'network_inbound',
          message: '',
          timestamp: 1689910574971
        }
      ],
      customer: {
        name: 'Rolando Wisniewski',
        id: 'TrnrjjbsiSHi5w8f',
        email: 'rolando.wisniewski@gmail.com'
      }
    }
  ],
  facets: {
    state: [
      {
        count: 4,
        id: 'PayedOut'
      },
      {
        count: 5,
        id: 'Settled'
      },
      {
        count: 3,
        id: 'InProgress'
      },
      {
        count: 4,
        id: 'Authorized'
      },
      {
        count: 4,
        id: 'Cleared'
      }
    ]
  }
};
