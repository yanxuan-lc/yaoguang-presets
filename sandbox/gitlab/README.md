# GitLab CLI

GitLab CLI 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：GitLab CLI current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 当前默认 keyring，无 keyring 或 insecure-storage 时配置可含明文凭据。
- 未声明未核定的缓存目录；Git、认证 helper、API 及登录写入单独处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| legacy-config | `~/.config/glab-cli/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |
| custom-config | `${GLAB_CONFIG_DIR}/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |
| config | `~/Library/Application Support/glab-cli/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| legacy-config | `~/.config/glab-cli/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |
| custom-config | `${GLAB_CONFIG_DIR}/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |
| xdg-config | `${XDG_CONFIG_HOME}/glab-cli/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| legacy-config | `~/.config/glab-cli/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |
| custom-config | `${GLAB_CONFIG_DIR}/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |
| config | `${LOCALAPPDATA}/glab-cli/config.yml` | file | 是 | [资料](https://docs.gitlab.com/cli/configuration/) |

维护与校验见[仓库说明](../../README.md)。
