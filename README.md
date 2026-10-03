# yaoguang-presets

瑶光的可维护配置模板库。不同配置类型按顶层目录分开，当前实现 `sandbox/`：按技术分类描述**命令沙箱的额外可读路径**。以后新增类型时使用独立目录与 schema。

本仓库已经包含模板数据、校验与目录生成工具；瑶光的同步、选择和应用功能仍待产品实现。克隆、构建或校验本仓库不会修改本机的瑶光权限。

## 本地维护

需要 Node.js 22 或更新版本。使用 Node 内置模块，无第三方依赖，无需 `npm install`。

```sh
npm run build     # 验证分类，原子生成 sandbox/index.json
npm run validate  # 验证格式、语义和目录新鲜度，不修改文件
npm test          # 合成目录、故障输入与维护命令测试
npm run check     # validate + test，提交前检查
```

也可直接运行 `node scripts/catalog.mjs build` 或 `validate`；从仓库根目录运行。维护过程不联网、不执行模板、不展开环境变量，也不探测模板指向的真实机器路径。

GitHub Actions 已配置 Linux、macOS、Windows 与 Node 22/24 的检查矩阵；它只验证和测试，不自动提交、不发布或修改权限。尚未推送运行的 CI 不作为已通过结果。Windows 的执行位测试不适用，文件符号链接测试遇到系统权限限制时会明确跳过。

## 目录

```text
sandbox/
  java/paths.json
  java/README.md
  go/paths.json
  go/README.md
  ...
  index.json
schema/sandbox.schema.json
scripts/catalog.mjs
test/catalog.test.mjs
.github/workflows/check.yml
```

每个分类独立维护，无隐式依赖启用。Java 不会替用户启用 Git、Docker 不会启用云账号。当前分类如下；逐项的路径、平台与依据见各目录说明。

| 分类 | 名称 | 平台 |
| --- | --- | --- |
| [aliyun](sandbox/aliyun/README.md) | 阿里云 CLI | darwin, linux, win32 |
| [android](sandbox/android/README.md) | Android SDK | darwin, linux, win32 |
| [apple](sandbox/apple/README.md) | Apple / Xcode / CocoaPods | darwin |
| [aws](sandbox/aws/README.md) | AWS CLI | darwin, linux, win32 |
| [azure](sandbox/azure/README.md) | Azure CLI | darwin, linux, win32 |
| [bun](sandbox/bun/README.md) | Bun | darwin, linux, win32 |
| [composer](sandbox/composer/README.md) | PHP / Composer | darwin, linux, win32 |
| [conda](sandbox/conda/README.md) | Conda | darwin, linux, win32 |
| [deno](sandbox/deno/README.md) | Deno | darwin, linux, win32 |
| [docker](sandbox/docker/README.md) | Docker / Compose | darwin, linux, win32 |
| [dotnet](sandbox/dotnet/README.md) | .NET / NuGet | darwin, linux, win32 |
| [flutter](sandbox/flutter/README.md) | Dart / Flutter | darwin, linux, win32 |
| [gcloud](sandbox/gcloud/README.md) | Google Cloud CLI | darwin, linux, win32 |
| [git](sandbox/git/README.md) | Git | darwin, linux, win32 |
| [github](sandbox/github/README.md) | GitHub CLI | darwin, linux, win32 |
| [gitlab](sandbox/gitlab/README.md) | GitLab CLI | darwin, linux, win32 |
| [go](sandbox/go/README.md) | Go | darwin, linux, win32 |
| [homebrew](sandbox/homebrew/README.md) | Homebrew | darwin, linux |
| [java](sandbox/java/README.md) | Java / Maven / Gradle / SDKMAN | darwin, linux, win32 |
| [kubernetes](sandbox/kubernetes/README.md) | Kubernetes / kubectl | darwin, linux, win32 |
| [node](sandbox/node/README.md) | Node.js 与版本管理器 | darwin, linux, win32 |
| [npm](sandbox/npm/README.md) | npm | darwin, linux, win32 |
| [playwright](sandbox/playwright/README.md) | Playwright | darwin, linux, win32 |
| [pnpm](sandbox/pnpm/README.md) | pnpm | darwin, linux, win32 |
| [poetry](sandbox/poetry/README.md) | Poetry | darwin, linux, win32 |
| [python](sandbox/python/README.md) | Python / pip / pyenv | darwin, linux, win32 |
| [ruby](sandbox/ruby/README.md) | Ruby / RubyGems / Bundler | darwin, linux, win32 |
| [rust](sandbox/rust/README.md) | Rust / Cargo / rustup | darwin, linux, win32 |
| [ssh](sandbox/ssh/README.md) | OpenSSH | darwin, linux, win32 |
| [tencent-cloud](sandbox/tencent-cloud/README.md) | 腾讯云 CLI | darwin, linux, win32 |
| [terraform](sandbox/terraform/README.md) | Terraform | darwin, linux, win32 |
| [uv](sandbox/uv/README.md) | uv | darwin, linux, win32 |
| [yarn](sandbox/yarn/README.md) | Yarn | darwin, linux, win32 |

## 配置格式

`paths.json` 为严格 JSON，UTF-8、LF，禁止重复属性名；id 必须等于目录名且为小写 kebab-case。字段定义见 [JSON Schema](schema/sandbox.schema.json)，示例见 [Java](sandbox/java/paths.json)。未知字段和未知平台会拒绝。

