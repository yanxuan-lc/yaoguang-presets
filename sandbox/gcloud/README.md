# Google Cloud CLI

Google Cloud CLI 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Google Cloud CLI current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- CLI login 与应用 ADC 不等价；GOOGLE_APPLICATION_CREDENTIALS 外部文件未自动纳入。
- 官方要求配置根可写；本模板仅读取，登录/刷新/日志与 API 连接需相应权限。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${CLOUDSDK_CONFIG}` | directory | 是 | [资料](https://docs.cloud.google.com/sdk/docs/configurations) |
| config | `~/.config/gcloud` | directory | 是 | [资料](https://docs.cloud.google.com/sdk/docs/configurations) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${CLOUDSDK_CONFIG}` | directory | 是 | [资料](https://docs.cloud.google.com/sdk/docs/configurations) |
| config | `~/.config/gcloud` | directory | 是 | [资料](https://docs.cloud.google.com/sdk/docs/configurations) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${CLOUDSDK_CONFIG}` | directory | 是 | [资料](https://docs.cloud.google.com/sdk/docs/configurations) |
| config | `${APPDATA}/gcloud` | directory | 是 | [资料](https://docs.cloud.google.com/sdk/docs/configurations) |

维护与校验见[仓库说明](../../README.md)。
