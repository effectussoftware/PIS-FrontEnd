import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import CreatePerson from "../../containers/CreatePerson";
import Notificacion from "../../components/Notificacion";

Listado.propTypes = {
  button: propTypes.string.isRequired,
  buttonClick: propTypes.func.isRequired,
  modalOpen: propTypes.func.isRequired,
  modalOnClose: propTypes.func.isRequired,
  sortModel: propTypes.func.isRequired,
  setSortModel: propTypes.func.isRequired,
  notify: propTypes.func.isRequired,
  setNotify: propTypes.func.isRequired,
  columns: propTypes.array.isRequired,
  rows: propTypes.array.isRequired,
};

export default function Listado({
  button,
  buttonClick,
  modalOpen,
  modalOnClose,
  sortModel,
  setSortModel,
  notify,
  setNotify,
  columns,
  rows,
}) {
  const classes = useStyles();

  return (
    <div
      style={{
        margin: "1vw",
      }}
    >
      <Box m={1} mb={1} className={`${classes.rightBox} ${classes.box}`}>
        <Button color="primary" variant="contained" onClick={buttonClick}>
          {button}
        </Button>
      </Box>

      <Modal
        open={modalOpen}
        onClose={modalOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <IconButton
            aria-label="Close"
            onClick={modalOnClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <CreatePerson setNotify={setNotify} />
        </Box>
      </Modal>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        style={{ height: "70vh" }}
      />

      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
}
