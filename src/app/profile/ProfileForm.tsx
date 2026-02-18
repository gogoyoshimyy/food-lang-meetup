'use client'

import { useState } from 'react'
import { createProfile, updateProfile } from '@/app/actions/profiles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type ProfileFormProps = {
    profile: any
    isNew: boolean
}

export default function ProfileForm({ profile, isNew }: ProfileFormProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [languages, setLanguages] = useState<string[]>(profile?.languages || ['日本語'])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.set('languages', JSON.stringify(languages))

        if (isNew) {
            await createProfile(formData)
        } else {
            await updateProfile(formData)
        }

        // モックモードでは常に成功するためエラーハンドリングは不要
        /*
        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
        */
        // If successful, redirect happens in server action
    }

    function addLanguage() {
        setLanguages([...languages, ''])
    }

    function removeLanguage(index: number) {
        setLanguages(languages.filter((_, i) => i !== index))
    }

    function updateLanguage(index: number, value: string) {
        const newLanguages = [...languages]
        newLanguages[index] = value
        setLanguages(newLanguages)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="display_name">表示名 *</Label>
                <Input
                    id="display_name"
                    name="display_name"
                    required
                    defaultValue={profile?.display_name}
                    disabled={loading}
                    placeholder="例: 田中太郎"
                />
            </div>

            <div>
                <Label htmlFor="city">拠点都市 *</Label>
                <Select name="city" defaultValue={profile?.city || '福岡'} disabled={loading}>
                    <SelectTrigger>
                        <SelectValue placeholder="都市を選択" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="福岡">福岡</SelectItem>
                        <SelectItem value="鹿児島">鹿児島</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile?.bio || ''}
                    disabled={loading}
                    placeholder="あなたについて教えてください..."
                    rows={4}
                />
            </div>

            <div>
                <Label>話せる言語</Label>
                <div className="space-y-2 mt-2">
                    {languages.map((lang, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                value={lang}
                                onChange={(e) => updateLanguage(index, e.target.value)}
                                placeholder="言語を入力"
                                disabled={loading}
                            />
                            {languages.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => removeLanguage(index)}
                                    disabled={loading}
                                >
                                    削除
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addLanguage}
                        disabled={loading}
                        size="sm"
                    >
                        + 言語を追加
                    </Button>
                </div>
            </div>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {error}
                </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '保存中...' : isNew ? 'プロフィール作成' : '保存'}
            </Button>
        </form>
    )
}
