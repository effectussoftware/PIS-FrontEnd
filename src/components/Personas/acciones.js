import * as React from "react";
import { Box, FormControlLabel, IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import propTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";

import { useStyles } from "./styles";
import EditPerson from "../../containers/EditPerson";
import EliminarPersona from "../../containers/EliminarPersona";
import { UpdateGridContext } from "../../containers/UpdateGridProvider/index";

Acciones.propTypes = {
  personRow: propTypes.any,
};

export default function Acciones({ personRow }) {
  const [removeRow, editRow] = React.useContext(UpdateGridContext);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const classes = useStyles();
  const personData = {
    id: personRow.id,
    first_name: personRow.firstName,
    last_name: personRow.lastName,
    email: personRow.email,
    working_hours: personRow.cargaHoraria,
    technologies: personRow.technologies || [],
  };

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  return (
    <div>
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleEditOpen}>
              <EditIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Modal
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.modal}>
                <IconButton
                  aria-label="Close"
                  onClick={handleEditClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <EditPerson
                  personData={personData}
                  id={personData.id}
                  onClose={handleEditClose}
                  editRow={editRow.current}
                />
              </Box>
            </Modal>
          </>
        }
      />
      <FormControlLabel
        control={
          <React.Fragment>
            <IconButton onClick={handleRemoveOpen}>
              <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Dialog
              open={openRemove}
              onClose={handleRemoveClose}
              maxWidth="xs"
              PaperProps={{ style: { borderRadius: 16, outline: "none" } }}
              fullWidth
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarPersona
                personName={personRow.fullName}
                personId={personRow.id}
                handleClose={handleRemoveClose}
                removeRow={removeRow.current}
              />
            </Dialog>
          </React.Fragment>
        }
      />
    </div>
  );
}
