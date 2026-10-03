# Kubernetes / kubectl

Kubernetes / kubectl 的研发配置、工具与依赖读取候选。

验证声明：`documentation`；资料核对日期：2026-10-03。
来源版本：kubectl current。没有该工具真实沙箱任务的实测声明。

## 范围与局限

- kubeconfig 可含 token、client key、证书和 exec 配置；KUBECONFIG 文件列表及引用文件需手工补。
- exec 认证插件、集群网络、配置写入与集群修改单独授权。
- 默认和变量位置是候选集合，不是条件分支，可能同时存在；应用前核对所有实际目标。
- 目录递归包含其内容；认证标记为 false 不保证无秘密或私有数据。

## 路径与依据

### darwin

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.kube/config` | file | 是 | [资料](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) |

### linux

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.kube/config` | file | 是 | [资料](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) |

### win32

| 标识 | 定位式 | 类型 | 可能含认证/私有数据 | 官方依据 |
| --- | --- | --- | --- | --- |
| config | `~/.kube/config` | file | 是 | [资料](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) |

维护与校验见[仓库说明](../../README.md)。
