import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

function Header() {
  return (
    <AppBar position="static">
      <Box sx={{ width: '100%' }}>
        <Toolbar 
          disableGutters 
          sx={{ 
            px: { xs: 1, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
            py: { xs: 1, sm: 0 }
          }}
        >
          {/* Logo Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-start' },
            mb: { xs: 1, sm: 0 }
          }}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              CARGO
            </Typography>
          </Box>

          {/* Navigation buttons */}
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center",
            width: { xs: '100%', sm: 'auto' },
            flexGrow: { sm: 1 },
            gap: { xs: 1, sm: 2 }
          }}>
            <Button
              component={Link}
              to="/"
              sx={{ 
                color: "white",
                fontSize: { xs: '0.875rem', sm: '1rem' },
                minWidth: { xs: '100px', sm: '120px' }
              }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/map"
              sx={{ 
                color: "white",
                fontSize: { xs: '0.875rem', sm: '1rem' },
                minWidth: { xs: '100px', sm: '120px' }
              }}
            >
              Maps
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Header;
