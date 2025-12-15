import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { QRCodeDisplay } from "./QRCodeDisplay";

interface Props {
  table: {
    tableNumber: string;
    location: string;
    qrToken: string;
  };
}

export const PrintPreviewModal = ({ table }: Props) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Ban-${table.tableNumber}`,
  });

  return (
    <>
      <button onClick={handlePrint}>
        In QR
      </button>

      {/* Nội dung in */}
      <div style={{ display: "none" }}>
        <div
          ref={printRef}
          style={{
            width: "300px",
            padding: "20px",
            textAlign: "center",
            fontFamily: "Arial",
          }}
        >
          <h2>Nhà hàng GA03</h2>
          <p><strong>Bàn:</strong> {table.tableNumber}</p>
          <p>{table.location}</p>

          <QRCodeDisplay value={table.qrToken} size={180} />

          <p style={{ marginTop: "12px", fontSize: "12px" }}>
            Quét mã để xem menu
          </p>
        </div>
      </div>
    </>
  );
};
