(function () {
    'use strict';

    // ダウンロード処理を管理する関数
    function handleDownload() {
        // 不要な改行とカンマを削除するための正規表現
        const removeN = /\n.*/g;
        const removeComma = /,/g;
        // 特定のアイコンをチェックするための文字列
        const regex = 'icon-check icon-large';
        // UTF-8 BOMを生成
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

        // テーブルと年のスラッシュを取得
        const table = document.getElementById('cf-detail-table');
        const dateHeader = document.getElementsByTagName("h2")[1].innerText;
        let data_csv = "計算対象, 日付, 内容, 金額, 保有金融機関, 大項目, 中項目, メモ, 振替\n";

        // テーブルの各行を処理
        for (let i = 1; i < table.rows.length; i++) {
            let isTransfer = table.rows[i].cells[3].innerText.includes('\n');
            for (let j = 0; j < table.rows[i].cells.length - 1; j++) {
                const data_cell = table.rows[i].cells[j];
                // 最初の列の場合、アイコンの存在をチェック
                if (j == 0) {
                    data_csv += data_cell.innerHTML.includes(regex) ? 'TRUE' : 'FALSE';
                }
                // 2列目の場合、日付のフォーマットを処理
                else if (j == 1) {
                    const formattedDate = data_cell.innerText.slice(0, 5); // 日付をスライス
                    data_csv += formattedDate;
                }

                // 9列目（振替）で改行がある場合
                else if (j == 8 && isTransfer) {
                    data_csv += 'TRUE';
                }
                // その他の列の内容を追加
                else {
                    data_csv += data_cell.innerText.replace(removeN, "").replace(removeComma, "");
                }
                // 行の区切りを追加
                data_csv += (j == table.rows[i].cells.length - 2) ? "\n" : ",";
            }
        }

        // ダウンロードファイル名の設定 (moneyforward_YYYYMM.csv)
        const yearmonth = dateHeader.slice(0, 7).replace("/", ""); // YYYY/MMを取得して/を削除
        const fileName = `moneyforward_${yearmonth}.csv`; // ファイル名を作成

        const parentDiv = document.getElementsByClassName('pull-right mf-mb-medium')[0];
        const existingDownloadBtn = document.getElementById('download');

        // 既存のダウンロードボタンを削除
        if (existingDownloadBtn) {
            parentDiv.removeChild(existingDownloadBtn);
        }

        // Blobを生成して新しいリンク要素を作成
        const blob = new Blob([bom, data_csv], { type: "text/csv" });
        const newElement = document.createElement('a');
        newElement.textContent = 'Download'; // ボタンのテキスト
        newElement.setAttribute('id', 'download'); // IDを設定
        newElement.className = 'btn cf-new-btn btn-warning'; // クラスを設定
        newElement.href = window.URL.createObjectURL(blob); // BlobをURLに変換
        newElement.download = fileName; // ダウンロードファイル名を設定

        // ボタンのスタイルを設定
        newElement.style.padding = '12px 24px'; // 縦のパディング
        newElement.style.fontSize = '1.2em'; // フォントサイズ

        // ボタンを親要素に追加
        parentDiv.appendChild(newElement);
    }

    // 初回のダウンロード処理を実行
    handleDownload();

    // DOMの変化を監視するためのMutationObserverを作成
    const observer = new MutationObserver(() => {
        const parentDiv = document.getElementsByClassName('pull-right mf-mb-medium')[0];
        const existingDownloadBtn = document.getElementById('download');
        // 既存のダウンロードボタンがあれば削除
        if (existingDownloadBtn) {
            parentDiv.removeChild(existingDownloadBtn);
        }
        // ダウンロード処理を再実行
        handleDownload();
    });

    // 監視対象の要素を設定
    const elem = document.getElementsByClassName('date_range transaction-in-out-header')[0];
    const config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
    };
    // 指定した要素の変化を監視
    observer.observe(elem, config);
})();
