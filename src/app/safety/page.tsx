export default function SafetyGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-6">🛡️ 安全ガイド</h1>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold mb-3">参加前に</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>必ず公共の場 (カフェ、レストランなど) で待ち合わせしましょう</li>
                                <li>初めての相手と会う場合は、家族や友人に予定を共有しましょう</li>
                                <li>プロフィールや参加履歴を確認しましょう</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">参加中に</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>不快な言動があれば、その場で明確に伝えましょう</li>
                                <li>個人情報 (住所、職場など) の共有は慎重に</li>
                                <li>お酒は適量を心がけましょう</li>
                                <li>違和感を感じたら、すぐに退出して構いません</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">問題が発生した場合</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>不適切な行為があった場合は、報告機能をご利用ください</li>
                                <li>緊急時は警察 (110) に連絡してください</li>
                                <li>運営チームが状況を確認し、適切な対応を行います</li>
                            </ul>
                        </section>

                        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-3 text-yellow-900">
                                ⚠️ 禁止事項
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-yellow-900">
                                <li>ハラスメント行為 (セクハラ、パワハラなど)</li>
                                <li>勧誘行為 (宗教、ビジネスなど)</li>
                                <li>個人情報の不正取得</li>
                                <li>虚偽のプロフィール情報</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">お問い合わせ</h2>
                            <p className="text-gray-700">
                                ご不明な点や問題が発生した場合は、運営チームまでお気軽にお問い合わせください。
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
