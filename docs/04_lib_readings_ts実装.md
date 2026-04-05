# 04 lib/readings.ts 実装

## 概要
`readings/` 以下の Markdown ファイルを読み込むユーティリティ。
Next.js の Server Component からサーバーサイドで直接呼び出す（`fetch` 不要）。

---

## Todo

### 型定義
- [ ] 個人鑑定のフロントマター型 `ReadingFrontmatter` を定義
  - `title`, `date`, `person`, `birthDate`, `birthTime`, `gender`, `relationship`
  - `type`, `tags`, `screenshot`, `nikushi`, `kakukyoku`, `youjin`
- [ ] 相性鑑定の追加フィールド型を定義
  - `person1`, `person2`, `screenshot1`, `screenshot2`
- [ ] `Reading` 型（フロントマター + `slug` + `content`）を定義

### 関数実装
- [ ] `getAllReadings()` — 全記事を日付降順で返す
- [ ] `getReading(slug: string)` — slug から1記事を取得（フロントマター + HTML変換済みコンテンツ）
- [ ] `getAllReadingSlugs()` — `generateStaticParams` 用に slug 一覧を返す
- [ ] `getReadingsByPerson(person: string)` — 人物名で絞り込み
- [ ] `getCompatibilityReadings()` — `type === "compatibility"` の記事のみ返す
- [ ] `getAllPeople()` — 登場する人物名の一覧（重複排除）を返す

### MD → HTML 変換
- [ ] `gray-matter` でフロントマターをパース
- [ ] `remark` + `remark-html` でコンテンツを HTML に変換

### 動作確認
- [ ] `readings/` にサンプルmd（`個人鑑定テンプレート.md` を参考）を置いて読み込みテスト

---

## 参照
- CLAUDE.md「mdファイルのフォーマット仕様」セクション
- CLAUDE.md「Next.js ベストプラクティス > データ取得」セクション
