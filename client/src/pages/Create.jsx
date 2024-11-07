import { useState } from 'react'
import axios from 'axios'

function Create() {
    const [linkSlug, setLinkSlug] = useState('')
    const [redirectLink, setRedirectLink] = useState('')
    const [message, setMessage] = useState('')

    const handleCreateNewLink = async () => {
        try {
            const resp = await axios.post('http://192.168.29.138:3000/create', {
                linkSlug,
                redirectLink
            })
            setMessage('Link created successfully!')
            setLinkSlug('')
            setRedirectLink('')
            setTimeout(() => setMessage(''), 3000)
        } catch (error) {
            setMessage('Error creating link')
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center">
            <div className="w-96 p-8 border border-white/25 rounded-lg">
                <h1 className="text-xl mb-6 text-center">URL Shortener</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-2">Short URL Slug</label>
                        <input
                            type="text"
                            value={linkSlug}
                            placeholder="Enter slug"
                            className="w-full bg-slate-700 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setLinkSlug(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Redirect URL</label>
                        <input
                            type="text"
                            value={redirectLink}
                            placeholder="Enter URL to redirect to"
                            className="w-full bg-slate-700 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setRedirectLink(e.target.value)}
                        />
                    </div>

                    {message && (
                        <div className="text-center text-sm">{message}</div>
                    )}

                    <button
                        onClick={handleCreateNewLink}
                        className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded-md transition-colors"
                    >
                        Create Link
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Create