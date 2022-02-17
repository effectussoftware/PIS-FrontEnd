import React from "react";
import propTypes from "prop-types";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InputAdornment, InputLabel } from "@mui/material";

import { useStyles } from "./styles";
import {
  FILTER_FORM_LABELS,
  PROJECT_LABELS,
} from "../../config/globalVariables";
import { renderColor } from "../../utils/utils";

FilterForm.propTypes = {
  onClear: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  project_type: propTypes.string,
  project_state: propTypes.string,
  organization: propTypes.string,
  onOrganizationChange: propTypes.func,
  onSearch: propTypes.func,
  setToday: propTypes.func,
};
FilterForm.defaultProps = {
  project_state: "",
  project_type: "",
  organization: "",
};

export default function FilterForm({
  onClear,
  onInputChange,
  project_type,
  project_state,
  organization,
  onOrganizationChange,
  onSearch,
  setToday,
}) {
  const classes = useStyles();

  const renderButton = (tooltip, onClick, iconComponent) => (
    <Tooltip title={tooltip} className={classes.form}>
      <Button
        style={{
          color: "#ffffff",
          background: "#1c1c1c",
        }}
        variant="contained"
        className={classes.clear}
        onClick={onClick}
      >
        {iconComponent}
      </Button>
    </Tooltip>
  );

  const canResetFilters = () => {
    return project_type || project_state || organization;
  };

  return (
    <div
      className={classes.container}
      style={canResetFilters() ? { background: "#E2E0F2" } : null}
    >
      <form id="filter-form" className={classes.form} noValidate>
        <InputLabel>{FILTER_FORM_LABELS.FILTRAR_POR}</InputLabel>
        <TextField
          InputProps={{
            style: {
              width: "229px",
            },
          }}
          id="project_type"
          type="text"
          label={PROJECT_LABELS.TIPO_PROYECTO}
          name="project_type"
          autoComplete="project_type"
          select
          SelectProps={{
            IconComponent: ExpandMoreIcon,
          }}
          value={project_type}
          onChange={onInputChange}
        >
          <MenuItem value="">{FILTER_FORM_LABELS.CUALQUIERA}</MenuItem>
          <MenuItem value="staff_augmentation">
            {FILTER_FORM_LABELS.STAFF_AUGMENTATION}
          </MenuItem>
          <MenuItem value="end_to_end">
            {FILTER_FORM_LABELS.END_TO_END}
          </MenuItem>
          <MenuItem value="tercerizado">
            {FILTER_FORM_LABELS.TERCERIZADO}
          </MenuItem>
          <MenuItem value="hibrido">{FILTER_FORM_LABELS.HIBIRDO}</MenuItem>
        </TextField>
        <TextField
          type="text"
          label={PROJECT_LABELS.ESTADO}
          onChange={onInputChange}
          id="project_state"
          name="project_state"
          select
          SelectProps={{
            style: {
              width: "229px",
            },
            IconComponent: ExpandMoreIcon,
          }}
          value={project_state}
        >
          <MenuItem value="">{FILTER_FORM_LABELS.CUALQUIERA}</MenuItem>
          <MenuItem value="verde">{renderColor("verde")}</MenuItem>
          <MenuItem value="amarillo">{renderColor("amarillo")}</MenuItem>
          <MenuItem value="rojo">{renderColor("rojo")}</MenuItem>
          <MenuItem value="upcoming">{renderColor("upcoming")}</MenuItem>
        </TextField>
        <TextField
          id="organization"
          type="text"
          label={PROJECT_LABELS.ORGANIZACION}
          name="organization"
          autoComplete="organization"
          value={organization}
          onChange={onOrganizationChange}
          inputProps={{ maxLength: 50 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      {canResetFilters() && (
        <InputLabel className={classes.clear} onClick={onClear}>
          {FILTER_FORM_LABELS.LIMPIAR_FILTROS}
        </InputLabel>
      )}
    </div>
  );
}
