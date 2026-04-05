# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 四柱推命鑑定ブログ — Claude Code 指示書

## プロジェクト概要

Five Agentsアプリ（Electronデスクトップ）を自動操作して四柱推命の命式をスクリーンショット取得し、
Claude が画像を読み解いて詳細鑑定文を Markdown で生成・保存するシステム。
生成された md ファイルを GitHub にプッシュすると Vercel が自動デプロイし、
スマホ・PC どこからでも鑑定記事を閲覧できる。

## プロジェクトの現状

- Next.js 14（App Router）のセットアップ済み（`package.json` あり）
- `gray-matter` / `remark` / `remark-html` インストール済み
- Five Agents の操作は MCP Playwright ツールで行う（`scripts/capture.ts` は作成しない）
- `readings/` / `screenshots/` / `public/screenshots/` / `scripts/` は未作成
- GitHub リポジトリ・Vercel 連携は未設定

---

## 初期化手順（初回のみ）

```bash
# 1. Next.js プロジェクトを作成
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# 2. 必要なパッケージをインストール
npm install gray-matter remark remark-html

# 3. ディレクトリを作成
mkdir -p readings screenshots public/screenshots scripts
```

> **Playwright について**: `scripts/capture.ts` は使わない。
> Five Agents の操作は Claude Code の **MCP Playwright ツール**で直接行う（→ docs/03 参照）。
> `playwright` パッケージのインストール・`npx playwright install` は不要。

---

## 開発コマンド

```bash
npm run dev          # 開発サーバー起動（http://localhost:3000）
npm run build        # 本番ビルド
npm run lint         # ESLint 実行
```

---

## ディレクトリ構成

```
四柱推命鑑定/
├── CLAUDE.md                        ← この指示書
├── 個人鑑定テンプレート.md           ← 個人鑑定の記入済みサンプル
├── 相性鑑定テンプレート.md           ← 相性鑑定の記入済みサンプル
├── readings/                        ← 鑑定mdファイルを置く場所
│   └── YYYY-MM-DD_名前.md
├── screenshots/                     ← スクリーンショット（ローカル作業用）
│   └── YYYY-MM-DD_名前.png
├── scripts/                         ← MCP Playwright で代替するため基本空
├── app/                             ← Next.js ブログアプリ
│   ├── page.tsx                     ← 記事一覧
│   ├── readings/[slug]/page.tsx     ← 個別記事
│   └── compatibility/page.tsx      ← 相性鑑定一覧
├── lib/
│   └── readings.ts                  ← mdファイル読み込みユーティリティ
└── public/
    └── screenshots/                 ← 公開用スクショ（git 管理対象）
```

---

## ワークフロー

### Step 1 — Five Agents 操作（MCP Playwright）

`scripts/capture.ts` は使わない。Claude Code チャットで以下のように指示する：

```
Five Agents XE3 を起動して、以下の情報で命式を表示し、
スクリーンショットを screenshots/YYYY-MM-DD_{name}.png に保存してください。

名前: Kohei
生年月日: 1985年3月15日
出生時刻: 14:30
性別: 男
流年: 現在年（「現在」ボタンをクリック）
```

Claude Code が MCP Playwright ツールを使って以下を自動実行する：
1. Five Agents を起動（パス: `C:\Users\kou56\OneDrive\デスクトップ\Five Agents XE3.lnk`）
2. 生年月日・時刻・性別を入力
3. 「現在」ボタンをクリックして流年を現在年に設定
4. スクリーンショットを `screenshots/YYYY-MM-DD_名前.png` に保存

### Step 2 — 鑑定文の生成（Claude Code チャット）

スクリーンショット保存後、Claude Code のチャットで以下を入力する：

```
@screenshots/YYYY-MM-DD_名前.png

以下の情報で四柱推命の詳細鑑定文を生成し、
readings/YYYY-MM-DD_名前.md として保存してください。

名前: Kohei
生年月日: 1985年3月15日
時刻: 14:30
性別: 男
続柄: 本人
流年: 2026年

鑑定プロンプト（下記の「鑑定プロンプトテンプレート」を使用）
```

### Step 3 — GitHub にプッシュ

```bash
git add readings/ public/screenshots/
git commit -m "feat: Koheiの鑑定文を追加 (2026-04-05)"
git push origin main
```

Vercel が自動検知してデプロイ完了（約1〜2分）。

---

