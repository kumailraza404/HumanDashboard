import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TokenDetails } from ".";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { SvgIcon } from "@mui/material";

interface Props {
  tokenList: TokenDetails[];
}

const BasicTable = ({ tokenList }: Props) => {
  const tokens = Array.from(tokenList);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ background: "#7164ba" }}>
          <TableRow>
            <TableCell
              sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "16px" }}
            >
              Asset
            </TableCell>

            <TableCell
              align="right"
              sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "16px" }}
            >
              Balance
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "16px" }}
            >
              Balance in USD
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "16px" }}
            >
              % in 24 Hours
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((token, index) => (
            <TableRow
              key={token.name + index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ color: "#7164ba", fontWeight: "600", display: "flex" }}
              >
                {token.name}{" "}
                {token.logo && (
                  <img
                    src={token.logo}
                    style={{
                      height: "20px",
                      width: "20px",
                      marginLeft: "5px",
                    }}
                  />
                )}
              </TableCell>

              <TableCell
                align="right"
                sx={{ color: "#7164ba", fontWeight: "600" }}
              >
                {token.balance} {token.symbol}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#7164ba", fontWeight: "600" }}
              >
                $
                {typeof token.usdPriceCurrent == "number" &&
                  token.usdPriceCurrent.toFixed(4)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: token.changeIn24h < 0 ? "red" : "green",
                  fontWeight: "600",
                }}
              >
                {token.changeIn24h > 0 && `+`}
                {token.changeIn24h}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
