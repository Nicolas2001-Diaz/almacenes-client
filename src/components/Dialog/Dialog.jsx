import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
export default function Modal({ open, setOpen, title, children }) {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={() => setOpen()}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid item>{title}</Grid>
          <Grid item>
            <IconButton color="error" onClick={() => setOpen()}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
