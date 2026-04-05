# 03 Five Agents スクリーンショット取得（MCP Playwright）

## 概要
`scripts/capture.ts` は使わない。
Claude Code のチャットから MCP Playwright ツールを使って
Five Agents XE3 を直接操作し、スクリーンショットを取得する。

依存パッケージのインストールや `npx playwright install` は不要。

---

## 操作手順（Claude Code チャットで指示する）

### 基本プロンプト

```
Five Agents XE3 を起動して、以下の情報で命式を表示し、
スクリーンショットを screenshots/YYYY-MM-DD_{name}.png に保存してください。

名前: Kohei
生年月日: 1985年3月15日
出生時刻: 14:30
性別: 男
流年: 現在年（現在ボタンをクリック）
```

### Claude Code が行う操作（MCP ツール）

1. `mcp__playwright__browser_navigate` — Five Agents を起動
   - パス: `C:\Users\kou56\OneDrive\デスクトップ\Five Agents XE3.lnk`
2. `mcp__playwright__browser_snapshot` — UI 構造を確認してセレクタを特定
3. `mcp__playwright__browser_fill_form` / `browser_type` — 各フィールドに入力
4. `mcp__playwright__browser_click` — 「現在」ボタンをクリック
5. `mcp__playwright__browser_take_screenshot` — 画面をキャプチャ
6. 取得した画像を `screenshots/YYYY-MM-DD_{name}.png` として保存

---

## Todo

### 初回セットアップ（UI構造の確認）
- [ ] Claude Code チャットで Five Agents を起動し、`browser_snapshot` で UI 構造を確認
- [ ] 年・月・日・時・分・性別・「現在」ボタンのセレクタを特定
- [ ] CLAUDE.md の「Five Agents UI メモ」セクションにセレクタを記録

### 運用フロー確認
- [ ] テスト実行：サンプルデータで操作〜スクリーンショット保存まで通しで確認
- [ ] 保存先 `screenshots/YYYY-MM-DD_{name}.png` に正しく保存されることを確認
- [ ] 保存後に `public/screenshots/` へのコピーも忘れないようフロー化

---

## 変更前との比較

| 項目 | capture.ts 方式 | MCP 方式（現行） |
|------|----------------|----------------|
| 実行方法 | `npx ts-node scripts/capture.ts` | Claude Code チャットで指示 |
| Playwright インストール | 必要（`npx playwright install`） | 不要 |
| scripts/capture.ts | 実装・保守が必要 | 不要 |
| 完全自動化（バッチ） | 可能 | 不可（Claude Code 起動が必要） |
| このプロジェクトへの適性 | △ | ◎ |

---

## 参照
- CLAUDE.md「ワークフロー Step 1」セクション
