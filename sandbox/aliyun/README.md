# 阿里云 CLI

阿里云 CLI 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Alibaba Cloud CLI current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- profile 可含 AK/STS/OAuth 凭据；自定义配置与 credential process/URI 依赖手工补。
- OAuth 刷新、配置更新、endpoint 连接和云 API 操作另行授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.aliyun/config.json` | file | 是 | [资料](https://github.com/aliyun/aliyun-cli/blob/master/docs/en/configuration.md) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.aliyun/config.json` | file | 是 | [资料](https://github.com/aliyun/aliyun-cli/blob/master/docs/en/configuration.md) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.aliyun/config.json` | file | 是 | [资料](https://github.com/aliyun/aliyun-cli/blob/master/docs/en/configuration.md) |

维护与校验见[仓库说明](../../README.md)。
