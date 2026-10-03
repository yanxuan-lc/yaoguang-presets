# Python / pip / pyenv

Python / pip / pyenv 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：pip stable、pyenv current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- pip 配置可含 index 认证 URL；netrc/keyring、site 配置、解释器/venv 根需另外配置。
- pyenv 不等于 pyenv-win；安装、wheel 构建/缓存和环境写入不是读取模板授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${PIP_CONFIG_FILE}` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| custom-cache | `${PIP_CACHE_DIR}` | directory | 是 | [资料](https://pip.pypa.io/en/stable/topics/caching/) |
| legacy-config | `~/.pip/pip.conf` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| config | `~/.config/pip/pip.conf` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| xdg-config | `${XDG_CONFIG_HOME}/pip/pip.conf` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| pyenv | `~/.pyenv` | directory | 是 | [资料](https://github.com/pyenv/pyenv) |
| custom-pyenv | `${PYENV_ROOT}` | directory | 是 | [资料](https://github.com/pyenv/pyenv) |
| mac-config | `~/Library/Application Support/pip/pip.conf` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| cache | `~/Library/Caches/pip` | directory | 是 | [资料](https://pip.pypa.io/en/stable/topics/caching/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${PIP_CONFIG_FILE}` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| custom-cache | `${PIP_CACHE_DIR}` | directory | 是 | [资料](https://pip.pypa.io/en/stable/topics/caching/) |
| legacy-config | `~/.pip/pip.conf` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| config | `~/.config/pip/pip.conf` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| xdg-config | `${XDG_CONFIG_HOME}/pip/pip.conf` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| pyenv | `~/.pyenv` | directory | 是 | [资料](https://github.com/pyenv/pyenv) |
| custom-pyenv | `${PYENV_ROOT}` | directory | 是 | [资料](https://github.com/pyenv/pyenv) |
| cache | `~/.cache/pip` | directory | 是 | [资料](https://pip.pypa.io/en/stable/topics/caching/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${PIP_CONFIG_FILE}` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| custom-cache | `${PIP_CACHE_DIR}` | directory | 是 | [资料](https://pip.pypa.io/en/stable/topics/caching/) |
| config | `${APPDATA}/pip/pip.ini` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| legacy-config | `~/pip/pip.ini` | file | 是 | [资料](https://pip.pypa.io/en/stable/topics/configuration/) |
| cache | `${LOCALAPPDATA}/pip/Cache` | directory | 是 | [资料](https://pip.pypa.io/en/stable/topics/caching/) |

维护与校验见[仓库说明](../../README.md)。