## 鑑定プロンプトテンプレート

Claude Code チャットで使用するプロンプト。画像と一緒に送ること。
記入済みサンプルは `個人鑑定テンプレート.md`・`相性鑑定テンプレート.md` を参照。

```
添付の四柱推命命式チャート（Five Agents）を詳細に読み解き、
以下の構成で鑑定文を日本語で生成してください。

【対象者情報】
- 名前: {name}
- 生年月日: {birthDate}
- 出生時刻: {birthTime}
- 性別: {gender}
- 続柄: {relationship}
- 鑑定日（流年）: {readingDate}

【出力形式】
以下のMarkdownフォーマットで readings/{filename}.md として保存してください。
画像ファイルのパスは public/screenshots/{screenshotFile} を参照してください。

フロントマターと各セクションの内容は、
画像から読み取れる干支・十神・大運・流年の情報を最大限活用して
具体的かつ深く記述してください。

鑑定の深さのレベル：
- 格局の種類を明示し、用神・喜神・忌神を特定する
- 十神から才能・性格・対人関係を読み解く
- 大運の流れと現在地を示す
- 流年との干合・支合・刑冲害合を分析する
- 転換期（干支の節目）を具体的な年で示す
- 相性欄は個人鑑定では省略可（相性鑑定時のみ記入）
```

---

## mdファイルのフォーマット仕様

readings/ 以下のファイルは以下のフロントマターに従うこと。

```yaml
---
title: "{name} の四柱推命鑑定"
date: "YYYY-MM-DD"
person: "{name}"
birthDate: "YYYY-MM-DD"
birthTime: "HH:MM"
gender: "男 | 女"
relationship: "本人 | 妻 | 夫 | 子 | 父 | 母 | その他"
type: "individual | compatibility"
tags: ["{日主}日主", "{格局}", "{流年}年運勢"]
screenshot: "/screenshots/YYYY-MM-DD_{name}.png"
nikushi: "{日主の干支}"
kakukyoku: "{格局名}"
youjin: "{用神}"
---
```

各セクション構成（この順番を守ること）：

1. `## 📊 命式の基本構成` — 四柱（年柱・月柱・日柱・時柱）の干支一覧
2. `## 🔑 日主と五行バランス` — 日主の特性、五行の強弱
3. `## 🏛️ 格局と用神` — 格局の種類、用神・喜神・忌神
4. `## ✨ 生まれ持った才能・強み` — 十神・蔵干から読む資質
5. `## 🌗 性格・特徴・弱み` — 陰陽バランス、忌神の影響
6. `## 🌊 人生の大きな流れ（大運）` — 大運の一覧と現在地
7. `## 📅 今年の運勢（流年 YYYY年）` — 流年干支との関係・テーマ
8. `## ⚡ 転換期・注意すべき時期` — 刑冲害が発動する時期
9. `## 💑 相性メモ`（compatibilityの場合のみ）
10. `## 📝 総評` — 人生テーマと今後へのメッセージ

---

## 相性鑑定のファイル命名規則

```
readings/YYYY-MM-DD_compatibility_人物A_人物B.md
screenshots/YYYY-MM-DD_人物A.png
screenshots/YYYY-MM-DD_人物B.png
```

フロントマターの追加フィールド：

```yaml
type: "compatibility"
person1: "{名前A}"
person2: "{名前B}"
screenshot1: "/screenshots/YYYY-MM-DD_{名前A}.png"
screenshot2: "/screenshots/YYYY-MM-DD_{名前B}.png"
```

---

## Five Agents 操作仕様（MCP Playwright）

`scripts/capture.ts` は不要。Claude Code の MCP Playwright ツールで直接操作する。

### 使用する MCP ツール

| ツール | 用途 |
|--------|------|
| `mcp__playwright__browser_navigate` | Five Agents の .lnk ファイルを開いて起動 |
| `mcp__playwright__browser_snapshot` | UI 構造を確認してセレクタを特定 |
| `mcp__playwright__browser_type` | 年・月・日・時・分フィールドに入力 |
| `mcp__playwright__browser_click` | 「現在」ボタンなどをクリック |
| `mcp__playwright__browser_take_screenshot` | 命式画面をキャプチャ |

### Five Agents UI メモ（初回操作時に記録する）

> 初回チャットで `browser_snapshot` を実行後、以下に実際のセレクタを記録すること。

