# yaoguang-presets

瑶光的可维护配置模板库。不同配置类型按顶层目录分开，当前实现 `sandbox/` 与独立的 `extensions/`。`sandbox/`：按技术分类描述**命令沙箱的额外可读路径**。以后新增类型时使用独立目录与 schema。

本仓库提供模板数据、校验与目录生成工具。瑶光在专业模式的「沙箱管理 → 系统沙箱规则」中安装、卸载和更新分类，并汇总已应用的可读路径及来源。基础运行环境随产品携带真实 Git 提交的离线副本，新安装默认安装一次；研发与账号分类由用户按需选择。克隆、构建或校验本仓库不会修改本机的瑶光权限。

## 本地维护

需要 Node.js 22 或更新版本。沙箱入口使用 Node 内置模块；扩展目录的独立校验器使用锁定的 Ajv、格式校验和 SemVer 开发依赖。首次运行先执行 `npm ci --ignore-scripts`。

```sh
npm run build     # 分别校验并生成 sandbox/index.json 与 extensions/index.json
npm run validate  # 验证格式、语义和目录新鲜度，不修改文件
npm test          # 合成目录、故障输入与维护命令测试
npm run check     # validate + test，提交前检查
```

也可直接运行 `node scripts/catalog.mjs build` 或 `validate`；从仓库根目录运行。维护过程不联网、不执行模板、不展开环境变量，也不探测模板指向的真实机器路径。

检查和测试在本地执行，提交和 tag 推送不会触发自动构建。Linux、macOS、Windows 的实际结果以对应设备的执行结果为准；Windows 的执行位测试不适用，文件符号链接测试遇到系统权限限制时会明确跳过。

## 配置快照

配置变更在 `main` 合并后即可被产品同步。`presets/v1.0.0` 等 tag 标记该次配置快照，不切换产品读取来源，也不创建 npm 发行物或 GitHub Release。

