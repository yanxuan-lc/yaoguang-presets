# Android SDK

Android SDK 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Android SDK tools current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 用户根可含 adb 身份、AVD 和配置；ANDROID_AVD_HOME/EMULATOR_HOME、旧 SDK_HOME 和非标准 SDK 需手工补。
- 还需 Java/Gradle；设备、adb、模拟器、SDK 下载和镜像/状态写入单独处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| sdk | `${ANDROID_HOME}` | directory | 是 | [资料](https://developer.android.com/tools/variables) |
| user-home | `~/.android` | directory | 是 | [资料](https://developer.android.com/tools/variables) |
| custom-user-home | `${ANDROID_USER_HOME}` | directory | 是 | [资料](https://developer.android.com/tools/variables) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| sdk | `${ANDROID_HOME}` | directory | 是 | [资料](https://developer.android.com/tools/variables) |
| user-home | `~/.android` | directory | 是 | [资料](https://developer.android.com/tools/variables) |
| custom-user-home | `${ANDROID_USER_HOME}` | directory | 是 | [资料](https://developer.android.com/tools/variables) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| sdk | `${ANDROID_HOME}` | directory | 是 | [资料](https://developer.android.com/tools/variables) |
| user-home | `~/.android` | directory | 是 | [资料](https://developer.android.com/tools/variables) |
| custom-user-home | `${ANDROID_USER_HOME}` | directory | 是 | [资料](https://developer.android.com/tools/variables) |

维护与校验见[仓库说明](../../README.md)。
