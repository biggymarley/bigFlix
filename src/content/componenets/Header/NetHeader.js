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
import { useMatch, useNavigate } from "react-router-dom";
import Logo from "../../../assets/imgs/bigflix.png";
import { SearchContext } from "../../context/context";

const pagesS = [
  { label: "Home", path: "/" },
  { label: "TV Shows", path: "/discover/series" },
];

const pagesM = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/discover/movies" },
];

const NetHeader = () => {
  const { query, HandleSearchChange, clearSearchChange } =
    React.useContext(SearchContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  let match = useMatch("/discover/movies");
  let matchS = useMatch("/discover/series");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ ...classes.appbar, ...((match || matchS) && { background: "#000000" }) }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: { xs: 1, md: 0 }, paddingRight: 4 }}>
              <Box onClick={() => navigate("/")}>
                <img
                  src={Logo}
                  alt=""
                  style={{ objectFit: "contain", width: 90, cursor: "pointer" }}
                />
              </Box>
            </Box>

            <Stack
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              spacing={2}
              alignItems="center"
              direction="row"
            >
              {(match ? pagesS : pagesM).map((page) => (
                <Button
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  sx={{
                    my: 2,
                    color: "white",
                    fontFamily: "NLight",
                    textTransform: "capitalize",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Stack>

            <Box sx={{ overflow: "hidden" }}>
              <TextField
                id="search"
                value={query}
                onChange={HandleSearchChange}
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
                  endAdornment:
                    query !== "" ? (
                      <IconButton position="start" onClick={clearSearchChange}>
                        <Cancel sx={{ color: "primary.main" }} />
                      </IconButton>
                    ) : null,
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
                {(match ? pagesS : pagesM).map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.path);
                    }}
                    sx={{
                      my: 2,
                      color: "white",
                      fontFamily: "NLight",
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {match || matchS ? null : <Toolbar />}
    </>
  );
};

const classes = {
  appbar: { background: "linear-gradient(rgba(0, 0, 0, .6), #141414)" },
};

export default NetHeader;
