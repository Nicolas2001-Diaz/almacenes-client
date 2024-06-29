import { DataGrid } from "@mui/x-data-grid";

export default function CustomizedDataGrid({ columns, rows, ...other }) {
  return (
    <DataGrid
      {...other}
      disableMultipleRowSelection
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50]}
    />
  );
}
