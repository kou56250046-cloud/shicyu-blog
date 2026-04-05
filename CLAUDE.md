# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 四柱推命鑑定ブログ — Claude Code 指示書

## プロジェクト概要

Five Agentsアプリ（Electronデスクトップ）で四柱推命の命式を表示し、
手動でスクリーンショットを撮影。チャットに貼り付けると
Claude が画像を読み解いて詳細鑑定文を Markdown で生成・保存するシステム。
生成された md ファイルを GitHub にプッシュすると Vercel が自動デプロイし、
スマホ・PC どこからでも鑑定記事を閲覧できる。

## プロジェクトの現状

- Next.js 14（App Router）のセットアップ済み（`package.json` あり）
- `gray-matter` / `remark` / `remark-html` インストール済み
- Five Agents の操作は**手動**（ユーザーが操作してスクリーンショットをチャットに送る）
- GitHub リポジトリ: `kou56250046-cloud/shicyu-blog`（設定済み）
- Vercel: `main` push で自動デプロイ（設定済み）

---

## 初期化手順（初回のみ）

```bash
# 1. Next.js プロジェクトを作成
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# 2. 必要なパッケージをインストール
npm install gray-matter remark remark-html

# 3. ディレクトリを作成
mkdir -p readings screenshots public/screenshots
```

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
├── screenshots/                     ← スクリーンショット（ローカル作業用・git管理外）
│   └── YYYY-MM-DD_名前.png
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

### Step 1 — Five Agents でスクリーンショット撮影（手動）

1. Five Agents XE3 を起動 → 「四柱推命(S)」をクリック
2. 生年月日・出生時刻・性別を入力し、「現在」ボタンで流年を設定
3. 命式が表示されたら **Alt+PrtSc**（またはSnipping Tool）でキャプチャ
4. `screenshots/YYYY-MM-DD_名前.png` として保存

### Step 2 — 鑑定文の生成（Claude Code チャット）

撮影したスクリーンショットを Claude Code チャットに貼り付け、以下を一緒に送る：

```
（スクリーンショットを貼り付け）

以下の情報で四柱推命の詳細鑑定文を生成し、
readings/YYYY-MM-DD_名前.md として保存してください。

名前: Kohei
生年月日: 1985年3月15日
時刻: 14:30
性別: 男
続柄: 本人
流年: 2026年
スクリーンショット: screenshots/2026-04-05_Kohei.png
```

Claude が命式を読み解いてフォーマット通りの md ファイルを生成・保存する。

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

**重要**: 鑑定文の生成は必ず `docs/shicyu_analysis_guide.md` の解析手順に従うこと。

```
（スクリーンショットを貼り付け）

docs/shicyu_analysis_guide.md の解析手順チェックリストに沿って命式を読み解き、
以下の構成で鑑定文を日本語で生成してください。

【対象者情報】
- 名前: {name}
- 生年月日: {birthDate}
- 出生時刻: {birthTime}
- 性別: {gender}
- 続柄: {relationship}
- 鑑定日（流年）: {readingDate}年

【解析の順番】
1. 日主（日干）を特定する
2. 月支を確認し、身旺・身弱を判定する
3. 格局を特定する（内格 or 外格・格局名）
4. 用神・喜神・忌神を特定する
5. 各柱の通変星から才能・人間関係を読む
6. 大運の現在地と吉凶を確認する
7. 流年との干合・支合・刑冲害合を分析する

【出力形式】
readings/{filename}.md として保存してください。
画像ファイルのパスは /screenshots/{screenshotFile} を使用してください。
フロントマターと各セクションは CLAUDE.md「mdファイルのフォーマット仕様」に従うこと。
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

## Five Agents 操作メモ

手動操作のため自動化スクリプトは不要。

### スクリーンショット撮影手順

1. Five Agents XE3 を起動
2. スタートセンターの「四柱推命(S)」ボタンをクリック
3. 生年月日・時刻・性別を入力し、「現在」ボタンで流年を今年に設定
4. 命式表示画面で **Snipping Tool**（Win+Shift+S）またはウィンドウキャプチャ（Alt+PrtSc）
5. `screenshots/YYYY-MM-DD_名前.png` に保存

### ファイル配置

- `screenshots/` — ローカル作業用（`.gitignore` 対象でも可）
- `public/screenshots/` — ブログに表示する公開用（git 管理対象）

同じ画像を両方のフォルダに置くか、`public/screenshots/` だけに保存して md から参照する。

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
