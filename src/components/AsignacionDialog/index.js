import {
  cargasHorarias_t,
  cargasHorarias_tFormateadas,
  rolesFormateados,
} from "../../config/globalVariables";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

AsignacionDialog.propTypes = {
  proyectos: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  datos: PropTypes.object.isRequired,
};

function AsignacionDialog({
  proyectos,
  roles,
  onClose,
  onSubmit,
  personName,
  onInputChange,
  datos,
}) {
  const cargasHorariasItems = cargasHorarias_t.map((cargaHoraria, id) => {
    return (
      <MenuItem key={id} value={cargaHoraria}>
        {cargasHorarias_tFormateadas[cargaHoraria]}
      </MenuItem>
    );
  });

  const rolItems = roles.map((rol, id) => {
    return (
      <MenuItem key={id} value={rol}>
        {rolesFormateados[rol]}
      </MenuItem>
    );
  });

  const proyectosItems = proyectos.map((proyecto) => {
    return (
      <MenuItem key={proyecto.id} value={proyecto.id}>
        {proyecto.name}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <DialogTitle>Asignacion de proyecto a {personName}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} divider={<Divider flexItem />}>
          <TextField
            select
            fullwidth
            required
            name="project"
            label="Proyectos"
            value={datos.project_id}
            onChange={onInputChange}
            sx={{ marginTop: 1 }}
          >
            {proyectosItems}
          </TextField>
          <TextField
            select
            fullWidth
            required
            name="rol"
            label="Rol"
            value={datos.role}
            onChange={(e) => onInputChange(e)}
          >
            {rolItems}
          </TextField>
          <Stack spacing={1} direction="row">
            <TextField
              select
              fullWidth
              required
              name="working_hours_type"
              label="Tipo de carga"
              value={datos.working_hours_type}
              onChange={onInputChange}
            >
              {cargasHorariasItems}
            </TextField>
            <TextField
              fullWidth
              required
              id="horas"
              label="Carga horaria"
              variant="standard"
              type="number"
              value={datos.working_hours}
              onChange={onInputChange}
            />
          </Stack>
          <Stack spacing={1} direction="row">
            <TextField
              fullWidth
              required
              id="fechaInicio"
              variant="standard"
              type="date"
              label="Fecha Inicio"
              InputLabelProps={{ shrink: true }}
              value={datos.start_date}
              onChange={onInputChange}
            />
            <TextField
              fullWidth
              id="fechaFin"
              variant="standard"
              type="date"
              label="Fecha de fin"
              InputLabelProps={{ shrink: true }}
              value={datos.end_date}
              onChange={onInputChange}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit}>Asignar</Button>
      </DialogActions>
    </Fragment>
  );
}

export default AsignacionDialog;
