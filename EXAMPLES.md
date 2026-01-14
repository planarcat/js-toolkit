# 使用示例和指南

## 目录

- [快速开始](#快速开始)
- [常见场景](#常见场景)
- [高级用法](#高级用法)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

## 快速开始

### 基础安装和使用

```bash
# 安装
npm install @planarcat/js-toolkit
```

```typescript
// 基础导入和使用
import { formatDate } from '@planarcat/js-toolkit';

// 最简单的用法
console.log(formatDate(new Date()));
// 输出: "2023-12-25 14:30:45"

// 自定义格式
console.log(formatDate(new Date(), 'YYYY年MM月DD日'));
// 输出: "2023年12月25日"
```

### 在 React 项目中使用

```tsx
import React from 'react';
import { formatDate } from '@planarcat/js-toolkit';

const DateDisplay: React.FC = () => {
  const now = new Date();
  
  return (
    <div>
      <p>当前时间: {formatDate(now, 'YYYY-MM-DD HH:mm:ss')}</p>
      <p>中文格式: {formatDate(now, 'YYYY年MM月DD日 HH时mm分')}</p>
      <p>带周几: {formatDate(now, 'HH:mm', { showWeekday: true })}</p>
    </div>
  );
};

export default DateDisplay;
```

### 在 Vue 项目中使用

```vue
<template>
  <div>
    <p>当前时间: {{ formattedDate }}</p>
    <p>中文格式: {{ chineseDate }}</p>
    <p>带周几: {{ dateWithWeekday }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatDate } from '@planarcat/js-toolkit';

const now = ref(new Date());
const formattedDate = ref('');
const chineseDate = ref('');
const dateWithWeekday = ref('');

onMounted(() => {
  formattedDate.value = formatDate(now.value);
  chineseDate.value = formatDate(now.value, 'YYYY年MM月DD日 HH时mm分');
  dateWithWeekday.value = formatDate(now.value, 'HH:mm', { showWeekday: true });
});
</script>
```

### 在 Node.js 项目中使用

```javascript
// CommonJS
const { formatDate } = require('@planarcat/js-toolkit');

// ES Modules
import { formatDate } from '@planarcat/js-toolkit';

console.log('服务器时间:', formatDate(new Date()));
console.log('日志格式:', formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS'));
```

## 常见场景

### 1. 日志时间格式化

```typescript
import { formatDate } from '@planarcat/js-toolkit';

// 日志记录
function log(message: string) {
  const timestamp = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS');
  console.log(`[${timestamp}] ${message}`);
}

log('用户登录成功'); // [2023-12-25 14:30:45.123] 用户登录成功
```

### 2. 用户界面显示

```typescript
// 聊天消息时间显示
function formatMessageTime(timestamp: number): string {
  const now = new Date();
  const messageDate = new Date(timestamp);
  
  // 如果是今天，显示时间
  if (messageDate.toDateString() === now.toDateString()) {
    return formatDate(messageDate, 'HH:mm');
  }
  
  // 如果是昨天，显示"昨天"
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return '昨天 ' + formatDate(messageDate, 'HH:mm');
  }
  
  // 其他情况显示完整日期
  return formatDate(messageDate, 'YYYY-MM-DD');
}

// 使用示例
console.log(formatMessageTime(Date.now() - 1000 * 60)); // "14:30"
console.log(formatMessageTime(Date.now() - 1000 * 60 * 60 * 24)); // "昨天 14:30"
console.log(formatMessageTime(Date.now() - 1000 * 60 * 60 * 24 * 2)); // "2023-12-24"
```

### 3. 数据表格格式化

```typescript
// 表格数据格式化
interface User {
  id: number;
  name: string;
  createdAt: number;
  lastLogin: number;
}

function formatUserTableData(users: User[]) {
  return users.map(user => ({
    ...user,
    createdAt: formatDate(user.createdAt, 'YYYY-MM-DD'),
    lastLogin: formatDate(user.lastLogin, 'YYYY-MM-DD HH:mm'),
    lastLoginWithWeekday: formatDate(user.lastLogin, 'HH:mm', { 
      showWeekday: true 
    })
  }));
}

const users: User[] = [
  {
    id: 1,
    name: '张三',
    createdAt: new Date('2023-12-01').getTime(),
    lastLogin: new Date('2023-12-25T14:30:00').getTime()
  }
];

console.log(formatUserTableData(users));
// 输出: [{ id: 1, name: '张三', createdAt: '2023-12-01', lastLogin: '2023-12-25 14:30', lastLoginWithWeekday: '周一 14:30' }]
```

### 4. 国际化支持

```typescript
// 多语言日期格式化
function formatDateForLocale(
  date: Date, 
  locale: string, 
  format: string = 'YYYY-MM-DD HH:mm'
): string {
  return formatDate(date, format, { locale });
}

// 使用示例
console.log(formatDateForLocale(new Date(), 'zh-CN')); // "2023-12-25 14:30"
console.log(formatDateForLocale(new Date(), 'en-US', 'MM/DD/YYYY')); // "12/25/2023"
console.log(formatDateForLocale(new Date(), 'ja-JP', 'YYYY年MM月DD日')); // "2023年12月25日"
```

### 5. 文件命名

```typescript
// 生成带时间戳的文件名
function generateFileName(originalName: string, extension: string = ''): string {
  const timestamp = formatDate(new Date(), 'YYYYMMDD_HHmmss');
  const ext = extension || originalName.split('.').pop() || '';
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  
  return `${nameWithoutExt}_${timestamp}${ext ? '.' + ext : ''}`;
}

console.log(generateFileName('document.pdf')); // "document_20231225_143045.pdf"
console.log(generateFileName('image', 'jpg')); // "image_20231225_143045.jpg"
```

## 高级用法

### 自定义格式化器

```typescript
// 创建自定义格式化器
const customFormatters = {
  // 季度格式化
  'Q季度': (date: Date) => `第${Math.floor((date.getMonth() + 3) / 3)}季度`,
  
  // 相对时间格式化
  '相对时间': (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return '刚刚';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分钟前`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}小时前`;
    if (diff < 7 * 24 * 60 * 60 * 1000) return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前`;
    
    return formatDate(date, 'YYYY-MM-DD');
  },
  
  // 农历格式化（示例，需要实际农历库）
  '农历': (date: Date) => {
    // 这里可以集成农历库
    return '农历示例';
  }
};

