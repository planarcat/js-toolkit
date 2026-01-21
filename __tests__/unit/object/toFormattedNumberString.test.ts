import toFormattedNumberString from '@/object/toFormattedNumberString';
import { DecimalPlacesOptions } from '@/utils/constants';

describe('toFormattedNumberString 函数测试', () => {
  describe('单个值测试', () => {
    it('应该正确处理数字值', () => {
      expect(toFormattedNumberString(123.456)).toBe('123.456');
      expect(toFormattedNumberString(0)).toBe('0');
      expect(toFormattedNumberString(-123.456)).toBe('-123.456');
    });

    it('应该正确处理保留所有小数位', () => {
      expect(
        toFormattedNumberString(123.456, {
          decimalPlaces: DecimalPlacesOptions.RETAIN_ALL,
        }),
      ).toBe('123.456');
    });
  });

  describe('小数位处理测试', () => {
    it('应该正确处理指定小数位数，不够时补0', () => {
      expect(toFormattedNumberString(123.456, { decimalPlaces: 2 })).toBe(
        '123.46',
      );
      expect(toFormattedNumberString(123.4, { decimalPlaces: 2 })).toBe(
        '123.40',
      );
      expect(toFormattedNumberString(123, { decimalPlaces: 2 })).toBe('123.00');
      expect(toFormattedNumberString(-123.456, { decimalPlaces: 1 })).toBe(
        '-123.5',
      );
    });

    it('应该正确处理保留0位小数', () => {
      expect(toFormattedNumberString(123.456, { decimalPlaces: 0 })).toBe(
        '123',
      );
      expect(toFormattedNumberString(123.9, { decimalPlaces: 0 })).toBe('124');
    });
  });

  describe('字符串测试', () => {
    it('应该正确提取字符串中的数字并转换为字符串', () => {
      expect(toFormattedNumberString('123.456abc')).toBe('123.456');
      expect(toFormattedNumberString('abc123.456def')).toBe('123.456');
      expect(toFormattedNumberString('abc123.12aa456def')).toBe('123.12');
      expect(toFormattedNumberString('-123.456')).toBe('-123.456');
      expect(toFormattedNumberString('+123.456')).toBe('123.456');
      expect(toFormattedNumberString(' 123.456 ')).toBe('123.456');
    });

    it('应该正确处理科学计数法字符串', () => {
      expect(toFormattedNumberString('1.23e3')).toBe('1230');
      expect(toFormattedNumberString('1.23e-3')).toBe('0.00123');
    });

    it('应该对无数字的字符串返回指定的0显示', () => {
      // 无数字字符串默认返回'0'
      expect(toFormattedNumberString('abc')).toBe('0');
      expect(toFormattedNumberString('')).toBe('0');
      expect(toFormattedNumberString('+-.')).toBe('0');
      // 自定义zeroValue选项
      expect(toFormattedNumberString('abc', { zeroValue: '' })).toBe('');
      expect(toFormattedNumberString('', { zeroValue: '123' })).toBe('123');
    });
  });

  describe('布尔值测试', () => {
    it('应该将true转换为字符串"1"', () => {
      expect(toFormattedNumberString(true)).toBe('1');
    });

    it('应该将false转换为字符串"0"', () => {
      expect(toFormattedNumberString(false)).toBe('0');
    });
  });

  describe('特殊类型测试', () => {
    it('应该对null返回指定的NaN显示', () => {
      expect(toFormattedNumberString(null)).toBe('NaN');
      expect(toFormattedNumberString(null, { nanValue: 'N/A' })).toBe('N/A');
    });

    it('应该对undefined返回指定的NaN显示', () => {
      expect(toFormattedNumberString(undefined)).toBe('NaN');
      expect(toFormattedNumberString(undefined, { nanValue: 'N/A' })).toBe(
        'N/A',
      );
    });

    it('应该对Symbol返回指定的NaN显示', () => {
      expect(toFormattedNumberString(Symbol('test'))).toBe('NaN');
    });

    it('应该对function返回指定的NaN显示', () => {
      expect(toFormattedNumberString(() => {})).toBe('NaN');
    });

    it('应该对普通对象返回指定的NaN显示', () => {
      expect(toFormattedNumberString({})).toBe('NaN');
      expect(toFormattedNumberString({ a: 123 })).toBe('NaN');
    });
  });

  describe('自定义显示测试', () => {
    it('应该正确处理自定义0显示', () => {
      expect(toFormattedNumberString(0, { zeroValue: '-' })).toBe('-');
      expect(toFormattedNumberString(0, { zeroValue: '0.00' })).toBe('0.00');
    });
  });

  describe('本地化格式测试', () => {
    it('应该正确处理本地化格式', () => {
      // 注意：本地化格式可能因环境而异，这里使用基本测试
      const num = 1234567.89;
      const localizedStr = num.toLocaleString();
      expect(toFormattedNumberString(num, { localized: true })).toBe(
        localizedStr,
      );
    });

    it('应该对本地化格式应用指定小数位', () => {
      const num = 1234567.89;
      const localizedStr = num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      expect(
        toFormattedNumberString(num, {
          localized: true,
          decimalPlaces: 2,
        }),
      ).toBe(localizedStr);
    });
  });

  describe('预处理函数测试', () => {
    it('应该正确应用预处理函数', () => {
      expect(
        toFormattedNumberString(0.1234, {
          preProcessor: (_original, num) => num * 100,
          suffix: '%',
        }),
      ).toBe('12.34%');

      expect(
        toFormattedNumberString(100, {
          preProcessor: (_original, num) => num / 100,
          decimalPlaces: 4,
        }),
      ).toBe('1.0000');
    });

    it('应该正确处理预处理函数和后缀函数的组合使用', () => {
      // 测试大于10000的值
      expect(
        toFormattedNumberString(12345.6789, {
          preProcessor: (_original, converted) =>
            converted > 10000 ? converted / 10000 : converted,
          suffix: (_original, converted) => (converted > 10000 ? '万' : ''),
          decimalPlaces: 2,
        }),
      ).toBe('1.23万');

      // 测试小于等于10000的值
      expect(
        toFormattedNumberString(1234.5678, {
          preProcessor: (_original, converted) =>
            converted > 10000 ? converted / 10000 : converted,
          suffix: (_original, converted) => (converted > 10000 ? '万' : ''),
          decimalPlaces: 2,
        }),
      ).toBe('1234.57');
    });
  });

  describe('前缀后缀测试', () => {
    it('应该正确添加前缀', () => {
      expect(toFormattedNumberString(123.456, { prefix: '$' })).toBe(
        '$123.456',
      );
    });

    it('应该正确添加后缀', () => {
      expect(toFormattedNumberString(123.456, { suffix: ' USD' })).toBe(
        '123.456 USD',
      );
    });

    it('应该同时添加前缀和后缀', () => {
      expect(
        toFormattedNumberString(123.456, { prefix: '$', suffix: ' USD' }),
      ).toBe('$123.456 USD');
    });

    it('应该在预处理函数后添加前缀后缀', () => {
      expect(
        toFormattedNumberString(0.1234, {
          preProcessor: (_original, num) => num * 100,
          prefix: '~',
          suffix: '%',
        }),
      ).toBe('~12.34%');
    });

    it('应该为0值添加前缀和后缀', () => {
      expect(toFormattedNumberString(0, { prefix: '$' })).toBe('$0');
      expect(toFormattedNumberString(0, { suffix: ' USD' })).toBe('0 USD');
      expect(toFormattedNumberString(0, { prefix: '$', suffix: ' USD' })).toBe(
        '$0 USD',
      );
    });

    it('应该为NaN值添加前缀和后缀', () => {
      expect(toFormattedNumberString(null, { prefix: '$' })).toBe('$NaN');
      expect(toFormattedNumberString(null, { suffix: ' USD' })).toBe('NaN USD');
      expect(
        toFormattedNumberString(null, { prefix: '$', suffix: ' USD' }),
      ).toBe('$NaN USD');
    });

    it('应该为无数字字符串添加前缀和后缀', () => {
      expect(toFormattedNumberString('abc', { prefix: '$' })).toBe('$0');
      expect(toFormattedNumberString('', { suffix: ' USD' })).toBe('0 USD');
      expect(
        toFormattedNumberString('xyz', { prefix: '$', suffix: ' USD' }),
      ).toBe('$0 USD');
    });

    it('应该为自定义0值和NaN值添加前缀和后缀', () => {
      expect(toFormattedNumberString(0, { prefix: '$', zeroValue: '-' })).toBe(
        '$-',
      );
      expect(
        toFormattedNumberString(null, { suffix: ' USD', nanValue: 'N/A' }),
      ).toBe('N/A USD');
      expect(
        toFormattedNumberString('abc', {
          prefix: '$',
          suffix: ' USD',
          zeroValue: '0.00',
        }),
      ).toBe('$0.00 USD');
    });

    it('应该支持函数类型的前缀', () => {
      expect(
        toFormattedNumberString(123.456, {
          prefix: (_original, converted, _formatted) =>
            `$${Math.floor(converted)}`,
        }),
      ).toBe('$123123.456');
      expect(
        toFormattedNumberString(0, {
          prefix: (_original, converted, _formatted) =>
            converted === 0 ? '免费' : '$',
        }),
      ).toBe('免费0');
    });

    it('应该支持函数类型的后缀', () => {
      expect(
        toFormattedNumberString(123.456, {
          suffix: (_original, converted, _formatted) =>
            `/${converted.toFixed(0)}`,
        }),
      ).toBe('123.456/123');
      expect(
        toFormattedNumberString(0, {
          suffix: (_original, converted, _formatted) =>
            converted === 0 ? ' (免费)' : '',
        }),
      ).toBe('0 (免费)');
    });

    it('应该同时支持函数类型的前缀和后缀', () => {
      expect(
        toFormattedNumberString(123.456, {
          prefix: (_original, converted, _formatted) =>
            `金额: $${Math.round(converted)}`,
          suffix: (_original, converted, _formatted) =>
            ` (精确值: ${converted})`,
        }),
      ).toBe('金额: $123123.456 (精确值: 123.456)');
    });

    it('应该为 preProcessor 和后缀函数提供原始对象', () => {
      // 测试 preProcessor 接收原始对象
      expect(
        toFormattedNumberString('123.456abc', {
          preProcessor: (original, converted) => {
            // 检查原始对象是否正确传递
            expect(typeof original).toBe('string');
            return converted;
          },
        }),
      ).toBe('123.456');

      // 测试后缀函数接收原始对象
      expect(
        toFormattedNumberString(123.456, {
          suffix: (_original, converted, _formatted) => {
            // 检查原始对象是否正确传递
            expect(_original).toBe(123.456);
            return `/${converted.toFixed(0)}`;
          },
        }),
      ).toBe('123.456/123');
    });
  });

  describe('数组测试', () => {
    it('应该正确处理数字数组', () => {
      expect(toFormattedNumberString([123.456, 789.012])).toEqual([
        '123.456',
        '789.012',
      ]);
    });

    it('应该正确处理混合类型数组', () => {
      const result = toFormattedNumberString([
        123.456,
        '789.012abc',
        true,
        null,
      ]);
      expect(result[0]).toBe('123.456');
      expect(result[1]).toBe('789.012');
      expect(result[2]).toBe('1');
      expect(result[3]).toBe('NaN');
    });

    it('应该对数组应用decimalPlaces选项', () => {
      const result = toFormattedNumberString([123.456, 789.012], {
        decimalPlaces: 2,
      });
      expect(result).toEqual(['123.46', '789.01']);
    });

    it('应该正确处理深层数组', () => {
      const result = toFormattedNumberString(
        [
          [1, '1.23'],
          ['45.67', [89.01, 'abc']],
        ],
        {
          decimalPlaces: 2,
        },
      );
      // 验证深层数组递归处理
      expect(result).toEqual([
        ['1.00', '1.23'],
        ['45.67', ['89.01', '0']],
      ]);
    });

    it('应该对数组应用自定义NaN和0显示', () => {
      const result = toFormattedNumberString([0, null, 123], {
        zeroValue: '-',
        nanValue: 'N/A',
      });
      expect(result).toEqual(['-', 'N/A', '123']);
    });
  });
});
