# Java / Maven / Gradle / SDKMAN

Java / Maven / Gradle / SDKMAN 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Maven 3.9、Gradle current、SDKMAN current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- Maven settings 和 Gradle properties 可含认证；localRepository/-s/-gs、自定义 JDK 位置需要手工补。
- Gradle metadata 读取也使用锁；官方只读依赖缓存是另外机制，不承诺只读模板足以构建。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| java-home | `${JAVA_HOME}` | directory | 是 | [资料](https://maven.apache.org/install.html) |
| maven-settings | `~/.m2/settings.xml` | file | 是 | [资料](https://maven.apache.org/settings.html) |
| maven-security | `~/.m2/settings-security.xml` | file | 是 | [资料](https://maven.apache.org/guides/mini/guide-encryption.html) |
| maven-repository | `~/.m2/repository` | directory | 是 | [资料](https://maven.apache.org/settings.html) |
| gradle | `~/.gradle` | directory | 是 | [资料](https://docs.gradle.org/current/userguide/directory_layout.html) |
| custom-gradle | `${GRADLE_USER_HOME}` | directory | 是 | [资料](https://docs.gradle.org/current/userguide/build_environment.html) |
| sdkman | `~/.sdkman` | directory | 是 | [资料](https://sdkman.io/install/) |
| custom-sdkman | `${SDKMAN_DIR}` | directory | 是 | [资料](https://sdkman.io/install/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| java-home | `${JAVA_HOME}` | directory | 是 | [资料](https://maven.apache.org/install.html) |
| maven-settings | `~/.m2/settings.xml` | file | 是 | [资料](https://maven.apache.org/settings.html) |
| maven-security | `~/.m2/settings-security.xml` | file | 是 | [资料](https://maven.apache.org/guides/mini/guide-encryption.html) |
| maven-repository | `~/.m2/repository` | directory | 是 | [资料](https://maven.apache.org/settings.html) |
| gradle | `~/.gradle` | directory | 是 | [资料](https://docs.gradle.org/current/userguide/directory_layout.html) |
| custom-gradle | `${GRADLE_USER_HOME}` | directory | 是 | [资料](https://docs.gradle.org/current/userguide/build_environment.html) |
| sdkman | `~/.sdkman` | directory | 是 | [资料](https://sdkman.io/install/) |
| custom-sdkman | `${SDKMAN_DIR}` | directory | 是 | [资料](https://sdkman.io/install/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| java-home | `${JAVA_HOME}` | directory | 是 | [资料](https://maven.apache.org/install.html) |
| maven-settings | `~/.m2/settings.xml` | file | 是 | [资料](https://maven.apache.org/settings.html) |
| maven-security | `~/.m2/settings-security.xml` | file | 是 | [资料](https://maven.apache.org/guides/mini/guide-encryption.html) |
| maven-repository | `~/.m2/repository` | directory | 是 | [资料](https://maven.apache.org/settings.html) |
| gradle | `~/.gradle` | directory | 是 | [资料](https://docs.gradle.org/current/userguide/directory_layout.html) |
| custom-gradle | `${GRADLE_USER_HOME}` | directory | 是 | [资料](https://docs.gradle.org/current/userguide/build_environment.html) |

维护与校验见[仓库说明](../../README.md)。
