# Git

Git 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Git current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- include/includeIf、GIT_CONFIG_GLOBAL/SYSTEM、系统前缀及签名/helper 的额外文件需手工补充；不读取正文追踪 include。
- credential-store 文件包含明文凭据；helper、keychain、远程连接与仓库写入仍需其他权限。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| global-config | `~/.gitconfig` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| xdg-config | `~/.config/git/config` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| custom-xdg-config | `${XDG_CONFIG_HOME}/git/config` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| credentials | `~/.git-credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |
| xdg-credentials | `~/.config/git/credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |
| custom-xdg-credentials | `${XDG_CONFIG_HOME}/git/credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| global-config | `~/.gitconfig` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| xdg-config | `~/.config/git/config` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| custom-xdg-config | `${XDG_CONFIG_HOME}/git/config` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| credentials | `~/.git-credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |
| xdg-credentials | `~/.config/git/credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |
| custom-xdg-credentials | `${XDG_CONFIG_HOME}/git/credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| global-config | `~/.gitconfig` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| xdg-config | `~/.config/git/config` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| custom-xdg-config | `${XDG_CONFIG_HOME}/git/config` | file | 是 | [资料](https://git-scm.com/docs/git-config) |
| credentials | `~/.git-credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |
| xdg-credentials | `~/.config/git/credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |
| custom-xdg-credentials | `${XDG_CONFIG_HOME}/git/credentials` | file | 是 | [资料](https://git-scm.com/docs/git-credential-store) |

维护与校验见[仓库说明](../../README.md)。
