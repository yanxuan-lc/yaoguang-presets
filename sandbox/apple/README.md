# Apple / Xcode / CocoaPods

Apple / Xcode / CocoaPods 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Xcode current、CocoaPods current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- 标准位置不是唯一路径；selected developer directory、重命名 Xcode 与 CP_HOME_DIR 需手工补。
- xcrun 临时写、签名/keychain、设备/模拟器、pod install 的写入/网络另行处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| xcode | `/Applications/Xcode.app` | directory | 未声明 | [资料](https://developer.apple.com/library/archive/technotes/tn2339/_index.html) |
| command-line-tools | `/Library/Developer/CommandLineTools` | directory | 未声明 | [资料](https://developer.apple.com/library/archive/technotes/tn2339/_index.html) |
| pods-repositories | `~/.cocoapods` | directory | 是 | [资料](https://guides.cocoapods.org/terminal/commands.html) |
| pods-cache | `~/Library/Caches/CocoaPods` | directory | 是 | [资料](https://guides.cocoapods.org/using/faq.html) |

维护与校验见[仓库说明](../../README.md)。
