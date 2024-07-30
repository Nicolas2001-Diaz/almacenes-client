import { useState } from "react";
// import { Button, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { Button } from "../../../components/Controls";
import { FileDownload } from "@mui/icons-material";

const ExportarHistorial = ({ productos }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    let listaProductos = productos.map((data) => {
      return {
        nombre: data.producto_nombre,
        proveedor: data.proveedor_nombre,
        cantidad: data.cantidad,
        total: data.total,
        metodo: data.metodo_pago,
      };
    });
    
    const libro = XLSX.utils.book_new();
    
    const hoja = XLSX.utils.json_to_sheet(listaProductos);
    
    XLSX.utils.sheet_add_aoa(hoja, [["Nombre Producto", "Proveedor", "Cantidad", "Total", "Método Pago"]], { origin: "A1" });
    XLSX.utils.book_append_sheet(libro, hoja, "Historial");

    setTimeout(() => {
      XLSX.writeFile(libro, "Historial.xlsx");
      
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

export default ExportarHistorial;
