import React from "react";
import propTypes from "prop-types";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, InputAdornment, InputLabel } from "@mui/material";

import { useStyles } from "./styles";
import {
  COLORS,
  FILTER_FORM_LABELS,
  PROJECT_LABELS,
} from "../../config/globalVariables";
import { renderColorMenuItems, renderTipoMenuItems } from "../../utils/utils";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";

FilterForm.propTypes = {
  onClear: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  project_type: propTypes.string,
  project_state: propTypes.string,
  organization: propTypes.string,
  active_project: propTypes.bool,
  onOrganizationChange: propTypes.func,
  onSearch: propTypes.func,
  setToday: propTypes.func,
};
FilterForm.defaultProps = {
  project_state: "",
  project_type: "",
  organization: "",
  active_project: true,
};

export default function FilterForm({
  onClear,
  onInputChange,
  project_type,
  project_state,
  organization,
  active_project,
  onOrganizationChange,
  onSearch,
  setToday,
}) {
  const classes = useStyles();

  const canResetFilters = () => {
    return project_type || project_state || organization;
  };

  const keyDownHandler = (e) => e.key === "Enter" && onSearch();

  return (
    <div
      className={classes.container}
      style={
        canResetFilters() ? { background: COLORS.filterFormBackground } : null
      }
    >
      <form
        id="filter-form"
        className={classes.form}
        onKeyDown={keyDownHandler}
        noValidate
      >
        <InputLabel>{FILTER_FORM_LABELS.FILTRAR_POR}:</InputLabel>
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
          {renderTipoMenuItems(true)}
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
          {renderColorMenuItems(true)}
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
                <SearchIcon style={{ cursor: "pointer" }} onClick={onSearch} />
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          style={{
            width: "fit-content",
            color: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
          label={FILTER_FORM_LABELS.OCULTAR_TERMINADOS}
          control={
            <Checkbox
              style={{ color: "rgba(0, 0, 0, 0.6)" }}
              id="active_project"
              checked={active_project}
              onChange={onInputChange}
              name="active_project"
              disableRipple
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          }
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
