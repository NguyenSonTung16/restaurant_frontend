import { saveAs } from 'file-saver'; // Helper tải file

export const DownloadActions = ({ tableId }: { tableId: string }) => {
  const handleDownloadPDF = async () => {
    // Gọi API BE mà bạn đã viết ở bước 2
    const response = await fetch(`/api/admin/tables/${tableId}/qr/download?type=pdf`);
    const blob = await response.blob();
    saveAs(blob, `Table-${tableId}.pdf`);
  };

  return (
    <div className="flex gap-2">
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <button onClick={() => {/* Logic gọi API ZIP */}}>Download All ZIP</button>
    </div>
  );
};