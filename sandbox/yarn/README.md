# Yarn

Yarn 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Yarn Berry current、Yarn Classic 1。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 现代配置可能含 npmAuthToken；Classic 的完整认证加载序列尚未验证，可能另需 npmrc。
- globalFolder/cacheFolder/YARN_CACHE_FOLDER、项目 linker、包脚本和构建写入另外处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| modern-config | `~/.yarnrc.yml` | file | 是 | [资料](https://yarnpkg.com/configuration/yarnrc) |
| classic-config | `~/.yarnrc` | file | 是 | [资料](https://classic.yarnpkg.com/en/docs/yarnrc/) |
| berry | `~/.yarn/berry` | directory | 是 | [资料](https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-core/sources/folderUtils.ts) |
| xdg-berry | `${XDG_DATA_HOME}/yarn/berry` | directory | 是 | [资料](https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-core/sources/folderUtils.ts) |
| classic-cache | `~/Library/Caches/Yarn` | directory | 是 | [资料](https://github.com/yarnpkg/yarn/blob/master/src/util/user-dirs.js) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| modern-config | `~/.yarnrc.yml` | file | 是 | [资料](https://yarnpkg.com/configuration/yarnrc) |
| classic-config | `~/.yarnrc` | file | 是 | [资料](https://classic.yarnpkg.com/en/docs/yarnrc/) |
| berry | `~/.yarn/berry` | directory | 是 | [资料](https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-core/sources/folderUtils.ts) |
| xdg-berry | `${XDG_DATA_HOME}/yarn/berry` | directory | 是 | [资料](https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-core/sources/folderUtils.ts) |
| classic-cache | `~/.cache/yarn` | directory | 是 | [资料](https://github.com/yarnpkg/yarn/blob/master/src/util/user-dirs.js) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| modern-config | `~/.yarnrc.yml` | file | 是 | [资料](https://yarnpkg.com/configuration/yarnrc) |
| classic-config | `~/.yarnrc` | file | 是 | [资料](https://classic.yarnpkg.com/en/docs/yarnrc/) |
| berry | `${LOCALAPPDATA}/Yarn/Berry` | directory | 是 | [资料](https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-core/sources/folderUtils.ts) |
| classic-cache | `${LOCALAPPDATA}/Yarn/Cache` | directory | 是 | [资料](https://github.com/yarnpkg/yarn/blob/master/src/util/user-dirs.js) |

维护与校验见[仓库说明](../../README.md)。
