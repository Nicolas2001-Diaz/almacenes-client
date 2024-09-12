import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Header({ title, buttons = "" }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{
        alignItems: { xs: "flex-start", md: "flex-end" },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack sx={{ maxWidth: 500 }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row'}} spacing={{ xs: 1, sm: 1, md: 4 }} sx={{ gap: 1, width: { xs: "100%", sm: "auto" } }}>
        {buttons}
      </Stack>
    </Stack>
  );
}
