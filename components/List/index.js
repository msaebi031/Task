import { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
} from "@mui/material";
import ReactCountryFlag from "react-country-flag";

const Lists = ({ list }) => {
  return (
    <Fragment>
      {list?.users.length > 0 ? (
        <TableContainer>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Profail</TableCell>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Country Flag</TableCell>
                <TableCell className="font-bold">City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.users.map((order, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Avatar
                      title={order.name}
                      alt={order.name}
                      src={`data:${
                        order.profilePhoto.contentType
                      };base64,${new Buffer.from(
                        order.profilePhoto.data.data
                      ).toString("base64")}`}
                      variant="circular"
                    />
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>
                    <ReactCountryFlag countryCode={order.country} svg />
                  </TableCell>
                  <TableCell>{order.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography component="span" variant="h4">
          No User!
        </Typography>
      )}
    </Fragment>
  );
};

export default Lists;