扩展制品先在 npm 完成发行，再经维护者审核真实地址、integrity、支持平台、依赖与 `compatibility.productRange` 后更新目录。合并前执行 `npm run check`，合并后再创建 annotated 快照 tag；npm 成功不自动授予核验资格，也不自动合并目录。

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
```

每个分类独立维护，无隐式依赖启用。Java 不会替用户启用 Git、Docker 不会启用云账号。当前有 35 个分类；逐项的路径、平台与依据见各目录说明。基础与共享运行目录独立于技术分类，不隐式启用其他分类。

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
| [development-runtime](sandbox/development-runtime/README.md) | 共享研发运行目录（按需安装） | darwin, linux |
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
| [system-runtime](sandbox/system-runtime/README.md) | 基础运行环境（新安装默认安装） | darwin |
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

路径只支持 POSIX 绝对路径、`C:/...` 形式的 Windows 绝对路径、`~/...` 或开头一个 `${NAME}`，统一使用 `/` 分隔符。禁止相对路径、`.`/`..` 段、glob、命令替换、重复斜杠、控制字符、根目录和字面整个 home；不支持 UNC。变量只允许 schema 路径表达式列出的工具定位名称，不能加入 token/secret 或任意变量。整个变量值是否为 root/home、是否是文件列表或无效值，必须由宿主在定位时拒绝；维护工具不读取环境。

默认和变量位置是候选集合，不是“设置变量就自动删除默认路径”的条件语法，二者可能同时存在。消费者必须预览全部具体目标，按同一真实目标及类型去重并保留来源。跨分类重复是合理的；平台内重复标识和相同定位式/类型会拒绝，末尾 `/` 不制造另一个目标。

定位后缺失的目标不能自动授权；密封目录、符号链接真实目标、实际类型、用户确认、授权取消与持久化都是宿主的责任。本仓库不代替沙箱权限检查。模板也不授予写入、网络、agent/daemon socket、keychain、云 API 操作或 fs_* 工具权限。

## 验证声明与维护流程

当前所有分类为 `documentation`：根据所附官方资料填写，并未完成这些工具的真实沙箱任务。pnpm 固定 11.13.1；标记 current/stable 的其他来源没有冻结精确发行版，不承诺所有历史版本相同。

新增或修改分类时：

1. 在 `sandbox/<id>/` 编写 paths.json 和 README.md，使用实际查阅的官方资料；不复制用户配置或真实凭据。
2. 记录平台、来源版本、资料日期和覆盖方式。不确定的安装根、个人 Git include、文件列表、认证 helper 或服务需求写在 notes 中，不猜测路径。
3. 保持条目标识稳定。更改读取目标、目录范围或认证标记时在目录说明中解释。
4. 执行 `npm run build`，然后 `npm run check`，提交源文件及更新后的 index；本地校验会拒绝过期目录。
5. 只有实际测试后才使用 `sandbox-tested`，README 须提供 `[test evidence](...)` 或 `[测试记录](...)` 链接到真实测试记录。链接可为 HTTPS 或仓库内普通文件；工具不请求外部证据，真实性由维护者审阅。记录应包含工具版本、OS、任务、权限、结果及限制。

未提供本机探测脚本：文件配置、keychain、环境认证和服务权限不同。Maven/Gradle/NuGet 的锁、Flutter SDK cache、gcloud 认证刷新等可能需要写权限，不能把模板可读当作构建或登录成功保证。

## 生成目录契约

`index.json` 为 `{ "presets": [...] }`，分类按 id 的 ASCII 顺序排列，无生成时间。每项**仅**包含 id、path、blobSha、content。content 是 paths.json 的完整原始 UTF-8 文本，blobSha 为 Git SHA-1 blob 摘要：`SHA1("blob " + UTF8字节数 + NUL + 原始字节)`。JSON 字段重排或空白修改也需要重建目录。

消费者取得同一 Git 提交的完整 tree 后，核对所有分类文件、普通文件模式、原文摘要与 bundle 是否一一对应。不能仅信任 index 的 id 或摘要。读取其他配置类型时不得隐式加载 sandbox 目录。

仓库校验的规模限制：每个配置和说明文件最多 128 KiB、分类最多 128、全部平台条目合计最多 4096、生成目录最多 8 MiB、定位式最多 4096 字符。schema 另限制名称/说明/source 等字段长度。配置、说明及 schema 必须为普通文件，不接受符号链接、submodule 或可执行配置；不兼容的格式直接修改 schema、校验器与消费者，不引入版本协商或自动迁移权限。

内置校验器只实现本 schema 用到的 JSON Schema 子集；新增未知关键词会失败，不能静默忽略。完整 JSON Schema 工具可以读取同一文件，但目录映射、重复目标、资料链接及 Git byte 摘要属于额外语义检查。

## 当前检查与局限

本地已在 macOS、Node 24.15.0 上进行维护工具验证。测试关注确定性原文/摘要、严格格式、非法路径、来源重名、文件链接/模式、输入预算、CLI 构建与只读校验。工具实现有观察到的先失败后通过记录；进一步路径/类型/URL 边界案例在已有实现上首次通过，二者不混同。

模板目前是资料覆盖，不是研发任务成功率、轮次或 Token 收益数据。Linux/Windows 的实际工具运行结果须以各自的实际记录为准；模板的 documentation 声明不代表消费端或真实研发任务已验证。用户安装、更新或卸载分类时须在瑶光核对路径预览并确认应用。

## 已核验扩展目录

`extensions/index.json` 是独立生成的精确发行物目录；每份记录放在 `extensions/releases/<名称>-<版本>.json`，使用 `schema/extensions.schema.json`。当前目录收录首批十四份官方发行记录，未发布包和合成测试记录不进入可安装清单。克隆、构建、刷新目录都不会安装扩展，沙箱 schema、生成字节、权限和安装行为保持原契约。扩展单独的入口为 `node scripts/extensions.mjs build`／`validate`。

记录必须包含 npm 包名与完整 SemVer、显示名和说明、发布者种类 `official`／`third-party` 与名称网址、作者、精确源码提交、公共 npm tarball URL、SHA512 SRI 和压缩字节数、产品 SemVer 适用范围、实际 OS／CPU 组合、所需模型协议，以及带时区的审查日期、明确范围和至少一条公开 HTTPS 证据。验证整份目录时拒绝未知字段、来源枚举、重复发行记录、非法范围、空证据、任意 registry 和与名称版本不符的 tarball。

官方包与第三方包均使用各自独立的 SemVer，通过 `compatibility.productRange` 声明支持的瑶光产品版本范围，不要求包版本与产品一致；第三方不要求 `@eum-agent/` 命名空间。`official` 与第三方的 `verified` 标记只说明该精确发行物的来源和审查，不承诺绝对安全，不授予文件或网络权限，也不会随新版本自动继承。维护者不得只凭包前缀、自声明或同名同版本授予来源资格。

### 公开 PR 准入

1. 先完成 npm 发行，提供可取得的构建后后端、所声明 UI 与目标平台 native 资产；目录安装对根和所有依赖使用 `--ignore-scripts`，需要安装时构建的发行物不准入。
2. 提交一份精确版本 JSON 和公开审查证据；源码提交、tarball、SHA512、实际大小必须一一对应。第三方每个新版本都重新提交 PR，不能复用上一版资格。
3. 维护者核对发布者／作者与源码来源，取得实际 tarball核对摘要、名版、入口、UI、依赖闭包与许可；明确审查了什么、未覆盖什么，记录真实日期及可追踪的 PR／报告／运行记录。本地校验仅验证结构和语义，不代替人工审查，也不自动批准。
4. 运行 `npm run build`、`npm run check`；维护者审查通过并合并后，固定提交快照才成为可安装目录。配置仓库不发布 npm、不自动合并、不更改沙箱。

撤回一份记录会停止其新目录安装资格；已安装的历史接纳事实、配置、凭据和数据由产品保留。未标记默认的扩展由用户明确安装和启用。每份 release 可选布尔字段 `defaultInstall`：只有显式 `true` 才参与新状态根的一次默认安装，省略或 `false` 保持手动安装；维护工具原样保留字段，不注入默认值。瑶光首次取得新鲜有效目录后，按实际产品版本和 OS／CPU 兼容性固定每包最高兼容版本，保存首次集合；以后刷新、重装和升级不追加新默认项，不自动更新已有版本，也不重新启用用户已停用或卸载的包。离线或未完成项在后续正常启动时核对原始持久操作后补装。该字段不改变来源资格、不增加权限，不允许覆盖用户的同名自定义包。

### 首批官方发行

已完成真实 npm 发布并核对精确制品的十四项为 `web-shell`、`file-explorer`、`automation-schedule`、`integration-acp`、`integration-mcp`、`channel-feishu`、`session-todo`、`llm-openai`、`llm-anthropic`、`llm-deepseek`、`llm-zhipu`、`llm-kimi`、`llm-minimax`、`llm-chatgpt`（包名均为 `@eum-agent/` 前缀，版本均为 `1.0.0`）。记录使用实际 npm tarball URL、SHA512 integrity 和压缩字节数，均设置 `defaultInstall: true`，支持平台声明为 `darwin/arm64` 与 `linux/x64`；新状态根按前述兼容性规则参与一次默认安装。

第三方发行仍通过公开 PR 与维护者审查准入，不使用测试身份冒充已批准社区包。平台支持声明、原生资产交叉编译与目标机器实际运行验收分别记录。

### 扩展语言标识

本地化 displayName 使用 `en-US`（必填）和 `zh-CN`（可选）；本地化 description 使用相同的语言区域标识。产品内统一采用连字符形式，不使用 `en` 或 `en_US` 作为自有元数据语言键。description 仍可为字符串，其他语言映射由通用字典契约承载；修改翻译需要重新生成目录及对应记录摘要。
