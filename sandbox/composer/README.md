# PHP / Composer

PHP / Composer 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：Composer current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- home 可含 auth.json/config.json 和全局工具；不猜 PHP/Composer 程序安装根。
- cache-read-only 不消除 vendor/autoload 写入，旧缓存迁移亦可能写目录；项目认证和 COMPOSER_AUTH 另外处理。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-home | `${COMPOSER_HOME}` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| custom-cache | `${COMPOSER_CACHE_DIR}` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| config | `~/.composer` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| cache | `~/Library/Caches/composer` | directory | 是 | [资料](https://github.com/composer/composer/blob/main/src/Composer/Factory.php) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-home | `${COMPOSER_HOME}` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| custom-cache | `${COMPOSER_CACHE_DIR}` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| legacy-config | `~/.composer` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| config | `~/.config/composer` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| xdg-config | `${XDG_CONFIG_HOME}/composer` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| cache | `~/.cache/composer` | directory | 是 | [资料](https://github.com/composer/composer/blob/main/src/Composer/Factory.php) |
| xdg-cache | `${XDG_CACHE_HOME}/composer` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| custom-home | `${COMPOSER_HOME}` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| custom-cache | `${COMPOSER_CACHE_DIR}` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| config | `${APPDATA}/Composer` | directory | 是 | [资料](https://getcomposer.org/doc/06-config.md) |
| cache | `${LOCALAPPDATA}/Composer` | directory | 是 | [资料](https://github.com/composer/composer/blob/main/src/Composer/Factory.php) |

维护与校验见[仓库说明](../../README.md)。
