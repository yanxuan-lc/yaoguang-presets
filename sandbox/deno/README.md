# Deno

Deno 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Deno current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 官方脚本安装的程序位置；其他 package manager 安装位置由对应工具决定。
- DENO_INSTALL/DENO_DIR 不在当前变量语法中，覆盖位置需手工补；私有模块、Deno 自身权限、依赖下载与缓存写入另行处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| binary | `~/.deno/bin` | directory | 未声明 | [资料](https://docs.deno.com/runtime/getting_started/installation/) |
| cache | `~/Library/Caches/deno` | directory | 是 | [资料](https://docs.deno.com/runtime/getting_started/installation/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| binary | `~/.deno/bin` | directory | 未声明 | [资料](https://docs.deno.com/runtime/getting_started/installation/) |
| cache | `~/.cache/deno` | directory | 是 | [资料](https://docs.deno.com/runtime/getting_started/installation/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| binary | `~/.deno/bin` | directory | 未声明 | [资料](https://docs.deno.com/runtime/getting_started/installation/) |
| cache | `${LOCALAPPDATA}/deno` | directory | 是 | [资料](https://docs.deno.com/runtime/getting_started/installation/) |

维护与校验见[仓库说明](../../README.md)。
