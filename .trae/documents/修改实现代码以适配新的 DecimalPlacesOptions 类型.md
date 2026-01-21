## 修改计划

### 1. 重新设计类型定义
- 将 `DecimalPlacesOptions` 改为常量枚举，保持传参简洁性
- 确保 TypeScript 提示显示为 `number | RETAIN_ALL_DECIMAL_PLACES`

### 2. 修改 toFormattedNumber.ts 文件
- 更新类型检查逻辑，确保正确处理新的类型定义

### 3. 修改 toFormattedNumberString.ts 文件
- 更新类型检查逻辑，确保正确处理新的类型定义

### 4. 保持原有 API 兼容性
- 确保 `{ decimalPlaces: 2 }` 和 `{ decimalPlaces: RETAIN_ALL_DECIMAL_PLACES }` 都能正常工作

### 5. 更新常量定义
- 确保 `RETAIN_ALL_DECIMAL_PLACES` 常量的定义和使用一致

## 预期效果
- 传参保持简洁：`{ decimalPlaces: 2 }` 或 `{ decimalPlaces: RETAIN_ALL_DECIMAL_PLACES }`
- TypeScript 提示显示为 `number | RETAIN_ALL_DECIMAL_PLACES`
- 保持原有功能不变
- 提供更好的类型安全性和语义化

## 使用示例
```typescript
// 保留所有小数位
const options1 = { decimalPlaces: RETAIN_ALL_DECIMAL_PLACES };

// 保留2位小数
const options2 = { decimalPlaces: 2 };
```