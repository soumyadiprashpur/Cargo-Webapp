import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { Shipments } from "../store/Shipment.api.js";
import {
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import AddShip from "./AddShip.jsx";
import CloseIcon from "@mui/icons-material/Close";

// Styled cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Dashboard = () => {
  const { shipments, isShipmentsLoading, getAllShipments } =
    useStore(Shipments);

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllShipments(); // Fetch shipments when component mounts
  }, [getAllShipments]);

  const handleDialogClose = async () => {
    setOpenDialog(false);
    await getAllShipments(); // Refresh shipments when dialog closes
  };

  const handleRowClick = (shipment) => {
    navigate(`/track/${shipment.shipmentId}`);
  };

  if (isShipmentsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: "space-between",
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 2 }
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            m: 0, 
            p: 0,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Click on a shipment to track it
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          justifyContent: { xs: 'center', sm: 'flex-end' }
        }}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ 
              minWidth: { xs: '100px', sm: '120px' },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Sort
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setOpenDialog(true)}
            sx={{ 
              minWidth: { xs: '140px', sm: '160px' },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Add Shipment
          </Button>
        </Box>
      </Box>

      {(!shipments || shipments.length === 0) ? (
        <Typography 
          align="center" 
          variant="h6" 
          sx={{ 
            mt: 4,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          No shipments found
        </Typography>
      ) : (
        <TableContainer 
          component={Paper}
          sx={{
            mx: { xs: 1, sm: 2 },
            mb: { xs: 2, sm: 3 },
            overflow: 'auto'
          }}
        >
          <Table 
            sx={{ 
              minWidth: { xs: 300, sm: 700 },
            }} 
            aria-label="shipment table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ 
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>Shipment ID</StyledTableCell>
                <StyledTableCell sx={{ 
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>Container ID</StyledTableCell>
                <StyledTableCell sx={{ 
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>Current Location</StyledTableCell>
                <StyledTableCell sx={{ 
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>ETA</StyledTableCell>
                <StyledTableCell sx={{ 
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((row) => (
                <StyledTableRow
                  key={row.id || row.shipmentId}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    "&:active": { backgroundColor: "#b3e5fc" },
                  }}
                >
                  <StyledTableCell sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    padding: { xs: '8px', sm: '16px' }
                  }}>{row.shipmentId}</StyledTableCell>
                  <StyledTableCell sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    padding: { xs: '8px', sm: '16px' }
                  }}>{row.containerId}</StyledTableCell>
                  <StyledTableCell sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    padding: { xs: '8px', sm: '16px' }
                  }}>
                    {typeof row.currentLocation === 'string' 
                      ? row.currentLocation 
                      : row.currentLocation?.location || "Location not available"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    padding: { xs: '8px', sm: '16px' }
                  }}>
                    {row.eta || "ETA not available"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    padding: { xs: '8px', sm: '16px' }
                  }}>
                    {row.status || "Status not available"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add Shipment Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        fullWidth 
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 2, sm: 4 },
            width: { xs: 'calc(100% - 32px)', sm: '600px' }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          py: { xs: 1.5, sm: 2 }
        }}>
          Add Shipment
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{ 
              position: "absolute", 
              right: 8, 
              top: 8,
              padding: { xs: '4px', sm: '8px' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddShip onClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
