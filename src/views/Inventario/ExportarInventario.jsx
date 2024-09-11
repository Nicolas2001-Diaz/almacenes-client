import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "../../../components/Controls";
import { FileDownload } from "@mui/icons-material";

const ExportarInventario = ({ productos }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    let listaProductos = productos.map((data) => {
      return {
        nombre: data.producto_nombre,
        proveedor: data.proveedor_nombre,
        cantidad: data.cantidad
      };
    });
    
    const libro = XLSX.utils.book_new();
    
    const hoja = XLSX.utils.json_to_sheet(listaProductos);
    
    XLSX.utils.sheet_add_aoa(hoja, [["Nombre Producto", "Proveedor", "Cantidad", "Total", "Método Pago", "Fecha Venta"]], { origin: "A1" });
    XLSX.utils.book_append_sheet(libro, hoja, "Historial");

    setTimeout(() => {
      XLSX.writeFile(libro, "Historial-Clientes.xlsx");
      
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {!loading ? (
        <Button
          text="Exportar"
          color="success"
          onClick={handleDownload}
          startIcon={<FileDownload />}
        />
      ) : (
        <Button
          text="Exportar"
          color="success"
          startIcon={<FileDownload />}
          disabled
        ></Button>
      )}
    </>
  );
};

export default ExportarInventario;
