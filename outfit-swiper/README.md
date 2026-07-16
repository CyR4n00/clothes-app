# OUTFIT SWIPER 👕👖

OUTFIT SWIPER（アウトフィット・スワイパー）は、登録した自分の服を部位ごとにスワイプして選び、直感的に今日のコーディネート（セットアップ）を決定できるReact Native (Expo) アプリケーションです。

## 📱 アプリの使い方 (Usage)

1. **服の登録 (Add Item)**
   - ホーム画面の「+ NEW ITEM」ボタンから、自分の手持ちの服を登録します。
   - 服の名前、部位（アウター、トップス、パンツ、シューズ、アクセサリー）、写真、タグを設定できます。
2. **カテゴリー (Collections)**
   - 「春用」「デート用」など、独自のカテゴリー（タブ）を作成し、服を分類することができます。
3. **選択順の変更 (Macro Settings)**
   - ホーム画面右上の「歯車アイコン」から、服を選ぶ順番（例: アウター → トップス → パンツ）をカスタマイズできます。
4. **スワイプでコーデを決定 (Swipe to Decide)**
   - ホーム画面の「SWIPE TO DECIDE」をタップすると、設定した順番に沿って服が表示されます。
   - 右スワイプ: **採用 (LIKE)**
   - 左スワイプ: **次へ (NOPE)**
   - 上スワイプ: **保留・後回し (HOLD)**
5. **最終確認 (Final Confirmation)**
   - すべての部位の選択が終わると、選んだコーディネートが一覧で表示されます。

## 🚀 起動方法 (Getting Started)

このプロジェクトはExpoフレームワークを使用しています。

### 1. 依存関係のインストール
```bash
cd outfit-swiper
npm install
```

### 2. 環境変数の設定
プロジェクト直下に `.env` ファイルを作成し、Supabaseのキーを設定してください（`.env.example` を参考にしてください）。
※ `.env` ファイルは `.gitignore` に追加されており、Gitにはコミットされません。

```env
# outfit-swiper/.env
EXPO_PUBLIC_SUPABASE_URL=あなたのSupabase_Project_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=あなたのSupabase_Anon_Key
```

### 3. アプリの起動

**Web（PCブラウザ）で動作確認する場合:**
```bash
npx expo start --web -c
```
※Windowsの方は `start.bat`、Mac/Linuxの方は `start.sh` スクリプトを実行することでも簡単に起動できます。

**スマートフォン（Expo Go）で動作確認する場合:**
```bash
npx expo start
```
ターミナルに表示されるQRコードを、スマートフォンの「Expo Go」アプリ（iOSはカメラアプリ）で読み取ってください。

## 📝 最近の変更点 (Recent Updates & MVP Completion)
- **Supabase連携**: `EXPO_PUBLIC_` プレフィックスを用いた環境変数による、安全なAPIキー管理とクライアントの初期化を実装しました。
- **セキュリティの強化**: `.env` を `.gitignore` に追加し、誤って認証情報がリポジトリに公開されるのを防ぐ対応を行いました。
- **モックデータの廃止**: 初回起動時にテスト用データが自動ロードされる仕様を削除し、ユーザーが「空の状態」から自身で服を追加していく純粋なMVP（Minimum Viable Product）構成を完成させました。
- **UI/UXの実装**:
  - `add-item.tsx`: アイテムの手動追加機能
  - `swipe.tsx`: Tinder風のジェスチャースワイプ画面
  - `macro-settings.tsx`: 部位の選択順序カスタマイズ機能
  - `final-confirmation.tsx`: 決定したコーデの最終確認画面
  - モノクロ・ブルータリズムを基調としたミニマルなUIテーマの適用。
