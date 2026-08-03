import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  Dashboard,
  UploadFile,
  Analytics,
  SmartToy,
} from "@mui/icons-material";

import {
  Link,
  useLocation,
} from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
const drawerWidth = 240;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
  {
    text: "Upload PDF",
    icon: <UploadFile />,
    path: "/upload",
  },
  {
    text: "Analyze",
    icon: <Analytics />,
    path: "/analyze",
  },
  {
    text: "AI Assistant",
    icon: <SmartToy />,
    path: "/ComplaintAssistant",
  },
  {
  text: "Analytics",
  icon: <BarChartIcon />,
  path: "/analytics",
  },
];

function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={item.path}
              selected={
                location.pathname === item.path
              }
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;