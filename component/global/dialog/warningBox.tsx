import { AlertTriangle } from "lucide-react";

export function WarningBox({ isOpen, onClose, onConfirm } : { isOpen: boolean, onClose: () => void, onConfirm: () => void }) {

  if (!isOpen) return null;

  return (
    <div className="overlay fixed z-100 inset-0 bg-opacity-50 flex items-center justify-center">
      <div className="dialog bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

        <div className="dialog-header">
          <AlertTriangle />
          <div>
            <p>Aksi berbahaya — tidak dapat dibatalkan</p>
          </div>
        </div>

        <div className="dialog-footer mt-4 flex gap-3">
          <button onClick={onClose}>Batal</button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
          >
            Ya, hapus sekarang
          </button>
        </div>

      </div>
    </div>
  );
}