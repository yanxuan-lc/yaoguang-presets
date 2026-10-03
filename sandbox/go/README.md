# Go

Go 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Go current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- GOPATH 列表不拆分；GOMODCACHE/GOENV/GOBIN、非标准工具安装需要手工补。
- GOENV 可含认证 proxy URL；GOAUTH/netrc/helper、module 锁与下载/构建写入分别处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| module-cache | `~/go/pkg/mod` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| gopath-module-cache | `${GOPATH}/pkg/mod` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| toolchain | `${GOROOT}` | directory | 未声明 | [资料](https://pkg.go.dev/cmd/go) |
| custom-build-cache | `${GOCACHE}` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| config | `~/Library/Application Support/go/env` | file | 是 | [资料](https://pkg.go.dev/cmd/go) |
| build-cache | `~/Library/Caches/go-build` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| module-cache | `~/go/pkg/mod` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| gopath-module-cache | `${GOPATH}/pkg/mod` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| toolchain | `${GOROOT}` | directory | 未声明 | [资料](https://pkg.go.dev/cmd/go) |
| custom-build-cache | `${GOCACHE}` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| config | `~/.config/go/env` | file | 是 | [资料](https://pkg.go.dev/cmd/go) |
| xdg-config | `${XDG_CONFIG_HOME}/go/env` | file | 是 | [资料](https://pkg.go.dev/cmd/go) |
| build-cache | `~/.cache/go-build` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| module-cache | `~/go/pkg/mod` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| gopath-module-cache | `${GOPATH}/pkg/mod` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| toolchain | `${GOROOT}` | directory | 未声明 | [资料](https://pkg.go.dev/cmd/go) |
| custom-build-cache | `${GOCACHE}` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |
| config | `${APPDATA}/go/env` | file | 是 | [资料](https://pkg.go.dev/cmd/go) |
| build-cache | `${LOCALAPPDATA}/go-build` | directory | 是 | [资料](https://pkg.go.dev/cmd/go) |

维护与校验见[仓库说明](../../README.md)。
