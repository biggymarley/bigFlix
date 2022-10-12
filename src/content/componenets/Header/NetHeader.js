import { Cancel, Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { InputAdornment, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/imgs/logo";
import { theme } from "../../styling/theme";

const pages = ["Home", "TV Shows", "Movies"];

const NetHeader = () => {
  const [queryField, setquery] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    setquery(localStorage.getItem("query") || "");
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={classes.appbar} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: { xs: 1, md: 0 }, paddingRight: 4 }}>
              <Box onClick={() => navigate("/")}>
                <Logo color={theme.palette.secondary.main} width={90} />
              </Box>
            </Box>

            
            <Stack
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              spacing={2}
              alignItems="center"
              direction="row"
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    fontFamily: "NLight",
                    textTransform: "capitalize",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Stack>

            <Box sx={{ overflow: "hidden" }}>
              <TextField
                id="search"
                value={queryField}
                onChange={(e) => setquery(e.target.value)}
                variant="outlined"
                size="small"
                focused
                sx={{
                  "& input": { color: "primary.main" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton position="start" onClick={(e) => setquery("")}>
                      <Cancel sx={{ color: "primary.main" }} />
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                PaperProps={{
                  sx: {
                    backgroundColor: "#141414",
                  },
                }}
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      fontFamily: "NLight",
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

const classes = {
  appbar: { background: "linear-gradient(rgba(0, 0, 0, .6), #141414)" },
};

export default NetHeader;
