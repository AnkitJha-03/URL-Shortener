import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { FiCopy, FiArrowRight, FiExternalLink } from "react-icons/fi";

import useAuthStore from "../../stores/auth.store";
import { get_short_url } from "../../api/short_url.api";

const urlSchema = z.object({
  long_url: z.string().url("Invalid URL format"),
  short_url: z
    .string()
    .regex(/^[a-zA-Z0-9-_]*$/, "Only letters, numbers, hyphens, and underscores are allowed")
    .optional(),
});

const UrlForm = () => {
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const addUrl = useAuthStore((state) => state.addUrl);

  const form = useForm({
    defaultValues: {
      long_url: "",
      short_url: "",
    },
    validators: {
      onChange: urlSchema,
    },
    onSubmit: async ({ value }) => {
      setShortUrl(null);
      setError("");
      try {
        const url_data = await get_short_url(value.long_url, value.short_url);
        const generated_short_url = url_data.short_url;
        setShortUrl(`${import.meta.env.VITE_BACKEND_URL + generated_short_url}`);
        addUrl(url_data);
        setCopied(false);
      } catch (error) {
        setError(error.response?.data?.statusCode === 401 ? "Please login to use this feature" : (error.response?.data?.message || "Something went wrong"));
      }
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field name="long_url">
            {(field) => (
              <div>
                <label htmlFor="long_url" className="text-sm font-medium text-gray-700 mb-2">
                  Destination URL
                </label>
                <input
                  type="url"
                  id="long_url"
                  placeholder="https://example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="block w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-red-600 mt-1">
                    {field.state.meta.errors.map((e) => e.message).join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="short_url">
            {(field) => (
              <div>
                <label htmlFor="short_url" className="text-sm font-medium text-gray-700 mb-2">
                  Custom Back-Half (optional)
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="hidden sm:inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-l-md">
                    {import.meta.env.VITE_BACKEND_URL}
                  </span>
                  <input
                    type="text"
                    id="short_url"
                    placeholder="your-custom-name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="block w-full px-5 py-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {field.state.meta.errors && (
                  <p className="text-sm text-red-600 mt-1">
                    {field.state.meta.errors.map((e) => e.message).join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            disabled={form.state.isSubmitting}
            className={`w-full flex justify-center items-center px-6 py-3 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              form.state.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {form.state.isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Shortening...
              </>
            ) : (
              <>
                Get Short Link <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Your Short Link</h3>
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 bg-gray-50 sm:text-sm"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-l-0 ${
                  copied
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                }`}
              >
                <FiCopy className="mr-1.5 h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <FiExternalLink className="h-4 w-4 text-gray-400" />
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Test your new link
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
