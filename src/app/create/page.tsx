import { mockUser } from '@/lib/mock-data'
import { redirect } from 'next/navigation'
import CreateMeetupWizard from './CreateMeetupWizard'
import { getProfile } from '@/app/actions/profiles'

export default async function CreateMeetupPage() {
    // モックモード: 常にログイン済み
    const user = mockUser

    if (!user) {
        redirect('/login')
    }

    const profile = await getProfile()

    if (!profile) {
        redirect('/profile?new=true')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Meetupを作成</h1>
                <CreateMeetupWizard defaultCity={profile.city} />
            </div>
        </div>
    )
}
