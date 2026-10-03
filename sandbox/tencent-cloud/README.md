# 腾讯云 CLI

腾讯云 CLI 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：TCCLI current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 目录包含所有 profile 的 configure/credential 文件，递归范围可能包含多个账号。
- 认证环境变量、region/endpoint、配置写入与云 API 操作不是读取模板授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.tccli` | directory | 是 | [资料](https://cloud.tencent.com/document/product/440/34012) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.tccli` | directory | 是 | [资料](https://cloud.tencent.com/document/product/440/34012) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.tccli` | directory | 是 | [资料](https://cloud.tencent.com/document/product/440/34012) |

维护与校验见[仓库说明](../../README.md)。
