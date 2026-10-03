# Terraform

Terraform 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Terraform current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- CLI config 可含 credentials/helper；plugin_cache_dir 是显式配置，不声明一个默认开启的缓存。
- 自定义 helper、项目 .terraform/state/锁、provider 下载和 backend 修改单独处理。
- Windows login 文件位置以命令提示核对后手工补充；不套用 Unix .terraform.d。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${TF_CLI_CONFIG_FILE}` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |
| credentials | `~/.terraform.d/credentials.tfrc.json` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |
| config | `~/.terraformrc` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${TF_CLI_CONFIG_FILE}` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |
| credentials | `~/.terraform.d/credentials.tfrc.json` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |
| config | `~/.terraformrc` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${TF_CLI_CONFIG_FILE}` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |
| config | `${APPDATA}/terraform.rc` | file | 是 | [资料](https://developer.hashicorp.com/terraform/cli/config/config-file) |

维护与校验见[仓库说明](../../README.md)。
