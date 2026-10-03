# Docker / Compose

Docker / Compose 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Docker CLI current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 配置根可含 auths、context 证书和认证；credential helper 的权限不是目录权限。
- daemon/socket 可操作沙箱外资源；选择此模板不授予连接 daemon、build/run/push/login 或网络许可。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.docker` | directory | 是 | [资料](https://docs.docker.com/reference/cli/docker/) |
| custom-config | `${DOCKER_CONFIG}` | directory | 是 | [资料](https://docs.docker.com/reference/cli/docker/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.docker` | directory | 是 | [资料](https://docs.docker.com/reference/cli/docker/) |
| custom-config | `${DOCKER_CONFIG}` | directory | 是 | [资料](https://docs.docker.com/reference/cli/docker/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.docker` | directory | 是 | [资料](https://docs.docker.com/reference/cli/docker/) |
| custom-config | `${DOCKER_CONFIG}` | directory | 是 | [资料](https://docs.docker.com/reference/cli/docker/) |

维护与校验见[仓库说明](../../README.md)。