// 使用自定义格式化器
const result = formatDate(new Date(), 'Q季度 相对时间', {
  customFormatters
});

console.log(result); // "第4季度 刚刚"
```

### 组合使用

```typescript
// 创建日期格式化工具函数
class DateFormatter {
  private static defaultOptions = {
    locale: 'zh-CN',
    timeZone: 'local'
  };

  static formatShort(date: DateInput): string {
    return formatDate(date, 'YYYY-MM-DD', this.defaultOptions);
  }

  static formatLong(date: DateInput): string {
    return formatDate(date, 'YYYY-MM-DD HH:mm:ss', this.defaultOptions);
  }

  static formatWithWeekday(date: DateInput): string {
    return formatDate(date, 'YYYY-MM-DD HH:mm', {
      ...this.defaultOptions,
      showWeekday: true
    });
  }

  static formatForDisplay(date: DateInput, includeTime: boolean = true): string {
    const format = includeTime ? 'YYYY年MM月DD日 HH:mm' : 'YYYY年MM月DD日';
    return formatDate(date, format, this.defaultOptions);
  }
}

// 使用示例
console.log(DateFormatter.formatShort(new Date())); // "2023-12-25"
console.log(DateFormatter.formatLong(new Date())); // "2023-12-25 14:30:45"
console.log(DateFormatter.formatWithWeekday(new Date())); // "周一 2023-12-25 14:30"
console.log(DateFormatter.formatForDisplay(new Date(), false)); // "2023年12月25日"
```

### 性能优化

```typescript
// 缓存常用格式化结果
class CachedDateFormatter {
  private static cache = new Map<string, string>();
  
