import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SessionTimeoutPopup: React.FC = () => {
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  const getTimePlusFiveMinutes = () => {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 5);
    const hours: string = String(currentTime.getHours()).padStart(2, "0");
    const minutes: string = String(currentTime.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    timer.current = setTimeout(() => {
      handleLogout();
    }, 5 * 60 * 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h2
                    className="text-xl font-semibold text-gray-900 text-center"
                    id="modal-title">
                    Session Timeout
                  </h2>
                  <div className="mt-2 flex-col justify-center text-center p-4">
                    <p className="text-sm text-gray-500">
                      You have been idle for a while. Do you want to continue
                      your session?
                    </p>
                    <p className="text-sm text-gray-500">
                      Else you will be auto logged out at{" "}
                      <span className="text-bold">
                        {getTimePlusFiveMinutes()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 flex justify-center gap-5">
              <button
                onClick={() => {}}
                type="button"
                className="btn btn-primary">
                Continue Session
              </button>
              <button
                onClick={handleLogout}
                type="button"
                className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutPopup;
