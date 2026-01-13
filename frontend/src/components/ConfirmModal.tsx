type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({ title, message, onConfirm, onCancel }: Props) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="bg-white p-4 rounded shadow w-80">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-2">
        <button className="cursor-pointer btn btn-outline" title="Cancel" onClick={onCancel}>Cancel</button>
        <button className="cursor-pointer btn btn-outline btn-secondary" title="Delete" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);