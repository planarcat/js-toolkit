import toFormattedNumber from "@/object/toFormattedNumber";

describe("toFormattedNumber 函数测试", () => {
  describe("单个值测试", () => {
    it("应该正确处理数字值", () => {
      expect(toFormattedNumber(123.456)).toBe(123.456);
      expect(toFormattedNumber(0)).toBe(0);
      expect(toFormattedNumber(-123.456)).toBe(-123.456);
    });

    it("应该正确处理指定小数位数", () => {
      expect(toFormattedNumber(123.456, { decimalPlaces: 2 })).toBe(123.46);
      expect(toFormattedNumber(123.456, { decimalPlaces: 0 })).toBe(123);
      expect(toFormattedNumber(123.456, { decimalPlaces: 5 })).toBe(123.456);
      expect(toFormattedNumber(-123.456, { decimalPlaces: 1 })).toBe(-123.5);
    });

    it("应该正确处理保留所有小数位", () => {
      expect(toFormattedNumber(123.456, { decimalPlaces: true })).toBe(123.456);
    });
  });

  describe("字符串测试", () => {
    it("应该正确提取字符串中的数字", () => {
      expect(toFormattedNumber("123.456abc")).toBe(123.456);
      expect(toFormattedNumber("abc123.456def")).toBe(123.456);
      expect(toFormattedNumber("abc123.12aa456def")).toBe(123.12);
      expect(toFormattedNumber("-123.456")).toBe(-123.456);
      expect(toFormattedNumber("+123.456")).toBe(123.456);
      expect(toFormattedNumber(" 123.456 ")).toBe(123.456);
    });

    it("应该对无数字的字符串返回0", () => {
      expect(toFormattedNumber("abc")).toBe(0);
      expect(toFormattedNumber("")).toBe(0);
      expect(toFormattedNumber("+-.")).toBe(0);
    });

    it("应该正确处理科学计数法字符串", () => {
      expect(toFormattedNumber("1.23e3")).toBe(1230);
      expect(toFormattedNumber("1.23e-3")).toBe(0.00123);
    });
  });

  describe("布尔值测试", () => {
    it("应该将true转换为1", () => {
      expect(toFormattedNumber(true)).toBe(1);
    });

    it("应该将false转换为0", () => {
      expect(toFormattedNumber(false)).toBe(0);
    });
  });

  describe("特殊类型测试", () => {
    it("应该对null返回NaN", () => {
      expect(toFormattedNumber(null)).toBeNaN();
    });

    it("应该对undefined返回NaN", () => {
      expect(toFormattedNumber(undefined)).toBeNaN();
    });

    it("应该对Symbol返回NaN", () => {
      expect(toFormattedNumber(Symbol("test"))).toBeNaN();
    });

    it("应该对function返回NaN", () => {
      expect(toFormattedNumber(() => {})).toBeNaN();
    });

    it("应该对普通对象返回NaN", () => {
      expect(toFormattedNumber({})).toBeNaN();
      expect(toFormattedNumber({ a: 123 })).toBeNaN();
    });
  });

  describe("数组测试", () => {
    it("应该正确处理数字数组", () => {
      expect(toFormattedNumber([123.456, 789.012])).toEqual([123.456, 789.012]);
    });

    it("应该正确处理混合类型数组", () => {
      const result = toFormattedNumber([123.456, "789.012abc", true, null]);
      expect(result[0]).toBe(123.456);
      expect(result[1]).toBe(789.012);
      expect(result[2]).toBe(1);
      expect(result[3]).toBeNaN();
    });

    it("应该正确处理空数组", () => {
      expect(toFormattedNumber([])).toEqual([]);
    });

    it("应该对数组应用decimalPlaces选项", () => {
      const result = toFormattedNumber([123.456, 789.012], {
        decimalPlaces: 2,
      });
      expect(result).toEqual([123.46, 789.01]);
    });

    it("应该正确处理深层数组", () => {
      const result = toFormattedNumber([
        [1, "1", null],
        "xxx",
        ["123a", ["123", "456ff"]],
      ]);
      // 验证深层数组递归处理
      expect(result).toEqual([[1, 1, NaN], 0, [123, [123, 456]]]);
    });
  });

  describe("选项测试", () => {
    it("应该正确处理自定义nanValue", () => {
      expect(toFormattedNumber(null, { nanValue: 0 })).toBe(0);
      expect(toFormattedNumber(undefined, { nanValue: -1 })).toBe(-1);
    });

    it("应该处理不同的decimalPlaces值", () => {
      expect(toFormattedNumber(123.456, { decimalPlaces: 1 })).toBe(123.5);
      expect(toFormattedNumber(123.456, { decimalPlaces: 3 })).toBe(123.456);
      expect(toFormattedNumber(123.456, { decimalPlaces: 10 })).toBe(123.456);
    });
  });
});
