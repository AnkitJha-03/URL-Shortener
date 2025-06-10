import { useRef, useState } from 'react';
import { get_short_url } from '../api/short_url.api';

const UrlForm = () => {
  const urlRef = useRef();
  const custom_short_url = useRef();
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl(null);
    setError('');
    const url = urlRef.current.value;
    const short_url = custom_short_url.current.value;
    
    try {
      const generated_short_url = await get_short_url(url, short_url);
  
      setShortUrl(import.meta.env.VITE_BACKEND_URL + generated_short_url);
      setCopied(false);
    } catch (error) {
      if(short_url) setError("This short URL already exists");
      else setError("Something went wrong");
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-svh bg-gray-100 flex flex-col items-center pt-16">
      <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
      <div className="bg-white p-8 lg:px-24 lg:py-16 rounded-lg shadow-md w-full max-w-screen-md">
        <form onSubmit={handleSubmit} className="space-y-4 ">

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
            </div>
          )}

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1"> Enter your URL </label>
            <input
              ref={urlRef}
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
        
        <div className="mt-4">
          <label htmlFor="short_url" className="block text-sm font-medium text-gray-700 mb-1"> Custom URL (optional) </label>
          <input
            ref={custom_short_url}
            type="text"
            id="short_url"
            placeholder="Enter your custom short url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

      <div className="bg-white p-8 lg:p-16 rounded-lg shadow-md w-full max-w-screen-md mt-8">
        { false && (
          <div className="mt-4">
          </div>
        )}
      </div>
    </div>
  )
}

export default UrlForm