| フィールド | セレクタ（要確認） |
|-----------|------------------|
| 年入力 | 未確認 |
| 月入力 | 未確認 |
| 日入力 | 未確認 |
| 時入力 | 未確認 |
| 分入力 | 未確認 |
| 性別選択 | 未確認 |
| 「現在」ボタン | 未確認 |

---

## Next.js ブログアプリ仕様

### 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **MD パース**: gray-matter + remark + remark-html
- **デプロイ**: Vercel（GitHub 連携・自動デプロイ）

### ページ一覧

| パス | 説明 |
|------|------|
| `/` | 鑑定記事一覧（人物別タブ・日付順） |
| `/readings/[slug]` | 個別鑑定記事（スクショ＋解説） |
| `/compatibility` | 相性鑑定一覧 |
| `/people` | 登録人物一覧 |

---

## Next.js ベストプラクティス

### Server Components / Client Components の使い分け

**デフォルトは Server Component**（`async` で直接 `await` できる）。以下の場合のみ `'use client'` を追加する：

- `useState` / `useEffect` などの React フックを使う
- ブラウザ API（`window`・`localStorage` など）を使う
- クリック・フォーム送荷などのイベントハンドラーを持つ

`'use client'` はコンポーネントツリーの末端（葉）にできる限り押し下げること。
親を Server Component に保ったまま、インタラクティブ部分だけを切り出す。

```tsx
// app/readings/[slug]/page.tsx — Server Component（デフォルト）
import ShareButton from './share-button' // Client Component

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const reading = await getReading(slug) // サーバーで直接取得
  return (
    <article>
      <h1>{reading.title}</h1>
      <ShareButton title={reading.title} /> {/* 末端だけ 'use client' */}
    </article>
  )
}
```

### データ取得

mdファイルの読み込みは `lib/readings.ts` の関数をサーバーサイドで直接呼ぶ（`fetch` 不要）。
外部 API を呼ぶ場合はキャッシュ方針を明示する：

```tsx
// 静的（デフォルト）— ビルド時にキャッシュ
const data = await fetch('https://...', { cache: 'force-cache' })

// 動的 — リクエストごとに再取得
const data = await fetch('https://...', { cache: 'no-store' })

// ISR — N秒ごとに再検証
const data = await fetch('https://...', { next: { revalidate: 3600 } })
```

### 静的生成（`generateStaticParams`）

`/readings/[slug]` は全記事をビルド時に静的生成する：

```tsx
export async function generateStaticParams() {
  const slugs = getAllReadingSlugs() // lib/readings.ts の関数
  return slugs.map((slug) => ({ slug }))
}
```

### メタデータ（SEO）

各ページに `metadata` オブジェクトか `generateMetadata` 関数を export する：

```tsx
// 静的メタデータ
export const metadata = {
  title: '四柱推命鑑定ブログ',
  description: '個人・相性の四柱推命鑑定記事',
}

// 動的メタデータ（記事ページ）
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const reading = await getReading(slug)
  return { title: reading.title }
}
```

### 画像最適化

スクリーンショットには `<img>` ではなく `next/image` の `<Image>` を使う：

```tsx
import Image from 'next/image'

<Image
  src={reading.screenshot}   // "/screenshots/2026-04-05_Kohei.png"
  alt={`${reading.person}の命式`}
  width={1200}
  height={800}
  priority                   // Above the fold の画像に付ける
/>
```

### フォント

`next/font/google` を使い、レイアウトシフト（CLS）を防ぐ：

```tsx
// app/layout.tsx
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body>{children}</body>
    </html>
  )
}
```

### ファイル規約（App Router）

| ファイル | 役割 |
|----------|------|
| `page.tsx` | ルートのUI（公開されるページ） |
| `layout.tsx` | 子ルート共通のUI（再レンダリングされない） |
| `loading.tsx` | Suspense ラッパーの自動生成（スケルトンUI） |
| `error.tsx` | エラーバウンダリ（`'use client'` 必須） |
| `not-found.tsx` | 404 UI |

---

## Git 運用ルール

### コミットメッセージ形式

```
feat: {名前}の鑑定文を追加 ({日付})
feat: {名前A}と{名前B}の相性鑑定を追加 ({日付})
fix: {名前}の鑑定文を修正
chore: スクリプト・設定ファイルの更新
```

`main` ブランチへの直接プッシュでOK（個人利用のため）。Vercel は `main` を監視して自動デプロイ。
