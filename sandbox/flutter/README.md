# Dart / Flutter

Dart / Flutter 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Dart current、Flutter current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- Flutter SDK 是自选安装路径，不将官方示例当唯一默认；手工补真实 SDK。
- pub cache 可含私有包与旧认证残留；当前 Dart 认证另在用户配置根。
- Flutter 会写 SDK/bin/cache/lockfile；Android/iOS 继承工具链和服务需求。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-pub-cache | `${PUB_CACHE}` | directory | 是 | [资料](https://dart.dev/tools/pub/environment-variables) |
| pub-cache | `~/.pub-cache` | directory | 是 | [资料](https://dart.dev/tools/pub/environment-variables) |
| dart-config | `~/Library/Application Support/dart` | directory | 是 | [资料](https://github.com/dart-lang/pub/blob/master/doc/cache_layout.md) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-pub-cache | `${PUB_CACHE}` | directory | 是 | [资料](https://dart.dev/tools/pub/environment-variables) |
| pub-cache | `~/.pub-cache` | directory | 是 | [资料](https://dart.dev/tools/pub/environment-variables) |
| dart-config | `~/.config/dart` | directory | 是 | [资料](https://github.com/dart-lang/pub/blob/master/doc/cache_layout.md) |
| xdg-dart-config | `${XDG_CONFIG_HOME}/dart` | directory | 是 | [资料](https://github.com/dart-lang/pub/blob/master/doc/cache_layout.md) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-pub-cache | `${PUB_CACHE}` | directory | 是 | [资料](https://dart.dev/tools/pub/environment-variables) |
| pub-cache | `${LOCALAPPDATA}/Pub/Cache` | directory | 是 | [资料](https://dart.dev/tools/pub/environment-variables) |
| dart-config | `${APPDATA}/dart` | directory | 是 | [资料](https://github.com/dart-lang/pub/blob/master/doc/cache_layout.md) |

维护与校验见[仓库说明](../../README.md)。
