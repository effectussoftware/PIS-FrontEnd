/**
 * Create person
 */

import React, { useMemo } from "react";
import propTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MuiChip from "@material-ui/core/Chip";
import randomColor from "randomcolor";
import Divider from "@mui/material/Divider";

InfoPersona.propTypes = {
  personData: propTypes.shape({
    cargaHoraria: propTypes.number.isRequired,
    email: propTypes.string.isRequired,
    fullName: propTypes.string.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    tag: propTypes.string,
    technologies: propTypes.array,
  }).isRequired,
};

export default function InfoPersona({ personData }) {
  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h3" paragraph style={{ overflowWrap: "break-word" }}>
        {personData.fullName}
      </Typography>
      <Divider />

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Email
        </Typography>
        <Typography display="" variant="h7">
          {personData.email}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Carga Horaria:{" "}
        </Typography>
        <Typography display="inline" variant="h7">
          {personData.cargaHoraria}
        </Typography>
      </Box>

      {personData.technologies.length != 0 ? (
        <Box mt={2}>
          <Typography variant="h6" display="inline" gutterBottom>
            Tecnologías:
          </Typography>
          <Grid container spacing={2}>
            {personData.technologies?.map((tech, index) => (
              <Grid key={`tech-${index}`} item>
                <Chip tech={tech} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        " "
      )}
    </div>
  );
}

const Chip = ({ tech }) => {
  const color = useMemo(() => randomColor({ luminosity: "light" }), [tech]);
  const capitalizeSeniority = {
    senior: "Senior",
    "semi-senior": "Semi Senior",
    junior: "Junior",
  };

  return (
    <MuiChip
      style={{ backgroundColor: color }}
      label={`${tech[0]} - ${capitalizeSeniority[tech[1]]}`}
      variant="outlined"
    />
  );
};

Chip.propTypes = {
  tech: propTypes.array,
};