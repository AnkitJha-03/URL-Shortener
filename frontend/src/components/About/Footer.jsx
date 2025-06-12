import { FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="text-center text-gray-500 text-sm">
      <p className="mb-2">
        Open source project. Contribute on{" "}
        <a
          href="https://github.com/AnkitJha-03/URL-Shortener"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          GitHub <FiGithub className="ml-1" />
        </a>
      </p>
      <p>© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
    </div>
  );
};

export default Footer;
