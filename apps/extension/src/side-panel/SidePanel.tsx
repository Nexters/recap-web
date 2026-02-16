import { MESSAGE_TYPE } from "src/types/messages";

export function SidePanel() {
  const handleGoogleLogin = () => {
    chrome.runtime.sendMessage({ type: MESSAGE_TYPE.GOOGLE_LOGIN });
  };
  return (
    <div className="p-2">
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleGoogleLogin}
      >
        Google Login
      </button>
    </div>
  );
}
