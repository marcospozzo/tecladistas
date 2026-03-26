"use client";

import CheckIcon from "@mui/icons-material/Check";
import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { useAppTheme } from "./AppThemeProvider";
import { ThemePreference } from "./theme";

const themeOptions: {
  icon: typeof ComputerIcon;
  label: string;
  value: ThemePreference;
}[] = [
  {
    icon: ComputerIcon,
    label: "Sistema",
    value: "system",
  },
  {
    icon: LightModeIcon,
    label: "Claro",
    value: "light",
  },
  {
    icon: DarkModeIcon,
    label: "Oscuro",
    value: "dark",
  },
];

export default function ThemeSelector({ onSelect }: { onSelect?: () => void }) {
  const { resolvedTheme, setThemePreference, themePreference } = useAppTheme();

  return (
    <>
      <Divider />
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography color="text.secondary" variant="overline">
          Tema
        </Typography>
      </Box>
      {themeOptions.map(({ icon: Icon, label, value }) => (
        <MenuItem
          key={value}
          onClick={() => {
            setThemePreference(value);
            onSelect?.();
          }}
          selected={themePreference === value}
        >
          <ListItemIcon>
            <Icon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ flexGrow: 1 }}>{label}</Typography>
          {themePreference === value ? (
            <CheckIcon color="primary" fontSize="small" />
          ) : null}
        </MenuItem>
      ))}
    </>
  );
}
