import toFormattedNumberString from "@/object/toFormattedNumberString";

describe("toFormattedNumberString 函数测试", () => {
  describe("单个值测试", () => {
    it("应该正确处理数字值", () => {
      expect(toFormattedNumberString(123.456)).toBe("123.456");
      expect(toFormattedNumberString(0)).toBe("0");
      expect(toFormattedNumberString(-123.456)).toBe("-123.456");
    });

    it("应该正确处理保留所有小数位", () => {
      expect(toFormattedNumberString(123.456, { decimalPlaces: true })).toBe(
        "123.456",
      );
    });
  });

  describe("小数位处理测试", () => {
    it("应该正确处理指定小数位数，不够时补0", () => {
      expect(toFormattedNumberString(123.456, { decimalPlaces: 2 })).toBe(
        "123.46",
      );
      expect(toFormattedNumberString(123.4, { decimalPlaces: 2 })).toBe(
        "123.40",
      );
      expect(toFormattedNumberString(123, { decimalPlaces: 2 })).toBe("123.00");
      expect(toFormattedNumberString(-123.456, { decimalPlaces: 1 })).toBe(
        "-123.5",
      );
    });

    it("应该正确处理保留0位小数", () => {
      expect(toFormattedNumberString(123.456, { decimalPlaces: 0 })).toBe(
        "123",
      );
      expect(toFormattedNumberString(123.9, { decimalPlaces: 0 })).toBe("124");
    });
  });

  describe("字符串测试", () => {
    it("应该正确提取字符串中的数字并转换为字符串", () => {
      expect(toFormattedNumberString("123.456abc")).toBe("123.456");
      expect(toFormattedNumberString("abc123.456def")).toBe("123.456");
      expect(toFormattedNumberString("-123.456")).toBe("-123.456");
    });

    it("应该对无数字的字符串返回指定的0显示", () => {
      // 无数字字符串默认返回'0'
      expect(toFormattedNumberString("abc")).toBe("0");
      expect(toFormattedNumberString("")).toBe("0");
      // 自定义zeroValue选项
      expect(toFormattedNumberString("abc", { zeroValue: "" })).toBe("");
      expect(toFormattedNumberString("", { zeroValue: "123" })).toBe("123");
    });
  });

  describe("布尔值测试", () => {
    it('应该将true转换为字符串"1"', () => {
      expect(toFormattedNumberString(true)).toBe("1");
    });

    it('应该将false转换为字符串"0"', () => {
      expect(toFormattedNumberString(false)).toBe("0");
    });
  });

  describe("特殊类型测试", () => {
    it("应该对null返回指定的NaN显示", () => {
      expect(toFormattedNumberString(null)).toBe("NaN");
      expect(toFormattedNumberString(null, { nanValue: "N/A" })).toBe("N/A");
    });

    it("应该对undefined返回指定的NaN显示", () => {
      expect(toFormattedNumberString(undefined)).toBe("NaN");
      expect(toFormattedNumberString(undefined, { nanValue: "N/A" })).toBe(
        "N/A",
      );
    });

    it("应该对Symbol返回指定的NaN显示", () => {
      expect(toFormattedNumberString(Symbol("test"))).toBe("NaN");
    });

    it("应该对function返回指定的NaN显示", () => {
      expect(toFormattedNumberString(() => {})).toBe("NaN");
    });

    it("应该对普通对象返回指定的NaN显示", () => {
      expect(toFormattedNumberString({})).toBe("NaN");
      expect(toFormattedNumberString({ a: 123 })).toBe("NaN");
    });
  });

  describe("自定义显示测试", () => {
    it("应该正确处理自定义0显示", () => {
      expect(toFormattedNumberString(0, { zeroValue: "-" })).toBe("-");
      expect(toFormattedNumberString(0, { zeroValue: "0.00" })).toBe("0.00");
    });
  });

  describe("本地化格式测试", () => {
    it("应该正确处理本地化格式", () => {
      // 注意：本地化格式可能因环境而异，这里使用基本测试
      const num = 1234567.89;
      const localizedStr = num.toLocaleString();
      expect(toFormattedNumberString(num, { useLocalizedFormat: true })).toBe(
        localizedStr,
      );
    });

    it("应该对本地化格式应用指定小数位", () => {
      const num = 1234567.89;
      const localizedStr = num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      expect(
        toFormattedNumberString(num, {
          useLocalizedFormat: true,
          decimalPlaces: 2,
        }),
      ).toBe(localizedStr);
    });
  });

  describe("预处理函数测试", () => {
    it("应该正确应用预处理函数", () => {
      expect(
        toFormattedNumberString(0.1234, {
          preProcessor: (num) => num * 100,
          suffix: "%",
        }),
      ).toBe("12.34%");

      expect(
        toFormattedNumberString(100, {
          preProcessor: (num) => num / 100,
          decimalPlaces: 4,
        }),
      ).toBe("1.0000");
    });
  });

  describe("前缀后缀测试", () => {
    it("应该正确添加前缀", () => {
      expect(toFormattedNumberString(123.456, { prefix: "$" })).toBe(
        "$123.456",
      );
    });

    it("应该正确添加后缀", () => {
      expect(toFormattedNumberString(123.456, { suffix: " USD" })).toBe(
        "123.456 USD",
      );
    });

    it("应该同时添加前缀和后缀", () => {
      expect(
        toFormattedNumberString(123.456, { prefix: "$", suffix: " USD" }),
      ).toBe("$123.456 USD");
    });

    it("应该在预处理函数后添加前缀后缀", () => {
      expect(
        toFormattedNumberString(0.1234, {
          preProcessor: (num) => num * 100,
          prefix: "~",
          suffix: "%",
        }),
      ).toBe("~12.34%");
    });
  });

  describe("数组测试", () => {
    it("应该正确处理数字数组", () => {
      expect(toFormattedNumberString([123.456, 789.012])).toEqual([
        "123.456",
        "789.012",
      ]);
    });

    it("应该正确处理混合类型数组", () => {
      const result = toFormattedNumberString([
        123.456,
        "789.012abc",
        true,
        null,
      ]);
      expect(result[0]).toBe("123.456");
      expect(result[1]).toBe("789.012");
      expect(result[2]).toBe("1");
      expect(result[3]).toBe("NaN");
    });

    it("应该对数组应用decimalPlaces选项", () => {
      const result = toFormattedNumberString([123.456, 789.012], {
        decimalPlaces: 2,
      });
      expect(result).toEqual(["123.46", "789.01"]);
    });

    it("应该正确处理深层数组", () => {
      const result = toFormattedNumberString(
        [
          [1, "1.23"],
          ["45.67", [89.01, "abc"]],
        ],
        {
          decimalPlaces: 2,
        },
      );
      // 验证深层数组递归处理
      expect(result).toEqual([
        ["1.00", "1.23"],
        ["45.67", ["89.01", "0"]],
      ]);
    });

    it("应该对数组应用自定义NaN和0显示", () => {
      const result = toFormattedNumberString([0, null, 123], {
        zeroValue: "-",
        nanValue: "N/A",
      });
      expect(result).toEqual(["-", "N/A", "123"]);
    });
  });
});
