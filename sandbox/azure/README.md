# Azure CLI

Azure CLI 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Azure CLI current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 现代 MSAL cache 的平台加密不同，不依赖旧 accessTokens.json 假设。
- 认证刷新、日志、登录与云 API 操作需要各自写/网络及业务许可。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.azure` | directory | 是 | [资料](https://learn.microsoft.com/en-us/cli/azure/msal-based-azure-cli) |
| custom-config | `${AZURE_CONFIG_DIR}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/cli/azure/azure-cli-configuration) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.azure` | directory | 是 | [资料](https://learn.microsoft.com/en-us/cli/azure/msal-based-azure-cli) |
| custom-config | `${AZURE_CONFIG_DIR}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/cli/azure/azure-cli-configuration) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.azure` | directory | 是 | [资料](https://learn.microsoft.com/en-us/cli/azure/msal-based-azure-cli) |
| custom-config | `${AZURE_CONFIG_DIR}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/cli/azure/azure-cli-configuration) |

维护与校验见[仓库说明](../../README.md)。
