import * as React from "react";
import { Dialog, FormControlLabel, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";

import EliminarAdministrador from "../../containers/EliminarAdministrador";
import { UpdateGridContext } from "../../containers/UpdateGridProvider/index";

Acciones.propTypes = {
  adminRow: PropTypes.any,
};

export default function Acciones({ adminRow }) {
  const [removeRow, editRow] = React.useContext(UpdateGridContext);
  const [openRemove, setOpenRemove] = React.useState(false);

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleRemoveOpen}>
              <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Dialog
              PaperProps={{ style: { borderRadius: 16, outline: "none" } }}
              open={openRemove}
              onClose={handleRemoveClose}
              maxWidth="xs"
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarAdministrador
                administratorId={adminRow.id}
                administratorEmail={adminRow.email}
                handleClose={handleRemoveClose}
                removeRow={removeRow.current}
              />
            </Dialog>
          </>
        }
      />
    </div>
  );
}
