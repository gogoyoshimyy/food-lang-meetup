import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { mockUser } from "@/lib/mock-data";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "食事×言語交換 Meetup",
  description: "福岡・鹿児島で食事しながら言語交換",
};

async function Header() {
  // モックモード: 常にログイン済み
  const user = mockUser

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <span>🍙</span>
            <span className="hidden sm:inline">食事×言語交換</span>
          </Link>
          <nav className="flex items-center gap-4 md:gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-orange-600">
              さがす
            </Link>
            {user && (
              <>
                <Link href="/me" className="text-sm font-medium text-gray-600 hover:text-teal-600">
                  参加予定
                </Link>
                <Link href="/host" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  ホストメニュー
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              <Link href="/create" className="hidden sm:block">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                  ✨ 募集する
                </Button>
              </Link>
              <form action={logout}>
                <Button variant="ghost" size="sm" type="submit" className="text-gray-500">
                  ログアウト
                </Button>
              </form>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">ログイン</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">新規登録</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
