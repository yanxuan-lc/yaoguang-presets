# pnpm

pnpm 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：pnpm 11.13.1。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 配置根内 auth.ini 和 config.yaml structured _auth 均可含认证；不能按最新网页替代 11.13.1 源码。
- 未声明 configDir/rc；storeDir、跨盘 store、userconfig 及 setup 写 shell 配置需另核对。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-npmrc | `~/.npmrc` | file | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/loadNpmrcFiles.ts) |
| xdg-config | `${XDG_CONFIG_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| custom-home | `${PNPM_HOME}` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-data | `${XDG_DATA_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-cache | `${XDG_CACHE_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-state | `${XDG_STATE_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| config | `~/Library/Preferences/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| data | `~/Library/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| cache | `~/Library/Caches/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| state | `~/.local/state/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-npmrc | `~/.npmrc` | file | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/loadNpmrcFiles.ts) |
| xdg-config | `${XDG_CONFIG_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| custom-home | `${PNPM_HOME}` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-data | `${XDG_DATA_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-cache | `${XDG_CACHE_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-state | `${XDG_STATE_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| config | `~/.config/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| data | `~/.local/share/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| cache | `~/.cache/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| state | `~/.local/state/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-npmrc | `~/.npmrc` | file | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/loadNpmrcFiles.ts) |
| xdg-config | `${XDG_CONFIG_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| custom-home | `${PNPM_HOME}` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-data | `${XDG_DATA_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-cache | `${XDG_CACHE_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| xdg-state | `${XDG_STATE_HOME}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| config | `${LOCALAPPDATA}/pnpm/config` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| data | `${LOCALAPPDATA}/pnpm` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| cache | `${LOCALAPPDATA}/pnpm-cache` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |
| state | `${LOCALAPPDATA}/pnpm-state` | directory | 是 | [资料](https://github.com/pnpm/pnpm/blob/v11.13.1/pnpm11/config/reader/src/dirs.ts) |

维护与校验见[仓库说明](../../README.md)。
