import React, { Fragment, useEffect, useState } from "react";
import AsignacionForm from "../../components/AsignacionDialog";
import { axiosInstance } from "../../config/axios";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Notificacion from "../../components/Notificacion";
import { rolesTraducidos } from "../../config/globalVariables";

AsignarProyectoPersona.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  personName: PropTypes.string.isRequired,
  fechaInicio: PropTypes.string.isRequired,
};

const initialState = {
  project_id: "",
  role: "",
  working_hours: 0,
  working_hours_type: "",
  start_date: "",
  end_date: "",
};

function AsignarProyectoPersona({
  open,
  onClose,
  personId,
  personName,
  fechaInicio,
}) {
  const [proyectos, setProyectos] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  initialState.start_date = fechaInicio;
  const [requestBody, setRequestBody] = useState(initialState);

  useEffect(() => {
    // Traigo proyectos
    open &&
      axiosInstance
        .get("/projects")
        .then((response) => {
          if (response.status == 200) setProyectos(response.data.projects);
          else
            setNotify({
              isOpen: true,
              message: `Error inesperado en fetch de proyectos`,
              type: "error",
              reload: false,
            });
        })
        .catch((error) => {
          console.error(error.response);
          let message = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: message[Object.keys(message)[0]],
            type: "error",
            reload: false,
          });
        });
  }, [open]);

  const onSubmit = (e) => {
    // API call
    e.preventDefault();
    axiosInstance
      .post(`/people/${personId}/person_project`, {
        person_project: requestBody,
      })
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: "Asignacion creada con exito.",
            type: "success",
            reload: true,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado.`,
            type: "error",
            reload: false,
          });
        onClose();
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status == 404) {
          let message = error.response.data.error;
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: false,
          });
          onClose();
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

  const onInputChange = (e) => {
    e.target.name == "project" &&
      setRequestBody({ ...requestBody, project_id: e.target.value });
    e.target.name == "role" &&
      setRequestBody({ ...requestBody, role: rolesTraducidos[e.target.value] });
    e.target.id == "fechaInicio" &&
      setRequestBody({ ...requestBody, start_date: e.target.value });
    e.target.id == "fechaFin" &&
      setRequestBody({ ...requestBody, end_date: e.target.value });
    e.target.name == "working_hours_type" &&
      setRequestBody({ ...requestBody, working_hours_type: e.target.value });
    e.target.id == "horas" &&
      setRequestBody({ ...requestBody, working_hours: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setRequestBody(initialState);
  };

  return (
    <Fragment>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"xs"}>
        <AsignacionForm
          proyectos={proyectos}
          datos={requestBody}
          personName={personName}
          onClose={handleClose}
          onSubmit={onSubmit}
          onInputChange={onInputChange}
        />
      </Dialog>
      <Notificacion notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}

export default AsignarProyectoPersona;
