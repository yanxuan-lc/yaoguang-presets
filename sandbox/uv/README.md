# uv

uv 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：uv current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- data 根含默认 credentials/credentials.toml，不是纯工具缓存；native store preview 和 netrc 另外核对。
- uv 即使 no-cache 也使用临时 cache；sync/install/python/tool 安装仍需写入许可。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${UV_CONFIG_FILE}` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-cache | `${UV_CACHE_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-python | `${UV_PYTHON_INSTALL_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-tools | `${UV_TOOL_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-credentials | `${UV_CREDENTIALS_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| config | `~/.config/uv/uv.toml` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| xdg-config | `${XDG_CONFIG_HOME}/uv/uv.toml` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| data | `~/.local/share/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| xdg-data | `${XDG_DATA_HOME}/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| cache | `~/.cache/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| xdg-cache | `${XDG_CACHE_HOME}/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${UV_CONFIG_FILE}` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-cache | `${UV_CACHE_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-python | `${UV_PYTHON_INSTALL_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-tools | `${UV_TOOL_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-credentials | `${UV_CREDENTIALS_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| config | `~/.config/uv/uv.toml` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| xdg-config | `${XDG_CONFIG_HOME}/uv/uv.toml` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| data | `~/.local/share/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| xdg-data | `${XDG_DATA_HOME}/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| cache | `~/.cache/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| xdg-cache | `${XDG_CACHE_HOME}/uv` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${UV_CONFIG_FILE}` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-cache | `${UV_CACHE_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-python | `${UV_PYTHON_INSTALL_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-tools | `${UV_TOOL_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| custom-credentials | `${UV_CREDENTIALS_DIR}` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| config | `${APPDATA}/uv/uv.toml` | file | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| data | `${APPDATA}/uv/data` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |
| cache | `${LOCALAPPDATA}/uv/cache` | directory | 是 | [资料](https://docs.astral.sh/uv/reference/storage/) |

维护与校验见[仓库说明](../../README.md)。
