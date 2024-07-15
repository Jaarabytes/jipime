const LoadingModal = () => {
    return (
      <div className="modal fixed z-50 inset-0 overflow-y-auto bg-opacity-50 backdrop-blur-sm">
        <div className="modal-content flex items-center justify-center min-h-screen">
            <p className="text-3xl">Loading...</p>
        </div>
      </div>
    )
  };
export default LoadingModal;