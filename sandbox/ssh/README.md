# OpenSSH

OpenSSH 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：OpenSSH current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 整个 .ssh 是宽读取候选，递归包含所有私钥、配置与 known_hosts；应用前核对授权范围。
- Include、IdentityFile、-F 和自定义 known_hosts 文件需手工补充；agent/socket、硬件/系统密钥链、连接和写入另行处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-home | `~/.ssh` | directory | 是 | [资料](https://man.openbsd.org/ssh_config) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-home | `~/.ssh` | directory | 是 | [资料](https://man.openbsd.org/ssh_config) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-home | `~/.ssh` | directory | 是 | [资料](https://man.openbsd.org/ssh_config) |

维护与校验见[仓库说明](../../README.md)。
