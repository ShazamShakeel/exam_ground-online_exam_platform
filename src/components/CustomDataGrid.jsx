import { Pagination, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

const CustomDataGrid = ({
  rows,
  columns,
  loading,
  totalPages,
  handlePagination,
}) => {
  const params = useParams();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const customPagination = useCallback(() => {
    const _page = params.page ? parseInt(params.page) : 1;
    window.scrollTo(0, 0);
    return (
      <Pagination
        sx={{ marginY: 4 }}
        size={isSmall ? "small" : "large"}
        count={totalPages}
        page={_page}
        disabled={totalPages === 1}
        onChange={handlePagination}
      />
    );
  }, [params.page, isSmall, totalPages, handlePagination]);

  return (
    <Box sx={containerStyles}>
      <DataGrid
        container
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        disableSelectionOnClick
        // checkboxSelection
        getRowHeight={() => "auto"}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        isCellEditable={() => false}
        getRowId={(row) => row.id}
        pagination
        rowsPerPageOptions={[10, 15, 20]}
        components={{ Pagination: customPagination }}
      />
    </Box>
  );
};

export default CustomDataGrid;

const containerStyles = {
  width: "100%",
  "& .MuiDataGrid-root": { border: "none" },
  "& .Mui-selected": {
    backgroundColor: "#edf7fc !important",
    color: "primary.main",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "0px !important",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#fff",
    py: 1.5,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#fff !important",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "0px !important",
  },
  "& .MuiDataGrid-columnSeparator": {
    visibility: "hidden",
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
};
