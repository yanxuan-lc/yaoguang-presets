# .NET / NuGet

.NET / NuGet 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：.NET current、NuGet current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- NuGet.Config 可含私有 feed 凭据；系统 SDK、DOTNET_CLI_HOME、HTTP/plugin cache 环境覆盖和 scratch 锁目录需手工补。
- build/test 常隐含 restore；首次运行、锁、workloads 下载和 packages 写入独立处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| packages | `~/.nuget/packages` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| custom-packages | `${NUGET_PACKAGES}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| custom-sdk | `${DOTNET_ROOT}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables) |
| config | `~/.nuget/NuGet/NuGet.Config` | file | 是 | [资料](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file) |
| mono-config | `~/.config/NuGet` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior) |
| http-cache | `~/.local/share/NuGet/v3-cache` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| plugin-cache | `~/.local/share/NuGet/plugins-cache` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| script-sdk | `~/.dotnet` | directory | 是 | [资料](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| packages | `~/.nuget/packages` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| custom-packages | `${NUGET_PACKAGES}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| custom-sdk | `${DOTNET_ROOT}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables) |
| config | `~/.nuget/NuGet/NuGet.Config` | file | 是 | [资料](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file) |
| mono-config | `~/.config/NuGet` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior) |
| http-cache | `~/.local/share/NuGet/v3-cache` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| plugin-cache | `~/.local/share/NuGet/plugins-cache` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| script-sdk | `~/.dotnet` | directory | 是 | [资料](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| packages | `~/.nuget/packages` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| custom-packages | `${NUGET_PACKAGES}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| custom-sdk | `${DOTNET_ROOT}` | directory | 是 | [资料](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables) |
| config | `${APPDATA}/NuGet/NuGet.Config` | file | 是 | [资料](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file) |
| http-cache | `${LOCALAPPDATA}/NuGet/v3-cache` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| plugin-cache | `${LOCALAPPDATA}/NuGet/plugins-cache` | directory | 是 | [资料](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders) |
| script-sdk | `${LOCALAPPDATA}/Microsoft/dotnet` | directory | 是 | [资料](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script) |

维护与校验见[仓库说明](../../README.md)。
