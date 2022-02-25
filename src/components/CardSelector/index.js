import React from "react";
import PropTypes from "prop-types";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useStyles } from "./styles.js";
import { PERSON_LABELS } from "../../config/globalVariables";

CardSelector.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default function CardSelector({ title, list, onInputChange }) {
  const classes = useStyles();
  if (title === PERSON_LABELS.PERSONAS) {
    list = list.map((item) => {
      return [item[0].id, item[1]];
    });
  }
  console.log(list);
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "unset",
      }}
      component={Paper}
    >
      <CardHeader className={classes.cardHeader} title={title} />
      <List className={classes.list} dense component="div">
        {title === PERSON_LABELS.PERSONAS
          ? list.map(([p, value]) => {
              return (
                <ListItem
                  key={p.id}
                  role="listitem"
                  button
                  onClick={() => {
                    onInputChange([p, value], title);
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      style={{ color: "black" }}
                      id={p.id}
                      checked={value}
                      tabIndex={-1}
                      disableRipple
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.fw400}
                    primary={p.full_name}
                  />
                </ListItem>
              );
            })
          : list.map((value, index) => {
              return (
                <ListItem
                  key={value + index}
                  role="listitem"
                  button
                  onClick={() => {
                    onInputChange(value, title);
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      style={{ color: "black" }}
                      id={value[0]}
                      checked={value[1]}
                      tabIndex={-1}
                      disableRipple
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                  </ListItemIcon>
                  <ListItemText primary={value[0]} />
                </ListItem>
              );
            })}
        <ListItem />
      </List>
    </Card>
  );
}
