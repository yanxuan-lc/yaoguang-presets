# Conda

Conda 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Conda 26.9.1。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- channels 可含认证 URL；系统/CONDA_ROOT/CONDARC 配置及安装根 pkgs/envs 需手工补，不猜 miniconda/anaconda 位置。
- 活动环境可能含私有包与配置；环境创建、缓存和 channel 连接仍需各自权限。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-config | `~/.condarc` | file | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| config-dir | `~/.config/conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| xdg-config | `${XDG_CONFIG_HOME}/conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| legacy-config | `~/.conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| active-environment | `${CONDA_PREFIX}` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-config | `~/.condarc` | file | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| config-dir | `~/.config/conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| xdg-config | `${XDG_CONFIG_HOME}/conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| legacy-config | `~/.conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| active-environment | `${CONDA_PREFIX}` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-config | `~/.condarc` | file | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| config-dir | `~/.config/conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| xdg-config | `${XDG_CONFIG_HOME}/conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| legacy-config | `~/.conda` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |
| active-environment | `${CONDA_PREFIX}` | directory | 是 | [资料](https://docs.conda.io/projects/conda/en/stable/user-guide/configuration/use-condarc.html) |

维护与校验见[仓库说明](../../README.md)。
