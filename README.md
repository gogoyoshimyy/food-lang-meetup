# 食事×言語交換 Meetup MVP

福岡と鹿児島で食事しながら言語交換を楽しむMeetupプラットフォームのMVPです。

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Supabase (Auth, Postgres, RLS)
- **Client**: Supabase JS v2
- **Forms**: React Hook Form + Zod

## Features

### ✅ V1 (MVP)
- ✅ Email/Password認証
- ✅ プロフィール管理 (表示名、自己紹介、都市、言語)
- ✅ Meetup作成 (3ステップウィザード)
- ✅ Meetup検索・フィルタリング (都市、エリア、言語、初心者歓迎、グループサイズ)
- ✅ Meetup参加・キャンセル (定員制限付き)
- ✅ マイMeetup (主催・参加)
- ✅ 安全ガイド
- ✅ RLS (Row Level Security)

### 🚫 V1で含まれないもの
- 決済機能
- 地図表示
- リアルタイムチャット

## Getting Started

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. Project URL と Anon Key を取得

### 2. 環境変数の設定

`.env.local` ファイルを作成:

```bash
cp .env.local.example .env.local
```

以下の値を設定:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. データベースのマイグレーション

Supabaseダッシュボードの SQL Editor で、以下のマイグレーションファイルを順番に実行:

1. `supabase/migrations/20240101000000_create_profiles.sql`
2. `supabase/migrations/20240101000001_create_meetups.sql`
3. `supabase/migrations/20240101000002_create_rsvps.sql`
4. `supabase/migrations/20240101000003_create_reports.sql`
5. `supabase/migrations/20240101000004_enable_rls.sql`
6. `supabase/migrations/20240101000005_seed_data.sql`

⚠️ **注意**: `20240101000005_seed_data.sql` のseedデータは、実際のユーザーIDに置き換える必要があります。

### 4. 依存関係のインストール

```bash
npm install
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## データベーススキーマ

### profiles
- ユーザーのプロフィール情報
- 都市 (福岡/鹿児島)、表示名、自己紹介、話せる言語

### meetups
- Meetup情報
- 開催日時、エリア、定員、予算、言語比率、支払い方法、ルールなど

### rsvps
- Meetup参加状況
- 定員超過防止のため、RPC関数 `join_meetup()` を使用

### reports
- ユーザー報告機能 (安全対策)

## セキュリティ

- **RLS (Row Level Security)** を全テーブルで有効化
- プロフィールは自分のみ編集可能
- Meetupはホストのみ編集・削除可能
- RSVPは本人のみ作成・編集可能
- 報告は誰でも作成可能、閲覧は管理者のみ

## ページ構成

- `/` - ホーム (Meetup一覧・フィルタ)
- `/login` - ログイン
- `/signup` - 新規登録
- `/profile` - プロフィール編集
- `/create` - Meetup作成
- `/meetups/[id]` - Meetup詳細
- `/me` - マイMeetup
- `/safety` - 安全ガイド

## 開発のヒント

### Supabase CLIを使う場合

Supabase CLIをインストールすると、マイグレーションの管理が簡単になります:

```bash
# Supabase CLIのインストール
npm install -g supabase

# プロジェクトとリンク
supabase link --project-ref your-project-ref

# マイグレーションの適用
supabase db push
```

### 型の自動生成

Supabaseの型を自動生成する場合:

```bash
npx supabase gen types typescript --project-id your-project-id > src/types/database.types.ts
```

## トラブルシューティング

### ログイン後にプロフィールページにリダイレクトされない

- Supabaseのauth.usersテーブルにユーザーが作成されているか確認
- profilesテーブルへのinsert権限があるか確認 (RLS)

### Meetupに参加できない

- `join_meetup` RPC関数が正しく作成されているか確認
- rsvpsテーブルへのinsert権限があるか確認 (RLS)

### マイグレーションエラー

- マイグレーションファイルを順番通りに実行しているか確認
- UUID拡張機能が有効化されているか確認

## ライセンス

MIT
