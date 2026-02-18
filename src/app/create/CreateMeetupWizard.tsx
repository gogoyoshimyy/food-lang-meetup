'use client'

import { useState } from 'react'
import { createMeetup } from '@/app/actions/meetups'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type CreateMeetupWizardProps = {
    defaultCity: string
}

export default function CreateMeetupWizard({ defaultCity }: CreateMeetupWizardProps) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        type: '' as '' | '1on1' | 'meetup',
        city: defaultCity,
        starts_at: '',
        area: '',
        duration_min: '60',
        group_size: '4',
        budget_yen: '2000',
        language_ratio_ja: '50',
        language_ratio_en: '50',
        payment_type: '各自払い',
        beginner_friendly: 'true',
        public_place_only: 'true',
        photo_ok: 'true',

        topics_avoid: '',
        participation_fee: '0',
    })

    function updateFormData(key: string, value: string) {
        setFormData({ ...formData, [key]: value })
    }

    function selectType(type: '1on1' | 'meetup') {
        if (type === '1on1') {
            setFormData({ ...formData, type, group_size: '2', duration_min: '60', budget_yen: '800', participation_fee: '1000' })
        } else {
            setFormData({ ...formData, type, group_size: '4', duration_min: '90', budget_yen: '2000', participation_fee: '0' })
        }
    }

    async function handleSubmit() {
        setLoading(true)
        setError(null)

        const submitData = new FormData()
        submitData.set('type', formData.type)
        submitData.set('city', formData.city)
        submitData.set('starts_at', formData.starts_at)
        submitData.set('area', formData.area)
        submitData.set('duration_min', formData.duration_min)
        submitData.set('group_size', formData.group_size)
        submitData.set('group_size', formData.group_size)
        submitData.set('budget_yen', formData.budget_yen)
        submitData.set('participation_fee', formData.participation_fee)
        submitData.set('language_ratio', JSON.stringify({
            ja: parseInt(formData.language_ratio_ja),
            en: parseInt(formData.language_ratio_en)
        }))
        submitData.set('payment_type', formData.payment_type)
        submitData.set('beginner_friendly', formData.beginner_friendly)
        submitData.set('public_place_only', formData.public_place_only)

        const topicsAvoid = formData.topics_avoid
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0)

        submitData.set('rules', JSON.stringify({
            photoOk: formData.photo_ok === 'true',
            topicsAvoid
        }))

        const result = await createMeetup(submitData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    const is1on1 = formData.type === '1on1'

    return (
        <Card>
            <CardHeader>
                {formData.type && (
                    <>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {[1, 2, 3].map((s) => (
                                <Badge
                                    key={s}
                                    variant={s === step ? 'default' : s < step ? 'secondary' : 'outline'}
                                >
                                    {s}
                                </Badge>
                            ))}
                        </div>
                        <CardTitle className="text-center">
                            Step {step}/3: {step === 1 ? '基本情報' : step === 2 ? '詳細設定' : 'ルール設定'}
                        </CardTitle>
                    </>
                )}
                {!formData.type && (
                    <CardTitle className="text-center">どのタイプを作成しますか？</CardTitle>
                )}
            </CardHeader>
            <CardContent>
                {/* Type Selection */}
                {!formData.type && (
                    <div className="space-y-4">
                        <button
                            onClick={() => selectType('1on1')}
                            className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex items-center gap-4"
                        >
                            <span className="text-4xl">🍙</span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">もぐトーク</h3>
                                <p className="text-sm text-gray-500">ホストとして食事で言語交換。気軽にお話ししましょう！</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">2人限定</Badge>
                                    <Badge variant="secondary" className="text-xs">カフェ向き</Badge>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => selectType('meetup')}
                            className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all text-left flex items-center gap-4"
                        >
                            <span className="text-4xl">👥</span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">MeetUp</h3>
                                <p className="text-sm text-gray-500">グループで食事しながら言語交換。みんなで楽しく！</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">3人以上</Badge>
                                    <Badge variant="secondary" className="text-xs">レストラン向き</Badge>
                                </div>
                            </div>
                        </button>
                    </div>
                )}

                {/* Step 1: Basic Info */}
                {formData.type && step === 1 && (
                    <div className="space-y-4">
                        {/* Selected type indicator */}
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${is1on1 ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                            }`}>
                            <span>{is1on1 ? '🍙' : '👥'}</span>
                            <span className="font-medium text-sm">{is1on1 ? 'もぐトーク' : 'MeetUp（グループ）'}を作成中</span>
                            <button
                                onClick={() => setFormData({ ...formData, type: '' as any })}
                                className="ml-auto text-xs underline opacity-70"
                            >
                                変更
                            </button>
                        </div>

                        <div>
                            <Label htmlFor="city">都市 *</Label>
                            <Select
                                value={formData.city}
                                onValueChange={(value) => updateFormData('city', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="福岡">福岡</SelectItem>
                                    <SelectItem value="鹿児島">鹿児島</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="starts_at">開始日時 *</Label>
                            <Input
                                id="starts_at"
                                type="datetime-local"
                                value={formData.starts_at}
                                onChange={(e) => updateFormData('starts_at', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="area">エリア *</Label>
                            <Input
                                id="area"
                                value={formData.area}
                                onChange={(e) => updateFormData('area', e.target.value)}
                                placeholder={is1on1 ? '例: 天神 スターバックス' : '例: 天神'}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="duration_min">所要時間 (分) *</Label>
                            <Input
                                id="duration_min"
                                type="number"
                                value={formData.duration_min}
                                onChange={(e) => updateFormData('duration_min', e.target.value)}
                                min="30"
                                step="15"
                                required
                            />
                        </div>
                        <Button onClick={() => setStep(2)} className="w-full">
                            次へ
                        </Button>
                    </div>
                )}

                {/* Step 2: Details */}
                {formData.type && step === 2 && (
                    <div className="space-y-4">
                        {!is1on1 && (
                            <div>
                                <Label htmlFor="group_size">定員 *</Label>
                                <Input
                                    id="group_size"
                                    type="number"
                                    value={formData.group_size}
                                    onChange={(e) => updateFormData('group_size', e.target.value)}
                                    min="3"
                                    required
                                />
                            </div>
                        )}
                        {is1on1 && (
                            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                                👤 1対1のため、定員は2名で固定されています
                            </div>
                        )}
                        <div>
                            <Label htmlFor="budget_yen">予算 (円) *</Label>
                            <Input
                                id="budget_yen"
                                type="number"
                                value={formData.budget_yen}
                                onChange={(e) => updateFormData('budget_yen', e.target.value)}
                                min="0"
                                step="100"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">※飲食代の目安です</p>
                        </div>
                        <div>
                            <Label htmlFor="participation_fee">アテンド料・参加費 (円)</Label>
                            <Input
                                id="participation_fee"
                                type="number"
                                value={formData.participation_fee}
                                onChange={(e) => updateFormData('participation_fee', e.target.value)}
                                min="0"
                                step="100"
                                className="font-semibold text-orange-600"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {is1on1 ? 'あなたの取り分となります' : '参加者から受け取る金額です (0円で無料)'}
                            </p>
                        </div>
                        <div>
                            <Label>言語比率 *</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <Label htmlFor="language_ratio_ja" className="text-sm">日本語 (%)</Label>
                                    <Input
                                        id="language_ratio_ja"
                                        type="number"
                                        value={formData.language_ratio_ja}
                                        onChange={(e) => {
                                            const ja = parseInt(e.target.value)
                                            updateFormData('language_ratio_ja', e.target.value)
                                            updateFormData('language_ratio_en', (100 - ja).toString())
                                        }}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="language_ratio_en" className="text-sm">英語 (%)</Label>
                                    <Input
                                        id="language_ratio_en"
                                        type="number"
                                        value={formData.language_ratio_en}
                                        onChange={(e) => {
                                            const en = parseInt(e.target.value)
                                            updateFormData('language_ratio_en', e.target.value)
                                            updateFormData('language_ratio_ja', (100 - en).toString())
                                        }}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="payment_type">支払い方法 *</Label>
                            <Select
                                value={formData.payment_type}
                                onValueChange={(value) => updateFormData('payment_type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="各自払い">各自払い</SelectItem>
                                    <SelectItem value="割り勘">割り勘</SelectItem>
                                    <SelectItem value="ホスト負担">ホスト負担</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="beginner_friendly">初心者歓迎</Label>
                            <Select
                                value={formData.beginner_friendly}
                                onValueChange={(value) => updateFormData('beginner_friendly', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">はい</SelectItem>
                                    <SelectItem value="false">いいえ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                戻る
                            </Button>
                            <Button onClick={() => setStep(3)} className="flex-1">
                                次へ
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Rules */}
                {formData.type && step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="public_place_only">公共の場のみ</Label>
                            <Select
                                value={formData.public_place_only}
                                onValueChange={(value) => updateFormData('public_place_only', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">はい (推奨)</SelectItem>
                                    <SelectItem value="false">いいえ</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500 mt-1">
                                安全のため、カフェやレストランなど公共の場での開催を推奨します
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="photo_ok">写真撮影</Label>
                            <Select
                                value={formData.photo_ok}
                                onValueChange={(value) => updateFormData('photo_ok', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">許可</SelectItem>
                                    <SelectItem value="false">禁止</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="topics_avoid">避けるべき話題 (カンマ区切り)</Label>
                            <Input
                                id="topics_avoid"
                                value={formData.topics_avoid}
                                onChange={(e) => updateFormData('topics_avoid', e.target.value)}
                                placeholder="例: 政治, 宗教"
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                                {error}
                            </div>
                        )}
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                                戻る
                            </Button>
                            <Button onClick={handleSubmit} className="flex-1" disabled={loading}>
                                {loading ? '作成中...' : '作成'}
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
