import formatDate from '../../../src/date/formatDate';

describe('formatDate', () => {
  const testDate = new Date('2023-12-25T14:30:45.123');
  let consoleWarnSpy: jest.SpyInstance;
  
  beforeEach(() => {
    // 在每个测试前 mock console.warn
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  
  afterEach(() => {
    // 在每个测试后恢复
    consoleWarnSpy.mockRestore();
  });
  
  describe('基础格式化', () => {
    it('应正确格式化默认格式', () => {
      expect(formatDate(testDate)).toBe('2023-12-25 14:30:45');
    });
    
    it('应支持自定义格式字符串', () => {
      expect(formatDate(testDate, 'YYYY/MM/DD')).toBe('2023/12/25');
      expect(formatDate(testDate, 'HH:mm:ss')).toBe('14:30:45');
      expect(formatDate(testDate, 'YYYY年MM月DD日')).toBe('2023年12月25日');
    });
    
    it('应正确处理单个字符标记', () => {
      expect(formatDate(testDate, 'Y-M-D H:m:s')).toBe('2023-12-25 14:30:45');
    });
    
    it('应正确处理混合标记', () => {
      expect(formatDate(testDate, 'YY-M-D HH:mm')).toBe('23-12-25 14:30');
    });
  });
  
  describe('特殊标记', () => {
    it('应正确处理12小时制', () => {
      expect(formatDate(testDate, 'hh:mm:ss A')).toBe('02:30:45 PM');
      expect(formatDate(new Date('2023-12-25T08:30:45'), 'hh:mm:ss a')).toBe('08:30:45 am');
    });
    
    it('应正确显示毫秒', () => {
      expect(formatDate(testDate, 'HH:mm:ss.SSS')).toBe('14:30:45.123');
    });
    
    it('应正确显示周几', () => {
      expect(formatDate(testDate, 'dd')).toBe('一');
      expect(formatDate(testDate, 'YYYY-MM-DD dd')).toBe('2023-12-25 一');
    });
    
    it('应正确显示季度和周数', () => {
      expect(formatDate(testDate, 'Q季度 WW周')).toBe('4季度 52周');
    });
    
    it('应返回时间戳', () => {
      expect(formatDate(testDate, 'timestamp')).toBe('1703485845123');
    });
    
    it('不应混淆timestamp中的字符', () => {
      // 确保 timestamp 不会被拆解替换
      expect(formatDate(testDate, 'timestamp mm')).toBe('1703485845123 30');
    });
  });
  
  describe('输入类型处理', () => {
    it('应接受字符串输入', () => {
      expect(formatDate('2023-12-25', 'YYYY-MM-DD')).toBe('2023-12-25');
      expect(formatDate('2023/12/25', 'YYYY/MM/DD')).toBe('2023/12/25');
    });
    
    it('应接受数字时间戳', () => {
      expect(formatDate(testDate.getTime(), 'YYYY-MM-DD')).toBe('2023-12-25');
    });
    
    it('应处理无效输入并发出警告', () => {
      // 现在 console.warn 被 mock 了
      expect(formatDate('invalid', 'YYYY-MM-DD')).toMatch(/\d{4}-\d{2}-\d{2}/);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Invalid date input: invalid, using current date instead.'
      );
    });
    
    it('应处理null和undefined输入', () => {
      expect(formatDate(null, 'YYYY-MM-DD')).toMatch(/\d{4}-\d{2}-\d{2}/);
      expect(formatDate(undefined, 'YYYY-MM-DD')).toMatch(/\d{4}-\d{2}-\d{2}/);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    });
  });
  
  describe('选项配置', () => {
    it('应支持显示周几前缀', () => {
      expect(formatDate(testDate, 'HH:mm', { showWeekday: true }))
        .toBe('周一 14:30');
    });
    
    it('应支持自定义周几格式', () => {
      expect(formatDate(testDate, 'HH:mm', { 
        showWeekday: true, 
        weekdayFormat: '星期' 
      })).toBe('星期一 14:30');
    });
    
    it('应支持英文环境', () => {
      expect(formatDate(testDate, 'dd', { locale: 'en-US' })).toBe('Mon');
    });
    
    it('应支持自定义格式化器', () => {
      const customFormatters = {
        '季度': (date: Date) => `第${Math.floor((date.getMonth() + 3) / 3)}季度`,
        '年份缩写': (date: Date) => `'${date.getFullYear().toString().slice(-2)}`
      };
      
      expect(formatDate(testDate, 'YYYY年 季度', { customFormatters }))
        .toBe('2023年 第4季度');
        
      expect(formatDate(testDate, '年份缩写年', { customFormatters }))
        .toBe("'23年");
    });
    
    it('自定义格式化器应优先于系统标记', () => {
      const customFormatters = {
        'Y': (date: Date) => `Year${date.getFullYear()}`,
        'MM': (date: Date) => `Month${date.getMonth() + 1}`
      };
      
      expect(formatDate(testDate, 'Y年MM月', { customFormatters }))
        .toBe('Year2023年Month12月');
    });
  });
  
  describe('边界和错误处理', () => {
    it('应处理空字符串格式', () => {
      expect(formatDate(testDate, '')).toBe('');
    });
    
    it('应处理无标记的纯文本格式', () => {
      expect(formatDate(testDate, '今天是：')).toBe('今天是：');
    });
    
    it('应处理重复标记', () => {
      expect(formatDate(testDate, 'YYYY-YYYY')).toBe('2023-2023');
    });
    
    it('应处理复杂标记组合', () => {
      const result = formatDate(testDate, 'YYYY-MM-DD HH:mm:ss.SSS dd Q季度 WW周 timestamp');
      expect(result).toContain('2023-12-25');
      expect(result).toContain('14:30:45.123');
      expect(result).toContain('一');
      expect(result).toContain('4季度');
      expect(result).toContain('52周');
      expect(result).toContain('1703485845123');
    });
  });
});