/**
 * Private helper method to handle dynamically changing the i18n data
 * when the 'LOCALE_CHANGED' event is fired from storybook
 */

const getLocaleFromUrl = () => {
  const localeString = new URLSearchParams(window.location.search).get(
    'globals'
  )
  if (localeString) {
    return localeString.replace('locale:', '')
  }
  return null
}

/**
 * Given an i18n key, return the matching value based on the currently
 * selected i18n config.
 * @returns {string}
 */
export const getByKey = (key) => {
  console.log(`getByKey ${key} `, ALL_PROPS)
  console.log(`getByKey getLocaleFromUrl `, getLocaleFromUrl())
  return ALL_PROPS[key]
}

const ALL_PROPS = {
  lang: 'en-US',
  dir: 'ltr',
  locale: 'en-AU',
  defaultCalendar: 'gregorian',
  defaultNumberingSystem: 'latn',
  calendarData: {
    gregorian: {
      dayPeriods: {
        format: {
          abbreviated: {
            midnight: 'midnight',
            am: 'am',
            'am-alt-variant': 'am',
            noon: 'midday',
            pm: 'pm',
            'pm-alt-variant': 'pm',
            morning1: 'morning',
            afternoon1: 'afternoon',
            evening1: 'evening',
            night1: 'night',
          },
          narrow: {
            midnight: 'midnight',
            am: 'am',
            'am-alt-variant': 'am',
            noon: 'midday',
            pm: 'pm',
            'pm-alt-variant': 'pm',
            morning1: 'morning',
            afternoon1: 'afternoon',
            evening1: 'evening',
            night1: 'night',
          },
          wide: {
            midnight: 'midnight',
            am: 'am',
            'am-alt-variant': 'am',
            noon: 'midday',
            pm: 'pm',
            'pm-alt-variant': 'pm',
            morning1: 'in the morning',
            afternoon1: 'in the afternoon',
            evening1: 'in the evening',
            night1: 'at night',
          },
        },
        'stand-alone': {
          abbreviated: {
            midnight: 'midnight',
            am: 'am',
            'am-alt-variant': 'am',
            noon: 'midday',
            pm: 'pm',
            'pm-alt-variant': 'pm',
            morning1: 'morning',
            afternoon1: 'afternoon',
            evening1: 'evening',
            night1: 'night',
          },
          narrow: {
            midnight: 'midnight',
            am: 'am',
            'am-alt-variant': 'am',
            noon: 'midday',
            pm: 'pm',
            'pm-alt-variant': 'pm',
            morning1: 'morning',
            afternoon1: 'afternoon',
            evening1: 'evening',
            night1: 'night',
          },
          wide: {
            midnight: 'midnight',
            am: 'am',
            'am-alt-variant': 'am',
            noon: 'midday',
            pm: 'pm',
            'pm-alt-variant': 'pm',
            morning1: 'morning',
            afternoon1: 'afternoon',
            evening1: 'evening',
            night1: 'night',
          },
        },
      },
      days: {
        format: {
          abbreviated: {
            sun: 'Sun',
            mon: 'Mon',
            tue: 'Tue',
            wed: 'Wed',
            thu: 'Thu',
            fri: 'Fri',
            sat: 'Sat',
          },
          narrow: {
            sun: 'Su.',
            mon: 'M.',
            tue: 'Tu.',
            wed: 'W.',
            thu: 'Th.',
            fri: 'F.',
            sat: 'Sa.',
          },
          short: {
            sun: 'Su',
            mon: 'Mon',
            tue: 'Tu',
            wed: 'Wed',
            thu: 'Th',
            fri: 'Fri',
            sat: 'Sat',
          },
          wide: {
            sun: 'Sunday',
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
          },
        },
        'stand-alone': {
          abbreviated: {
            sun: 'Sun',
            mon: 'Mon',
            tue: 'Tue',
            wed: 'Wed',
            thu: 'Thu',
            fri: 'Fri',
            sat: 'Sat',
          },
          narrow: {
            sun: 'Su.',
            mon: 'M.',
            tue: 'Tu.',
            wed: 'W.',
            thu: 'Th.',
            fri: 'F.',
            sat: 'Sa.',
          },
          short: {
            sun: 'Su',
            mon: 'Mon',
            tue: 'Tu',
            wed: 'Wed',
            thu: 'Th',
            fri: 'Fri',
            sat: 'Sat',
          },
          wide: {
            sun: 'Sunday',
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
          },
        },
      },
      eras: {
        eraNames: {
          0: 'Before Christ',
          1: 'Anno Domini',
          '0-alt-variant': 'Before Common Era',
          '1-alt-variant': 'Common Era',
        },
        eraAbbr: {
          0: 'BC',
          1: 'AD',
          '0-alt-variant': 'BCE',
          '1-alt-variant': 'CE',
        },
        eraNarrow: {
          0: 'B',
          1: 'A',
          '0-alt-variant': 'BCE',
          '1-alt-variant': 'CE',
        },
      },
      months: {
        format: {
          abbreviated: {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'Aug',
            9: 'Sept',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec',
          },
          narrow: {
            1: 'J',
            2: 'F',
            3: 'M',
            4: 'A',
            5: 'M',
            6: 'J',
            7: 'J',
            8: 'A',
            9: 'S',
            10: 'O',
            11: 'N',
            12: 'D',
          },
          wide: {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
          },
        },
        'stand-alone': {
          abbreviated: {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Aug',
            9: 'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec',
          },
          narrow: {
            1: 'J',
            2: 'F',
            3: 'M',
            4: 'A',
            5: 'M',
            6: 'J',
            7: 'J',
            8: 'A',
            9: 'S',
            10: 'O',
            11: 'N',
            12: 'D',
          },
          wide: {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
          },
        },
      },
      quarters: {
        format: {
          abbreviated: {
            1: 'Q1',
            2: 'Q2',
            3: 'Q3',
            4: 'Q4',
          },
          narrow: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
          },
          wide: {
            1: '1st quarter',
            2: '2nd quarter',
            3: '3rd quarter',
            4: '4th quarter',
          },
        },
        'stand-alone': {
          abbreviated: {
            1: 'Q1',
            2: 'Q2',
            3: 'Q3',
            4: 'Q4',
          },
          narrow: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
          },
          wide: {
            1: '1st quarter',
            2: '2nd quarter',
            3: '3rd quarter',
            4: '4th quarter',
          },
        },
      },
    },
  },
  currency: 'AUD',
  firstDayOfWeek: 1,
  isEasternNameStyle: true,
  'common.calendarData': {
    'ethiopic-amete-alem': {
      eras: {
        0: {
          _end: '-5492-08-29',
        },
      },
    },
    japanese: {
      calendarSystem: 'solar',
      eras: {
        0: {
          _start: '645-6-19',
        },
        1: {
          _start: '650-2-15',
        },
        2: {
          _start: '672-1-1',
        },
        3: {
          _start: '686-7-20',
        },
        4: {
          _start: '701-3-21',
        },
        5: {
          _start: '704-5-10',
        },
        6: {
          _start: '708-1-11',
        },
        7: {
          _start: '715-9-2',
        },
        8: {
          _start: '717-11-17',
        },
        9: {
          _start: '724-2-4',
        },
        10: {
          _start: '729-8-5',
        },
        11: {
          _start: '749-4-14',
        },
        12: {
          _start: '749-7-2',
        },
        13: {
          _start: '757-8-18',
        },
        14: {
          _start: '765-1-7',
        },
        15: {
          _start: '767-8-16',
        },
        16: {
          _start: '770-10-1',
        },
        17: {
          _start: '781-1-1',
        },
        18: {
          _start: '782-8-19',
        },
        19: {
          _start: '806-5-18',
        },
        20: {
          _start: '810-9-19',
        },
        21: {
          _start: '824-1-5',
        },
        22: {
          _start: '834-1-3',
        },
        23: {
          _start: '848-6-13',
        },
        24: {
          _start: '851-4-28',
        },
        25: {
          _start: '854-11-30',
        },
        26: {
          _start: '857-2-21',
        },
        27: {
          _start: '859-4-15',
        },
        28: {
          _start: '877-4-16',
        },
        29: {
          _start: '885-2-21',
        },
        30: {
          _start: '889-4-27',
        },
        31: {
          _start: '898-4-26',
        },
        32: {
          _start: '901-7-15',
        },
        33: {
          _start: '923-4-11',
        },
        34: {
          _start: '931-4-26',
        },
        35: {
          _start: '938-5-22',
        },
        36: {
          _start: '947-4-22',
        },
        37: {
          _start: '957-10-27',
        },
        38: {
          _start: '961-2-16',
        },
        39: {
          _start: '964-7-10',
        },
        40: {
          _start: '968-8-13',
        },
        41: {
          _start: '970-3-25',
        },
        42: {
          _start: '973-12-20',
        },
        43: {
          _start: '976-7-13',
        },
        44: {
          _start: '978-11-29',
        },
        45: {
          _start: '983-4-15',
        },
        46: {
          _start: '985-4-27',
        },
        47: {
          _start: '987-4-5',
        },
        48: {
          _start: '989-8-8',
        },
        49: {
          _start: '990-11-7',
        },
        50: {
          _start: '995-2-22',
        },
        51: {
          _start: '999-1-13',
        },
        52: {
          _start: '1004-7-20',
        },
        53: {
          _start: '1012-12-25',
        },
        54: {
          _start: '1017-4-23',
        },
        55: {
          _start: '1021-2-2',
        },
        56: {
          _start: '1024-7-13',
        },
        57: {
          _start: '1028-7-25',
        },
        58: {
          _start: '1037-4-21',
        },
        59: {
          _start: '1040-11-10',
        },
        60: {
          _start: '1044-11-24',
        },
        61: {
          _start: '1046-4-14',
        },
        62: {
          _start: '1053-1-11',
        },
        63: {
          _start: '1058-8-29',
        },
        64: {
          _start: '1065-8-2',
        },
        65: {
          _start: '1069-4-13',
        },
        66: {
          _start: '1074-8-23',
        },
        67: {
          _start: '1077-11-17',
        },
        68: {
          _start: '1081-2-10',
        },
        69: {
          _start: '1084-2-7',
        },
        70: {
          _start: '1087-4-7',
        },
        71: {
          _start: '1094-12-15',
        },
        72: {
          _start: '1096-12-17',
        },
        73: {
          _start: '1097-11-21',
        },
        74: {
          _start: '1099-8-28',
        },
        75: {
          _start: '1104-2-10',
        },
        76: {
          _start: '1106-4-9',
        },
        77: {
          _start: '1108-8-3',
        },
        78: {
          _start: '1110-7-13',
        },
        79: {
          _start: '1113-7-13',
        },
        80: {
          _start: '1118-4-3',
        },
        81: {
          _start: '1120-4-10',
        },
        82: {
          _start: '1124-4-3',
        },
        83: {
          _start: '1126-1-22',
        },
        84: {
          _start: '1131-1-29',
        },
        85: {
          _start: '1132-8-11',
        },
        86: {
          _start: '1135-4-27',
        },
        87: {
          _start: '1141-7-10',
        },
        88: {
          _start: '1142-4-28',
        },
        89: {
          _start: '1144-2-23',
        },
        90: {
          _start: '1145-7-22',
        },
        91: {
          _start: '1151-1-26',
        },
        92: {
          _start: '1154-10-28',
        },
        93: {
          _start: '1156-4-27',
        },
        94: {
          _start: '1159-4-20',
        },
        95: {
          _start: '1160-1-10',
        },
        96: {
          _start: '1161-9-4',
        },
        97: {
          _start: '1163-3-29',
        },
        98: {
          _start: '1165-6-5',
        },
        99: {
          _start: '1166-8-27',
        },
        100: {
          _start: '1169-4-8',
        },
        101: {
          _start: '1171-4-21',
        },
        102: {
          _start: '1175-7-28',
        },
        103: {
          _start: '1177-8-4',
        },
        104: {
          _start: '1181-7-14',
        },
        105: {
          _start: '1182-5-27',
        },
        106: {
          _start: '1184-4-16',
        },
        107: {
          _start: '1185-8-14',
        },
        108: {
          _start: '1190-4-11',
        },
        109: {
          _start: '1199-4-27',
        },
        110: {
          _start: '1201-2-13',
        },
        111: {
          _start: '1204-2-20',
        },
        112: {
          _start: '1206-4-27',
        },
        113: {
          _start: '1207-10-25',
        },
        114: {
          _start: '1211-3-9',
        },
        115: {
          _start: '1213-12-6',
        },
        116: {
          _start: '1219-4-12',
        },
        117: {
          _start: '1222-4-13',
        },
        118: {
          _start: '1224-11-20',
        },
        119: {
          _start: '1225-4-20',
        },
        120: {
          _start: '1227-12-10',
        },
        121: {
          _start: '1229-3-5',
        },
        122: {
          _start: '1232-4-2',
        },
        123: {
          _start: '1233-4-15',
        },
        124: {
          _start: '1234-11-5',
        },
        125: {
          _start: '1235-9-19',
        },
        126: {
          _start: '1238-11-23',
        },
        127: {
          _start: '1239-2-7',
        },
        128: {
          _start: '1240-7-16',
        },
        129: {
          _start: '1243-2-26',
        },
        130: {
          _start: '1247-2-28',
        },
        131: {
          _start: '1249-3-18',
        },
        132: {
          _start: '1256-10-5',
        },
        133: {
          _start: '1257-3-14',
        },
        134: {
          _start: '1259-3-26',
        },
        135: {
          _start: '1260-4-13',
        },
        136: {
          _start: '1261-2-20',
        },
        137: {
          _start: '1264-2-28',
        },
        138: {
          _start: '1275-4-25',
        },
        139: {
          _start: '1278-2-29',
        },
        140: {
          _start: '1288-4-28',
        },
        141: {
          _start: '1293-8-5',
        },
        142: {
          _start: '1299-4-25',
        },
        143: {
          _start: '1302-11-21',
        },
        144: {
          _start: '1303-8-5',
        },
        145: {
          _start: '1306-12-14',
        },
        146: {
          _start: '1308-10-9',
        },
        147: {
          _start: '1311-4-28',
        },
        148: {
          _start: '1312-3-20',
        },
        149: {
          _start: '1317-2-3',
        },
        150: {
          _start: '1319-4-28',
        },
        151: {
          _start: '1321-2-23',
        },
        152: {
          _start: '1324-12-9',
        },
        153: {
          _start: '1326-4-26',
        },
        154: {
          _start: '1329-8-29',
        },
        155: {
          _start: '1331-8-9',
        },
        156: {
          _start: '1334-1-29',
        },
        157: {
          _start: '1336-2-29',
        },
        158: {
          _start: '1340-4-28',
        },
        159: {
          _start: '1346-12-8',
        },
        160: {
          _start: '1370-7-24',
        },
        161: {
          _start: '1372-4-1',
        },
        162: {
          _start: '1375-5-27',
        },
        163: {
          _start: '1379-3-22',
        },
        164: {
          _start: '1381-2-10',
        },
        165: {
          _start: '1384-4-28',
        },
        166: {
          _start: '1387-8-22',
        },
        167: {
          _start: '1387-8-23',
        },
        168: {
          _start: '1389-2-9',
        },
        169: {
          _start: '1390-3-26',
        },
        170: {
          _start: '1394-7-5',
        },
        171: {
          _start: '1428-4-27',
        },
        172: {
          _start: '1429-9-5',
        },
        173: {
          _start: '1441-2-17',
        },
        174: {
          _start: '1444-2-5',
        },
        175: {
          _start: '1449-7-28',
        },
        176: {
          _start: '1452-7-25',
        },
        177: {
          _start: '1455-7-25',
        },
        178: {
          _start: '1457-9-28',
        },
        179: {
          _start: '1460-12-21',
        },
        180: {
          _start: '1466-2-28',
        },
        181: {
          _start: '1467-3-3',
        },
        182: {
          _start: '1469-4-28',
        },
        183: {
          _start: '1487-7-29',
        },
        184: {
          _start: '1489-8-21',
        },
        185: {
          _start: '1492-7-19',
        },
        186: {
          _start: '1501-2-29',
        },
        187: {
          _start: '1504-2-30',
        },
        188: {
          _start: '1521-8-23',
        },
        189: {
          _start: '1528-8-20',
        },
        190: {
          _start: '1532-7-29',
        },
        191: {
          _start: '1555-10-23',
        },
        192: {
          _start: '1558-2-28',
        },
        193: {
          _start: '1570-4-23',
        },
        194: {
          _start: '1573-7-28',
        },
        195: {
          _start: '1592-12-8',
        },
        196: {
          _start: '1596-10-27',
        },
        197: {
          _start: '1615-7-13',
        },
        198: {
          _start: '1624-2-30',
        },
        199: {
          _start: '1644-12-16',
        },
        200: {
          _start: '1648-2-15',
        },
        201: {
          _start: '1652-9-18',
        },
        202: {
          _start: '1655-4-13',
        },
        203: {
          _start: '1658-7-23',
        },
        204: {
          _start: '1661-4-25',
        },
        205: {
          _start: '1673-9-21',
        },
        206: {
          _start: '1681-9-29',
        },
        207: {
          _start: '1684-2-21',
        },
        208: {
          _start: '1688-9-30',
        },
        209: {
          _start: '1704-3-13',
        },
        210: {
          _start: '1711-4-25',
        },
        211: {
          _start: '1716-6-22',
        },
        212: {
          _start: '1736-4-28',
        },
        213: {
          _start: '1741-2-27',
        },
        214: {
          _start: '1744-2-21',
        },
        215: {
          _start: '1748-7-12',
        },
        216: {
          _start: '1751-10-27',
        },
        217: {
          _start: '1764-6-2',
        },
        218: {
          _start: '1772-11-16',
        },
        219: {
          _start: '1781-4-2',
        },
        220: {
          _start: '1789-1-25',
        },
        221: {
          _start: '1801-2-5',
        },
        222: {
          _start: '1804-2-11',
        },
        223: {
          _start: '1818-4-22',
        },
        224: {
          _start: '1830-12-10',
        },
        225: {
          _start: '1844-12-2',
        },
        226: {
          _start: '1848-2-28',
        },
        227: {
          _start: '1854-11-27',
        },
        228: {
          _start: '1860-3-18',
        },
        229: {
          _start: '1861-2-19',
        },
        230: {
          _start: '1864-2-20',
        },
        231: {
          _start: '1865-4-7',
        },
        232: {
          _start: '1868-9-8',
        },
        233: {
          _start: '1912-7-30',
        },
        234: {
          _start: '1926-12-25',
        },
        235: {
          _start: '1989-1-8',
        },
        236: {
          _start: '2019-5-1',
        },
      },
    },
    buddhist: {
      calendarSystem: 'solar',
      eras: {
        0: {
          _start: '-542-01-01',
        },
      },
    },
    roc: {
      eras: {
        0: {
          _end: '1911-12-31',
        },
        1: {
          _start: '1912-01-01',
        },
      },
    },
    generic: {},
    gregorian: {
      calendarSystem: 'solar',
      eras: {
        0: {
          _end: '0-12-31',
        },
        1: {
          _start: '1-01-01',
        },
      },
    },
    indian: {
      eras: {
        0: {
          _start: '79-01-01',
        },
      },
    },
    persian: {
      calendarSystem: 'solar',
      eras: {
        0: {
          _start: '622-01-01',
        },
      },
    },
  },
  'common.digits': {
    bhks: '𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙',
    talu: '᧐᧑᧒᧓᧔᧕᧖᧗᧘᧙',
    guru: '੦੧੨੩੪੫੬੭੮੯',
    arabext: '۰۱۲۳۴۵۶۷۸۹',
    gujr: '૦૧૨૩૪૫૬૭૮૯',
    mathdbl: '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
    fullwide: '０１２３４５６７８９',
    telu: '౦౧౨౩౪౫౬౭౮౯',
    mathmono: '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
    gong: '𑶠𑶡𑶢𑶣𑶤𑶥𑶦𑶧𑶨𑶩',
    beng: '০১২৩৪৫৬৭৮৯',
    knda: '೦೧೨೩೪೫೬೭೮೯',
    java: '꧐꧑꧒꧓꧔꧕꧖꧗꧘꧙',
    modi: '𑙐𑙑𑙒𑙓𑙔𑙕𑙖𑙗𑙘𑙙',
    gonm: '𑵐𑵑𑵒𑵓𑵔𑵕𑵖𑵗𑵘𑵙',
    segment: '🯰🯱🯲🯳🯴🯵🯶🯷🯸🯹',
    latn: '0123456789',
    lepc: '᱀᱁᱂᱃᱄᱅᱆᱇᱈᱉',
    orya: '୦୧୨୩୪୫୬୭୮୯',
    takr: '𑛀𑛁𑛂𑛃𑛄𑛅𑛆𑛇𑛈𑛉',
    sinh: '෦෧෨෩෪෫෬෭෮෯',
    laoo: '໐໑໒໓໔໕໖໗໘໙',
    thai: '๐๑๒๓๔๕๖๗๘๙',
    mymrtlng: '꧰꧱꧲꧳꧴꧵꧶꧷꧸꧹',
    sund: '᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹',
    olck: '᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙',
    tibt: '༠༡༢༣༤༥༦༧༨༩',
    hmnp: '𞅀𞅁𞅂𞅃𞅄𞅅𞅆𞅇𞅈𞅉',
    mtei: '꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹',
    sind: '𑋰𑋱𑋲𑋳𑋴𑋵𑋶𑋷𑋸𑋹',
    vaii: '꘠꘡꘢꘣꘤꘥꘦꘧꘨꘩',
    mymrshan: '႐႑႒႓႔႕႖႗႘႙',
    tamldec: '௦௧௨௩௪௫௬௭௮௯',
    sora: '𑃰𑃱𑃲𑃳𑃴𑃵𑃶𑃷𑃸𑃹',
    arab: '٠١٢٣٤٥٦٧٨٩',
    diak: '𑥐𑥑𑥒𑥓𑥔𑥕𑥖𑥗𑥘𑥙',
    mlym: '൦൧൨൩൪൫൬൭൮൯',
    deva: '०१२३४५६७८९',
    hanidec: '〇一二三四五六七八九',
    adlm: '𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙',
    rohg: '𐴰𐴱𐴲𐴳𐴴𐴵𐴶𐴷𐴸𐴹',
    osma: '𐒠𐒡𐒢𐒣𐒤𐒥𐒦𐒧𐒨𐒩',
    hmng: '𖭐𖭑𖭒𖭓𖭔𖭕𖭖𖭗𖭘𖭙',
    wara: '𑣠𑣡𑣢𑣣𑣤𑣥𑣦𑣧𑣨𑣩',
    bali: '᭐᭑᭒᭓᭔᭕᭖᭗᭘᭙',
    brah: '𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯',
    lana: '᪀᪁᪂᪃᪄᪅᪆᪇᪈᪉',
    tirh: '𑓐𑓑𑓒𑓓𑓔𑓕𑓖𑓗𑓘𑓙',
    saur: '꣐꣑꣒꣓꣔꣕꣖꣗꣘꣙',
    limb: '᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏',
    kali: '꤀꤁꤂꤃꤄꤅꤆꤇꤈꤉',
    mymr: '၀၁၂၃၄၅၆၇၈၉',
    wcho: '𞋰𞋱𞋲𞋳𞋴𞋵𞋶𞋷𞋸𞋹',
    mathsans: '𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫',
    ahom: '𑜰𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹',
    mong: '᠐᠑᠒᠓᠔᠕᠖᠗᠘᠙',
    cakm: '𑄶𑄷𑄸𑄹𑄺𑄻𑄼𑄽𑄾𑄿',
    nkoo: '߀߁߂߃߄߅߆߇߈߉',
    khmr: '០១២៣៤៥៦៧៨៩',
    newa: '𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙',
    shrd: '𑇐𑇑𑇒𑇓𑇔𑇕𑇖𑇗𑇘𑇙',
    mathsanb: '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
    lanatham: '᪐᪑᪒᪓᪔᪕᪖᪗᪘᪙',
    mroo: '𖩠𖩡𖩢𖩣𖩤𖩥𖩦𖩧𖩨𖩩',
    mathbold: '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
    tnsa: '𖫀𖫁𖫂𖫃𖫄𖫅𖫆𖫇𖫈𖫉',
    cham: '꩐꩑꩒꩓꩔꩕꩖꩗꩘꩙',
  },
  'dateTime.shortDateFormat': 'd/MM/yyyy',
  'dateTime.mediumDateFormat': 'dd/MM/yyyy',
  'dateTime.longDateFormat': 'd MMMM yyyy',
  'dateTime.shortDateTimeFormat': 'd/MM/yyyy h:mm a',
  'dateTime.mediumDateTimeFormat': 'dd/MM/yyyy h:mm:ss a',
  'dateTime.longDateTimeFormat': 'd/MM/yyyy h:mm:ss a',
  'dateTime.shortTimeFormat': 'h:mm a',
  'dateTime.longTimeFormat': 'h:mm:ss a',
  'number.currencyFormat': '¤#,##0.00',
  'number.currencySymbol': '$',
  'number.decimalSeparator\t': '.',
  'number.exponentialSign\t': 'E',
  'number.groupingSeparator': ',',
  'number.infinity': '∞',
  'number.minusSign': '-',
  'number.nan': '�',
  'number.numberFormat': '#,##0.###',
  'number.perMilleSign': '‰',
  'number.percentFormat': '#,##0%',
  'number.percentSign': '%',
  'number.plusSign': '+',
  'number.superscriptExponentSign': '×',
  showJapaneseCalendar: false,
  timeZone: 'Australia/Sydney',
}