| 字段 | 含义 |
| --- | --- |
| id/name/description | 分类标识、展示名称与用途 |
| verification | level、toolVersions、checkedAt；这是来源验证声明 |
| notes | 安装方式、覆盖变量、其他能力需求及尚未核定范围 |
| platforms | darwin/linux/win32 中至少一种；缺席表示该分类未提供该平台数据 |
| readable[].id | 平台内唯一的稳定条目标识 |
| readable[].path | 原始定位式，维护工具从不展开它 |
| readable[].targetType | file 或 directory；目录授权包含其内容 |
| readable[].description | 读取用途 |
| readable[].containsCredentials | 是否声明可能含认证；false 不保证无秘密或私有内容 |
| readable[].sources | 1–8 个官方 HTTPS 资料地址，不自动下载 |

路径只支持 POSIX 绝对路径、`C:/...` 形式的 Windows 绝对路径、`~/...` 或开头一个 `${NAME}`，统一使用 `/` 分隔符。禁止相对路径、`.`/`..` 段、glob、命令替换、重复斜杠、控制字符、根目录和字面整个 home；不支持 UNC。变量只允许 schema 路径表达式列出的工具定位名称，不能加入 token/secret 或任意变量。整个变量值是否为 root/home、是否是文件列表或无效值，必须由未来宿主在定位时拒绝；维护工具不读取环境。

默认和变量位置是候选集合，不是“设置变量就自动删除默认路径”的条件语法，二者可能同时存在。消费者必须预览全部具体目标，按同一真实目标及类型去重并保留来源。跨分类重复是合理的；平台内重复标识和相同定位式/类型会拒绝，末尾 `/` 不制造另一个目标。

定位后缺失的目标不能自动授权；密封目录、符号链接真实目标、实际类型、用户确认、授权取消与持久化都是宿主的责任。本仓库不代替沙箱权限检查。模板也不授予写入、网络、agent/daemon socket、keychain、云 API 操作或 fs_* 工具权限。

## 验证声明与维护流程

当前所有分类为 `documentation`：根据所附官方资料填写，并未完成这些工具的真实沙箱任务。pnpm 固定 11.13.1；标记 current/stable 的其他来源没有冻结精确发行版，不承诺所有历史版本相同。

新增或修改分类时：

1. 在 `sandbox/<id>/` 编写 paths.json 和 README.md，使用实际查阅的官方资料；不复制用户配置或真实凭据。
2. 记录平台、来源版本、资料日期和覆盖方式。不确定的安装根、个人 Git include、文件列表、认证 helper 或服务需求写在 notes 中，不猜测路径。
3. 保持条目标识稳定。更改读取目标、目录范围或认证标记时在目录说明中解释。
4. 执行 `npm run build`，然后 `npm run check`，提交源文件及更新后的 index；CI 会拒绝过期目录。
5. 只有实际测试后才使用 `sandbox-tested`，README 须提供 `[test evidence](...)` 或 `[测试记录](...)` 链接到真实测试记录。链接可为 HTTPS 或仓库内普通文件；工具不请求外部证据，真实性由维护者审阅。记录应包含工具版本、OS、任务、权限、结果及限制。

未提供本机探测脚本：文件配置、keychain、环境认证和服务权限不同。Maven/Gradle/NuGet 的锁、Flutter SDK cache、gcloud 认证刷新等可能需要写权限，不能把模板可读当作构建或登录成功保证。

## 生成目录契约

`index.json` 为 `{ "presets": [...] }`，分类按 id 的 ASCII 顺序排列，无生成时间。每项**仅**包含 id、path、blobSha、content。content 是 paths.json 的完整原始 UTF-8 文本，blobSha 为 Git SHA-1 blob 摘要：`SHA1("blob " + UTF8字节数 + NUL + 原始字节)`。JSON 字段重排或空白修改也需要重建目录。

未来消费者取得同一 Git 提交的完整 tree 后，核对所有分类文件、普通文件模式、原文摘要与 bundle 是否一一对应。不能仅信任 index 的 id 或摘要。读取其他配置类型时不得隐式加载 sandbox 目录。

仓库校验的规模限制：每个配置和说明文件最多 128 KiB、分类最多 128、全部平台条目合计最多 4096、生成目录最多 8 MiB、定位式最多 4096 字符。schema 另限制名称/说明/source 等字段长度。配置、说明及 schema 必须为普通文件，不接受符号链接、submodule 或可执行配置；不兼容的格式直接修改 schema、校验器与消费者，不引入版本协商或自动迁移权限。

内置校验器只实现本 schema 用到的 JSON Schema 子集；新增未知关键词会失败，不能静默忽略。完整 JSON Schema 工具可以读取同一文件，但目录映射、重复目标、资料链接及 Git byte 摘要属于额外语义检查。

## 当前检查与局限

本地已在 macOS、Node 24.15.0 上进行维护工具验证。测试关注确定性原文/摘要、严格格式、非法路径、来源重名、文件链接/模式、输入预算、CLI 构建与只读校验。工具实现有观察到的先失败后通过记录；进一步路径/类型/URL 边界案例在已有实现上首次通过，二者不混同。

模板目前是资料覆盖，不是研发任务成功率、轮次或 Token 收益数据。Linux/Windows 的实际工具运行、GitHub CI 和瑶光消费端尚未验证。产品实现和权限应用需要单独批准。
