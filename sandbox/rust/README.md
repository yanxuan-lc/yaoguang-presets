# Rust / Cargo / rustup

Rust / Cargo / rustup 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Cargo current、rustup current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- Cargo 根包含 credentials.toml、配置、程序和私有依赖，整个目录不是纯缓存。
- credential provider、下载、工具链更新及 target/install 写入另行授权；locked 不等于文件系统只读。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| cargo-home | `~/.cargo` | directory | 是 | [资料](https://doc.rust-lang.org/cargo/guide/cargo-home.html) |
| custom-cargo-home | `${CARGO_HOME}` | directory | 是 | [资料](https://doc.rust-lang.org/cargo/guide/cargo-home.html) |
| rustup-home | `~/.rustup` | directory | 是 | [资料](https://rust-lang.github.io/rustup/environment-variables.html) |
| custom-rustup-home | `${RUSTUP_HOME}` | directory | 是 | [资料](https://rust-lang.github.io/rustup/environment-variables.html) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| cargo-home | `~/.cargo` | directory | 是 | [资料](https://doc.rust-lang.org/cargo/guide/cargo-home.html) |
| custom-cargo-home | `${CARGO_HOME}` | directory | 是 | [资料](https://doc.rust-lang.org/cargo/guide/cargo-home.html) |
| rustup-home | `~/.rustup` | directory | 是 | [资料](https://rust-lang.github.io/rustup/environment-variables.html) |
| custom-rustup-home | `${RUSTUP_HOME}` | directory | 是 | [资料](https://rust-lang.github.io/rustup/environment-variables.html) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| cargo-home | `~/.cargo` | directory | 是 | [资料](https://doc.rust-lang.org/cargo/guide/cargo-home.html) |
| custom-cargo-home | `${CARGO_HOME}` | directory | 是 | [资料](https://doc.rust-lang.org/cargo/guide/cargo-home.html) |
| rustup-home | `~/.rustup` | directory | 是 | [资料](https://rust-lang.github.io/rustup/environment-variables.html) |
| custom-rustup-home | `${RUSTUP_HOME}` | directory | 是 | [资料](https://rust-lang.github.io/rustup/environment-variables.html) |

维护与校验见[仓库说明](../../README.md)。
