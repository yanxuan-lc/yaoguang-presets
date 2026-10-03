# Node.js 与版本管理器

Node.js 与版本管理器 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Node.js current、nvm/Volta/fnm current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 安装根包含可执行程序和附属用户配置，不保证无敏感数据。
- 平台 fnm 默认目录未猜测；NODE_PATH、额外 CA、应用资源、包管理认证及非标准安装路径需手工核对。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| volta | `~/.volta` | directory | 是 | [资料](https://docs.volta.sh/advanced/installers) |
| custom-volta | `${VOLTA_HOME}` | directory | 是 | [资料](https://docs.volta.sh/reference/environment) |
| custom-fnm | `${FNM_DIR}` | directory | 是 | [资料](https://github.com/Schniz/fnm) |
| nvm | `~/.nvm` | directory | 是 | [资料](https://github.com/nvm-sh/nvm) |
| custom-nvm | `${NVM_DIR}` | directory | 是 | [资料](https://github.com/nvm-sh/nvm) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| volta | `~/.volta` | directory | 是 | [资料](https://docs.volta.sh/advanced/installers) |
| custom-volta | `${VOLTA_HOME}` | directory | 是 | [资料](https://docs.volta.sh/reference/environment) |
| custom-fnm | `${FNM_DIR}` | directory | 是 | [资料](https://github.com/Schniz/fnm) |
| nvm | `~/.nvm` | directory | 是 | [资料](https://github.com/nvm-sh/nvm) |
| custom-nvm | `${NVM_DIR}` | directory | 是 | [资料](https://github.com/nvm-sh/nvm) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| volta | `${LOCALAPPDATA}/Volta` | directory | 是 | [资料](https://docs.volta.sh/advanced/installers) |
| custom-volta | `${VOLTA_HOME}` | directory | 是 | [资料](https://docs.volta.sh/reference/environment) |
| custom-fnm | `${FNM_DIR}` | directory | 是 | [资料](https://github.com/Schniz/fnm) |

维护与校验见[仓库说明](../../README.md)。
