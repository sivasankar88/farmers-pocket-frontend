import React from "react";

interface LogoutPopupInterface {
  setLogoutPopup: (state: boolean) => void;
  handleLogoutConfirm: () => void;
}

const LogoutPopup: React.FC<LogoutPopupInterface> = ({
  setLogoutPopup,
  handleLogoutConfirm,
}) => {
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
                    Are you sure?
                  </h2>
                  <div className="mt-2 flex-col justify-center text-center p-4">
                    <p className="text-sm text-gray-500">
                      Do you really want to Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 flex justify-center gap-5">
              <button
                onClick={() => setLogoutPopup(false)}
                type="button"
                className="btn btn-primary">
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
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

export default LogoutPopup;
