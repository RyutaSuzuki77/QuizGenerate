## 各コマンド
コンテナ起動
sail up -d

sail npm run dev

phpMyAdmin
http://localhost:8080/

## ログ
Log::info()でログを仕込む。
sail exec laravel.test bash
tail -f storage/logs/laravel.log

dd(変数名)