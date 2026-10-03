# Ruby / RubyGems / Bundler

Ruby / RubyGems / Bundler 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：RubyGems current、Bundler 4。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- .gem 可含 credentials 与签名私钥，Bundler config 可含 source 认证。
- GEM_PATH 列表、XDG RubyGems 和 BUNDLE_* 位置需手工核对；native extension、项目 lockfile、安装和发布独立授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| gemrc | `~/.gemrc` | file | 是 | [资料](https://guides.rubygems.org/configuration/) |
| gem-home | `~/.gem` | directory | 是 | [资料](https://guides.rubygems.org/configuration/) |
| custom-gem-home | `${GEM_HOME}` | directory | 是 | [资料](https://guides.rubygems.org/environment-variables/) |
| bundler-config | `~/.bundle/config` | file | 是 | [资料](https://guides.rubygems.org/command-reference/bundle-config/) |
| bundler-cache | `~/.bundle/cache` | directory | 是 | [资料](https://guides.rubygems.org/command-reference/bundle-config/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| gemrc | `~/.gemrc` | file | 是 | [资料](https://guides.rubygems.org/configuration/) |
| gem-home | `~/.gem` | directory | 是 | [资料](https://guides.rubygems.org/configuration/) |
| custom-gem-home | `${GEM_HOME}` | directory | 是 | [资料](https://guides.rubygems.org/environment-variables/) |
| bundler-config | `~/.bundle/config` | file | 是 | [资料](https://guides.rubygems.org/command-reference/bundle-config/) |
| bundler-cache | `~/.bundle/cache` | directory | 是 | [资料](https://guides.rubygems.org/command-reference/bundle-config/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| gemrc | `~/.gemrc` | file | 是 | [资料](https://guides.rubygems.org/configuration/) |
| gem-home | `~/.gem` | directory | 是 | [资料](https://guides.rubygems.org/configuration/) |
| custom-gem-home | `${GEM_HOME}` | directory | 是 | [资料](https://guides.rubygems.org/environment-variables/) |
| bundler-config | `~/.bundle/config` | file | 是 | [资料](https://guides.rubygems.org/command-reference/bundle-config/) |
| bundler-cache | `~/.bundle/cache` | directory | 是 | [资料](https://guides.rubygems.org/command-reference/bundle-config/) |

维护与校验见[仓库说明](../../README.md)。
