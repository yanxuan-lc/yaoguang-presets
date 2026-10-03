# Poetry

Poetry 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Poetry 2.5。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 配置可含 auth.toml，keyring 访问另行处理。
- POETRY_DATA_DIR/POETRY_HOME 与自定义虚拟环境不由配置根完整涵盖；安装和创建环境写入另行授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${POETRY_CONFIG_DIR}` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| custom-cache | `${POETRY_CACHE_DIR}` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| config | `~/Library/Application Support/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| cache | `~/Library/Caches/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${POETRY_CONFIG_DIR}` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| custom-cache | `${POETRY_CACHE_DIR}` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| config | `~/.config/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| xdg-config | `${XDG_CONFIG_HOME}/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| cache | `~/.cache/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| xdg-cache | `${XDG_CACHE_HOME}/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-config | `${POETRY_CONFIG_DIR}` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| custom-cache | `${POETRY_CACHE_DIR}` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| config | `${APPDATA}/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |
| cache | `${LOCALAPPDATA}/pypoetry` | directory | 是 | [资料](https://python-poetry.org/docs/configuration/) |

维护与校验见[仓库说明](../../README.md)。
