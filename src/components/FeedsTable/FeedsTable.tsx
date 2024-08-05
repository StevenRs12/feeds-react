import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import SummaryCellFeed from "../SummaryCellFeed/SummaryCellFeed";
import "./FeedsTables.scss";
import { FeedsTableProps } from "../../interface/feeds.interface";
import { Typography } from "@mui/material";
import SummaryCellTitle from "../SummaryCellTitle/SummaryCellTitle";

const FeedsTable: React.FC<FeedsTableProps> = ({
  data,
  page = 0,
  rowsPerPage = 0,
  totalCount = 0,
  totalPages = 0,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
}) => {
  const [pageInput, setPageInput] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    const sortableData = [...data];
    return sortableData.sort((a, b) => {
      const first = `${a.country} - ${a.city}`.toLowerCase();
      const second = `${b.country} - ${b.city}`.toLowerCase();
      if (sortDirection === "asc") {
        return first.localeCompare(second);
      }
      return second.localeCompare(first);
    });
  }, [data, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const goToPage = (): void => {
    const pageNumber: number = Number(pageInput);
    if (pageNumber > 0 && pageNumber < totalPages + 1) {
      console.log("Changing to page: ", pageNumber);
      onPageChange(pageNumber - 1);
    }
    setPageInput("");
  };

  const handlePageInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPageInput(event.target.value);
  };

  return (
    <Box className="feeds-table-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Resumen de la propiedad
                <IconButton onClick={toggleSortDirection}>
                  {sortDirection === "asc" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <SummaryCellFeed
                    city={item.city}
                    country={item.country}
                    images={[
                      item.image_0,
                      item.image_1,
                      item.image_2,
                      item.image_3,
                      item.image_4,
                    ]}
                    video={item.video}
                    title={item.title_es}
                  />
                </TableCell>
                <TableCell>
                  <SummaryCellTitle
                    title_es={item.title_es}
                    price_amount={item.price_amount}
                  />
                </TableCell>
                <TableCell>
                  <div className="description-td">{item.description_es}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onRowsPerPageChange(parseInt(event.target.value, 10))
        }
        labelRowsPerPage="Feeds por página:"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Box>
          <Typography component="p" gutterBottom sx={{ fontSize: "14px" }}>
            Total de páginas: {totalPages}
          </Typography>
          <Typography component="p" gutterBottom sx={{ fontSize: "14px" }}>
            Página actual: {page}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goToPage();
            }}
          >
            <TextField
              className="input-page"
              label="Ir a la página"
              type="number"
              variant="filled"
              value={pageInput}
              onChange={handlePageInput}
              InputProps={{
                inputProps: {
                  min: 1,
                  max: totalPages,
                  style: { textAlign: "center" },
                },
              }}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedsTable;