  static format(date: DateInput, format: string, options?: Partial<DateFormatOptions>): string {
    const key = `${date.toString()}_${format}_${JSON.stringify(options)}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    
    const result = formatDate(date, format, options);
    this.cache.set(key, result);
    
    // 限制缓存大小
    if (this.cache.size > 1000) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    return result;
  }
  
  static clearCache(): void {
    this.cache.clear();
  }
}

// 在频繁调用的场景中使用缓存
for (let i = 0; i < 1000; i++) {
  // 使用缓存版本，避免重复计算
  CachedDateFormatter.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
}
```

## 最佳实践

### 1. 错误处理

```typescript
// 安全的日期格式化函数
function safeFormatDate(
  input: DateInput, 
  format: string = 'YYYY-MM-DD HH:mm:ss',
  fallback: string = '未知时间'
): string {
  try {
    return formatDate(input, format);
  } catch (error) {
    console.error('日期格式化失败:', error);
    return fallback;
  }
}

// 使用示例
console.log(safeFormatDate('invalid-date')); // "未知时间"
console.log(safeFormatDate(null, 'YYYY-MM-DD', '无日期')); // "无日期"
```

### 2. 类型安全

```typescript
// 使用 TypeScript 类型保护
function isValidDateInput(input: unknown): input is DateInput {
  return (
    input instanceof Date ||
    typeof input === 'number' ||
    typeof input === 'string'
  );
}

function formatDateSafely(input: unknown, format: string): string {
  if (!isValidDateInput(input)) {
    throw new Error('无效的日期输入类型');
  }
  
  return formatDate(input, format);
}
```

### 3. 配置管理

```typescript
// 集中管理日期格式化配置
interface AppConfig {
  dateFormat: {
    short: string;
    long: string;
    withWeekday: string;
    options: Partial<DateFormatOptions>;
  };
}

const config: AppConfig = {
  dateFormat: {
    short: 'YYYY-MM-DD',
    long: 'YYYY-MM-DD HH:mm:ss',
    withWeekday: 'YYYY-MM-DD HH:mm',
    options: {
      locale: 'zh-CN',
      showWeekday: true,
      weekdayFormat: '周'
    }
  }
};

function formatDateWithConfig(date: DateInput, type: keyof AppConfig['dateFormat']): string {
  const format = config.dateFormat[type];
  const options = type === 'withWeekday' ? config.dateFormat.options : {};
  
  return formatDate(date, format as string, options);
}
```

## 常见问题

### Q: 如何处理无效的日期输入？

A: `formatDate` 函数会自动处理无效输入，发出警告并返回当前时间的格式化字符串。

```typescript
// 无效输入示例
formatDate('invalid'); // 警告并返回当前时间
formatDate(null); // 警告并返回当前时间
formatDate(undefined); // 警告并返回当前时间
```

### Q: 如何支持更多语言环境？

A: 可以通过 `locale` 选项指定语言环境，库内置支持中文和英文。

```typescript
// 中文环境（默认）
formatDate(new Date(), 'dd', { locale: 'zh-CN' }); // "一"

// 英文环境
formatDate(new Date(), 'dd', { locale: 'en-US' }); // "Mon"
```

### Q: 如何自定义周几显示格式？

A: 使用 `weekdayFormat` 选项自定义周几前缀。

```typescript
formatDate(new Date(), 'HH:mm', { 
  showWeekday: true, 
  weekdayFormat: '星期' 
}); // "星期一 14:30"
```

### Q: 性能如何？是否适合高频调用？

A: 函数经过优化，支持高性能调用。对于高频场景，建议使用缓存机制。

### Q: 是否支持时区转换？

A: 目前支持 `local` 和 `utc` 两种时区设置。

```typescript
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss', { timeZone: 'utc' });
```

## 总结

`@planarcat/js-toolkit` 提供了强大而灵活的日期格式化功能，适用于各种开发场景。通过合理的配置和使用，可以大大提高开发效率和代码质量。