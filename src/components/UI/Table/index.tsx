import React from "react";

import styles from "./index.module.scss";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { MAIN_THEME_COLOR } from "./../../../constants/common";

interface MuiHeadData {
    id: string;
    label: string;
    format?: (value: any) => any 
  };

interface MuiTableProps {
    headData: MuiHeadData[];
    bodyData: any[];
    onRowClick: (row: any[]) => void
  }

const MuiTable = ({ headData, bodyData, onRowClick }: MuiTableProps) => {
  return (
    <Paper className={styles.tableRoot}>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                "& > th": {
                  background: MAIN_THEME_COLOR,
                  color: "white",
                  borderRight: "1px solid white",
                },
              }}
            >
              {headData.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyData.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  onClick={() => onRowClick(row)}
                  className={styles.tableRow}
                  sx={{background: row.color ?? 'inherit'}}
                >
                  {headData.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MuiTable;
