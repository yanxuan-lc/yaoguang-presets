# AWS CLI

AWS CLI 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：AWS CLI 2 current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- config 也可能含凭据；角色、credential_process、认证环境变量、SSO 及服务 endpoint 额外核对。
- 认证刷新可能写缓存；读取模板不授予云 API 操作。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.aws/config` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| credentials | `~/.aws/credentials` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| custom-config | `${AWS_CONFIG_FILE}` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| custom-credentials | `${AWS_SHARED_CREDENTIALS_FILE}` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| sso-cache | `~/.aws/sso/cache` | directory | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| cli-cache | `~/.aws/cli/cache` | directory | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.aws/config` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| credentials | `~/.aws/credentials` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| custom-config | `${AWS_CONFIG_FILE}` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| custom-credentials | `${AWS_SHARED_CREDENTIALS_FILE}` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| sso-cache | `~/.aws/sso/cache` | directory | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| cli-cache | `~/.aws/cli/cache` | directory | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.aws/config` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| credentials | `~/.aws/credentials` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| custom-config | `${AWS_CONFIG_FILE}` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| custom-credentials | `${AWS_SHARED_CREDENTIALS_FILE}` | file | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| sso-cache | `~/.aws/sso/cache` | directory | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |
| cli-cache | `~/.aws/cli/cache` | directory | 是 | [资料](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) |

维护与校验见[仓库说明](../../README.md)。
