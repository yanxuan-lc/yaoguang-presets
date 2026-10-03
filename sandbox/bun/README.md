# Bun

Bun 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Bun current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- bunfig/npmrc 可含 registry 凭据；BUN_INSTALL、cache/globalDir/bin 等覆盖需手工补实际路径。
- run 与包管理全局配置加载不同；自动安装、下载及锁文件写入另行核对。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| install | `~/.bun` | directory | 是 | [资料](https://bun.com/docs/pm/global-cache) |
| user-config | `~/.bunfig.toml` | file | 是 | [资料](https://bun.com/docs/runtime/bunfig) |
| xdg-config | `${XDG_CONFIG_HOME}/.bunfig.toml` | file | 是 | [资料](https://bun.com/docs/runtime/bunfig) |
| npmrc | `~/.npmrc` | file | 是 | [资料](https://bun.com/docs/pm/npmrc) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| install | `~/.bun` | directory | 是 | [资料](https://bun.com/docs/pm/global-cache) |
| user-config | `~/.bunfig.toml` | file | 是 | [资料](https://bun.com/docs/runtime/bunfig) |
| xdg-config | `${XDG_CONFIG_HOME}/.bunfig.toml` | file | 是 | [资料](https://bun.com/docs/runtime/bunfig) |
| npmrc | `~/.npmrc` | file | 是 | [资料](https://bun.com/docs/pm/npmrc) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| install | `~/.bun` | directory | 是 | [资料](https://bun.com/docs/pm/global-cache) |
| user-config | `~/.bunfig.toml` | file | 是 | [资料](https://bun.com/docs/runtime/bunfig) |
| xdg-config | `${XDG_CONFIG_HOME}/.bunfig.toml` | file | 是 | [资料](https://bun.com/docs/runtime/bunfig) |
| npmrc | `~/.npmrc` | file | 是 | [资料](https://bun.com/docs/pm/npmrc) |

维护与校验见[仓库说明](../../README.md)。
