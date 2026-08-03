import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: 450,
        },
      }}
    >
      <DialogTitle
        sx={{
          pt: 3,
          pb: 1,
          px: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          Delete Complaint
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <DialogContentText
          sx={{
            fontSize: 17,
            color: "text.primary",
            lineHeight: 1.8,
          }}
        >
          Are you sure you want to delete this complaint?
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;