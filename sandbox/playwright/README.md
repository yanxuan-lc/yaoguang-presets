# Playwright

Playwright 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Playwright current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- PLAYWRIGHT_BROWSERS_PATH=0 等非路径值不适用此定位式，需使用项目实际目录。
- 不授权个人浏览器 profile；install、测试 profile/产物写入、应用连接和监听独立处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-browsers | `${PLAYWRIGHT_BROWSERS_PATH}` | directory | 未声明 | [资料](https://playwright.dev/docs/browsers) |
| browsers | `~/Library/Caches/ms-playwright` | directory | 未声明 | [资料](https://playwright.dev/docs/browsers) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-browsers | `${PLAYWRIGHT_BROWSERS_PATH}` | directory | 未声明 | [资料](https://playwright.dev/docs/browsers) |
| browsers | `~/.cache/ms-playwright` | directory | 未声明 | [资料](https://playwright.dev/docs/browsers) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-browsers | `${PLAYWRIGHT_BROWSERS_PATH}` | directory | 未声明 | [资料](https://playwright.dev/docs/browsers) |
| browsers | `${LOCALAPPDATA}/ms-playwright` | directory | 未声明 | [资料](https://playwright.dev/docs/browsers) |

维护与校验见[仓库说明](../../README.md)。
