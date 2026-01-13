# 💰 Enhancer4MoneyForward

Money Forward（家計簿）の明細ページから、  
表示中のデータを **CSV形式でダウンロードできるようにする**  
User JavaScript 用のカスタムスクリプトです.

---

## ✨ 機能概要

### 📥 CSVダウンロード機能
- 家計簿の明細テーブルをもとに CSV を生成します.
- 表示中の年月をもとにしたファイル名を自動付与します  .
  （例：`moneyforward_202601.csv`）

---

## 🔧 動作環境

- PC版 Money Forward
- [User JavaScript and CSS](https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld)（拡張機能）
- ※ 主に **Chrome 環境での利用を想定**しています.

---

## 📥 導入方法

1. **User JavaScript and CSS** 拡張機能をインストールします.
2. 拡張機能の管理画面を開き、新規スクリプトを作成します.
3. `Enhancer4MoneyForward.js` の内容をすべて貼り付けます.
4. 対象URLを以下のように設定します.

```

https://moneyforward.com/*

```
5. 保存後、Money Forward を再読み込みしてください.

---

## 📄 出力されるCSVについて

以下のような項目を含む CSV を生成します.

- 計算対象
- 日付
- 内容
- 金額
- 保有金融機関
- 大項目
- 中項目
- メモ
- 振替

※ 表示中の明細内容をもとに生成されるため、  
フィルタや表示条件によって内容は変化します.

---

## 🔄 自動更新について

- 月の切り替えや表示条件の変更を検知すると、
  ダウンロードボタンを自動で再生成します.
- ページを再読み込みする必要はありません.

---

## ⚠️ 注意事項・免責

* 本スクリプトは **趣味で作成した個人用ツール**です.
* 動作保証やサポートは行っていません.
* Money Forward の仕様変更により、予告なく動作しなくなる可能性があります.
* すべて自己責任でご利用ください.
* 複数ブラウザでの動作確認は行っていません.（主に Chrome 環境を想定しています）

---

## 📄 ライセンス

MIT License  
本 README の記載内容に従い、改変・再利用は自由に行っていただいて構いません.
