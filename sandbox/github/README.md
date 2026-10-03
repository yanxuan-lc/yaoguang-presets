# GitHub CLI

GitHub CLI 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：GitHub CLI current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- hosts.yml 可包含 token；keychain/系统 credential store 及 token 环境变量不是目录可读权限。
- clone/checkout 另需 Git；GitHub Packages 与 ghcr 的客户端认证分别处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${GH_CONFIG_DIR}` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |
| config | `~/.config/gh` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |
| xdg-config | `${XDG_CONFIG_HOME}/gh` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${GH_CONFIG_DIR}` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |
| config | `~/.config/gh` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |
| xdg-config | `${XDG_CONFIG_HOME}/gh` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${GH_CONFIG_DIR}` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |
| config | `${APPDATA}/GitHub CLI` | directory | 是 | [资料](https://cli.github.com/manual/gh_help_environment) |

维护与校验见[仓库说明](../../README.md)。
