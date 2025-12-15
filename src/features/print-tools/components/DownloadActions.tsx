import { useState } from 'react';
import { saveAs } from 'file-saver';

interface Props {
    tableId: string;
}

export const DownloadActions = ({ tableId }: Props) => {
    const [loadingType, setLoadingType] = useState<'pdf' | 'zip' | null>(null);

    // Hàm xử lý chung cho việc download
    const handleDownload = async (type: 'pdf' | 'zip') => {
        try {
            setLoadingType(type);

            // Xác định URL và Tên file dựa trên loại download
            const isPdf = type === 'pdf';
            const url = isPdf
                ? `/api/admin/tables/${tableId}/qr/download`
                : `/api/admin/tables/qr/download-all`;

            const fileName = isPdf
                ? `Table-${tableId}.pdf`
                : `All-QR-Codes.zip`;

            // Gọi API
            const response = await fetch(url);

            // QUAN TRỌNG: Kiểm tra lỗi từ Server trước khi ép kiểu blob
            if (!response.ok) {
                throw new Error(`Lỗi tải file: ${response.statusText}`);
            }

            const blob = await response.blob();
            saveAs(blob, fileName);

        } catch (error) {
            console.error("Download error:", error);
            alert("Không thể tải file. Vui lòng kiểm tra lại Backend.");
        } finally {
            setLoadingType(null);
        }
    };

    return (
        <div className="flex gap-2 mt-2">
            {/* Nút tải PDF riêng lẻ */}
            <button
                onClick={() => handleDownload('pdf')}
                disabled={loadingType !== null}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loadingType === 'pdf' ? 'Đang tạo PDF...' : 'Tải QR PDF'}
            </button>

            {/* Nút tải tất cả ZIP */}
            <button
                onClick={() => handleDownload('zip')}
                disabled={loadingType !== null}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
                {loadingType === 'zip' ? 'Đang nén...' : 'Tải tất cả (ZIP)'}
            </button>
        </div>
    );
};