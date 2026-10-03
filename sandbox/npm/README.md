# npm

npm 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：npm 12。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- npmrc 可含 token、密码及证书位置；userconfig/globalconfig/prefix/cache 可覆盖，当前定位语法不自动探测。
- npmjs、GitHub Packages 和企业 registry 按实际 scope 配置；install/login/publish 与日志写入、网络独立授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-config | `~/.npmrc` | file | 是 | [资料](https://docs.npmjs.com/cli/v12/configuring-npm/npmrc/) |
| cache | `~/.npm` | directory | 是 | [资料](https://docs.npmjs.com/cli/v12/using-npm/config/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-config | `~/.npmrc` | file | 是 | [资料](https://docs.npmjs.com/cli/v12/configuring-npm/npmrc/) |
| cache | `~/.npm` | directory | 是 | [资料](https://docs.npmjs.com/cli/v12/using-npm/config/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| user-config | `~/.npmrc` | file | 是 | [资料](https://docs.npmjs.com/cli/v12/configuring-npm/npmrc/) |
| cache | `${LOCALAPPDATA}/npm-cache` | directory | 是 | [资料](https://docs.npmjs.com/cli/v12/using-npm/config/) |

维护与校验见[仓库说明](../../README.md)。
