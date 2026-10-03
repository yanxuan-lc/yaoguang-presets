# Homebrew

Homebrew 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Homebrew current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- prefix 是宽读取候选，可能含其他安装/认证数据；HOMEBREW_PREFIX/CACHE 与非标准路径手工核对。
- 已装工具运行不等于 brew install/update；安装、链接、缓存与下载另行授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| arm-prefix | `/opt/homebrew` | directory | 是 | [资料](https://docs.brew.sh/Manpage) |
| intel-prefix | `/usr/local` | directory | 是 | [资料](https://docs.brew.sh/Manpage) |
| cache | `~/Library/Caches/Homebrew` | directory | 是 | [资料](https://docs.brew.sh/Manpage) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| prefix | `/home/linuxbrew/.linuxbrew` | directory | 是 | [资料](https://docs.brew.sh/Manpage) |
| cache | `~/.cache/Homebrew` | directory | 是 | [资料](https://docs.brew.sh/Manpage) |
| xdg-cache | `${XDG_CACHE_HOME}/Homebrew` | directory | 是 | [资料](https://docs.brew.sh/Manpage) |

维护与校验见[仓库说明](../../README.md)。
