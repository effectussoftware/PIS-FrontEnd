import React, { useEffect, useState, Fragment } from "react";
import propTypes from "prop-types";
import InfoAsignacionDialog from "../../components/InfoAsignacionDialog";
import Dialog from "@mui/material/Dialog";
import { axiosInstance } from "../../config/axios";
import Notificacion from "../../components/Notificacion";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { rolesFormateados } from "../../config/globalVariables";

InfoAsignacion.propTypes = {
  open: propTypes.bool.isRequired,
  projectName: propTypes.string.isRequired,
  personName: propTypes.string.isRequired,
  asignacionId: propTypes.number.isRequired,
  onClose: propTypes.func.isRequired,
  removeAsignacion: propTypes.func.isRequired,
  updateAsignacion: propTypes.func.isRequired,
};

const initialState = {
  role: "",
  working_hours: 0,
  working_hours_type: "",
  start_date: "",
  end_date: "",
};

function InfoAsignacion({
  open,
  projectName,
  personName,
  asignacionId,
  onClose,
  removeAsignacion,
  updateAsignacion,
}) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [asignacionInfo, setAsignacionInfo] = useState(initialState);
  const [roles, setRoles] = useState([]);
  const [openConfirmacion, setOpenConfirmacion] = useState(false);
  const dialogContent = `Esta seguro que desea eliminar la asignacion de ${personName} en ${
    projectName.split("-")[0]
  } como ${projectName.split("-")[1]}?`;

  useEffect(() => {
    // Traigo asignacion
    open &&
      axiosInstance
        .get(`/person_project/${asignacionId}`)
        .then((response) => {
          if (response.status == 200) {
            let asignacionData = response.data.person_project;
            setAsignacionInfo({
              role: asignacionData.role,
              working_hours: asignacionData.working_hours,
              working_hours_type: asignacionData.working_hours_type,
              start_date: asignacionData.start_date,
              end_date: asignacionData.end_date,
            });
            setRoles(asignacionData.person.roles);
          } else
            setNotify({
              isOpen: true,
              message: `Error inesperado`,
              type: "error",
              reload: false,
            });
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status == 404) {
            let message = error.response.data.error;
            setNotify({
              isOpen: true,
              message: message,
              type: "error",
              reload: false,
            });
          } else {
            let message = error.response.data.errors;
            setNotify({
              isOpen: true,
              message: message[Object.keys(message)[0]],
              type: "error",
              reload: false,
            });
          }
          onClose();
        });
  }, [open]);

  const handleAplicarCambios = (e) => {
    // API call
    e.preventDefault();

    axiosInstance
      .put(`/person_project/${asignacionId}`, {
        person_project: asignacionInfo,
      })
      .then((response) => {
        if (response.status == 200) {
          let asignacion = response.data.person_project;
          updateAsignacion(
            asignacionId,
            `${asignacion.project.name} - ${rolesFormateados[asignacion.role]}`,
            asignacion.start_date,
            asignacion.end_date
          );
          setNotify({
            isOpen: true,
            message: "Los cambios se aplicaron con exito.",
            type: "success",
            reload: false,
          });
        } else
          setNotify({
            isOpen: true,
            message: `Error inesperado`,
            type: "error",
            reload: false,
          });
        onClose();
        setAsignacionInfo(initialState);
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status == 404) {
          setNotify({
            isOpen: true,
            message: error.response.data.error,
            type: "error",
            reload: true,
          });
          onClose();
          setAsignacionInfo(initialState);
        } else {
          let message = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: message[Object.keys(message)[0]],
            type: "error",
            reload: false,
          });
        }
      });
  };

  const handleDesasignar = () => {
    // API call

    handleConfirmacionClose();
    onClose();
    setAsignacionInfo(initialState);

    axiosInstance
      .delete(`/person_project/${asignacionId}`)
      .then((response) => {
        if (response.status == 200) {
          removeAsignacion(asignacionId);
          setNotify({
            isOpen: true,
            message: response.data.message,
            type: "success",
            reload: false,
          });
        } else
          setNotify({
            isOpen: true,
            message: `Error inesperado.`,
            type: "error",
            reload: false,
          });
      })
      .catch((error) => {
        console.error(error.response);
        let message = error.response.data.error;
        setNotify({
          isOpen: true,
          message: message,
          type: "error",
          reload: false,
        });
      });
  };

  const onInputChange = (e) => {
    e.target.name == "rol" &&
      setAsignacionInfo({ ...asignacionInfo, role: e.target.value });
    e.target.id == "working_hours" &&
      setAsignacionInfo({ ...asignacionInfo, working_hours: e.target.value });
    e.target.name == "working_hours_type" &&
      setAsignacionInfo({
        ...asignacionInfo,
        working_hours_type: e.target.value,
      });
    e.target.id == "start_date" &&
      setAsignacionInfo({ ...asignacionInfo, start_date: e.target.value });
    e.target.id == "end_date" &&
      setAsignacionInfo({ ...asignacionInfo, end_date: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setAsignacionInfo(initialState);
  };

  const handleConfirmacionClose = () => setOpenConfirmacion(false);

  const handleConfirmacionOpen = () => setOpenConfirmacion(true);

  return (
    <Fragment>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"xs"}>
        <InfoAsignacionDialog
          asignacionInfo={asignacionInfo}
          roles={roles}
          projectName={projectName}
          personName={personName}
          onClose={handleClose}
          onChange={onInputChange}
          aplicarCambios={handleAplicarCambios}
          desasignar={handleConfirmacionOpen}
        />
      </Dialog>
      <Dialog
        fullWidth
        open={openConfirmacion}
        onClose={handleConfirmacionClose}
        maxWidth={"xs"}
      >
        <DeleteDialogContent
          dialogContent={dialogContent}
          onClose={handleConfirmacionClose}
          onConfirmation={handleDesasignar}
        />
      </Dialog>
      <Notificacion notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}

export default InfoAsignacion;
