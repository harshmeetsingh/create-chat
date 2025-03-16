import "./ErrorBanner.css";

interface ErrorBannerProps {
  errMessage: string;
  onClose?: () => void;
}

export const ErrorBanner = ({ errMessage, onClose }: ErrorBannerProps) => {
  return (
    <div className="error-banner">
      <div className="error-content">
        <svg
          className="error-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span>{errMessage}</span>
      </div>
      {onClose && (
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};
