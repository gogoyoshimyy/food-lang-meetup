import { mockUser } from '@/lib/mock-data'
import { getProfile } from '@/app/actions/profiles'
import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ new?: string }> }) {
    // モックモード: 常にログイン済み
    const user = mockUser

    if (!user) {
        redirect('/login')
    }

    const profile = await getProfile()
    const params = await searchParams
    const isNew = params.new === 'true'

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-6">
                        {isNew || !profile ? 'プロフィール作成' : 'プロフィール編集'}
                    </h1>
                    {isNew && !profile && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900">
                                アカウント作成ありがとうございます！プロフィールを設定してMeetupに参加しましょう。
                            </p>
                        </div>
                    )}
                    <ProfileForm profile={profile} isNew={isNew || !profile} />
                </div>
            </div>
        </div>
    )
}
