import { useRef, useState } from 'react';
import { get_short_url } from '../api/short_url.api';

const UrlForm = () => {
  const inputRef = useRef();
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = inputRef.current.value;
    await handleSubmit(url);
  };

  const handleSubmit = async (url) => {
    const short_url = await get_short_url(url);
    setShortUrl(import.meta.env.VITE_BACKEND_URL + short_url);
    setCopied(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your URL
          </label>
          <input
            ref={inputRef}
            type="url"
            id="url"
            placeholder="https://example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
            />
              <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlForm