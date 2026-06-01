import { AlertTriangle } from "lucide-react";

export function WarningBox({ isOpen, onClose, onConfirm, title, description, consequences }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, title?: string, description?: string, consequences?: string[] }) {

  if (!isOpen) return null;

  return (
    <div className="overlay fixed z-100 inset-0 bg-opacity-50 flex items-center justify-center">
      <div className="dialog bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

        <div className="dialog-header">
          <AlertTriangle />
          <div>
            <h3 className="font-bold">{title}</h3>
            <p>{description}</p>
            {consequences?.map((consequence, i) => {
              return <p key={i} className="text-sm text-red-600 dark:text-red-400">-{consequence}</p>
            })}
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