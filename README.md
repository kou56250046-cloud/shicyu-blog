# scripts/ — Five Agents 自動操作スクリプト

## 概要

Playwright を使って Five Agents XE3（Electronデスクトップアプリ）を自動操作し、
四柱推命の命式スクリーンショットを取得するスクリプト群。

## セットアップ（初回のみ）

```bash
# プロジェクトルートで実行
npm install
npm install -D playwright @playwright/test ts-node typescript
npx playwright install
```

## 使い方

### 基本コマンド

```bash
npx ts-node scripts/capture.ts \
  --name "Kohei" \
  --birth "1985-03-15" \
  --time "14:30" \
  --gender "男" \
  --relationship "本人"
```

### 引数一覧

| 引数 | 必須 | 形式 | 例 |
|------|------|------|-----|
| `--name` | ✅ | 文字列 | `"Kohei"` |
| `--birth` | ✅ | YYYY-MM-DD | `"1985-03-15"` |
| `--time` | ✅ | HH:MM | `"14:30"` |
| `--gender` | ✅ | 男 / 女 | `"男"` |
| `--relationship` | ❌ | 文字列 | `"妻"` |
| `--year` | ❌ | YYYY | `"2026"` |

### 出力ファイル

```
screenshots/YYYY-MM-DD_{name}.png
```

## トラブルシューティング

### Five Agents が起動しない

```
Error: Five Agents を起動できませんでした
```

→ `capture.ts` の `FIVE_AGENTS_PATH` を確認してください：

```typescript
const FIVE_AGENTS_PATH = 'C:\\Users\\kou56\\OneDrive\\デスクトップ\\Five Agents XE3.lnk'
```

パスが違う場合は上記を修正してください。

### セレクタが見つからない

```
Error: Element not found: [セレクタ名]
```

→ Five Agents のウィンドウが完全に表示された状態かを確認してください。
  `--slow` オプションを追加してデバッグモードで実行できます：

```bash
npx ts-node scripts/capture.ts --name "Test" --birth "1990-01-01" --time "12:00" --gender "男" --slow
```

### スクリーンショットが保存されない

`screenshots/` フォルダが存在するか確認してください：

```bash
mkdir -p screenshots
```

## capture.ts の実装について

> ⚠️ このスクリプトは Claude Code（VSCode）に実装を依頼してください。
> 
> Five Agents の UI 構造（セレクタ・ウィンドウタイトル等）は
> 実際のアプリを起動して確認する必要があります。
> 
> Claude Code チャットで以下のように依頼してください：
>
> ```
> CLAUDE.md を参照して、scripts/capture.ts を実装してください。
> Five Agents XE3 の UI を Playwright で操作するスクリプトです。
> まず Five Agents を起動して UI 構造を確認し、
> 適切なセレクタを使って実装してください。
> ```
