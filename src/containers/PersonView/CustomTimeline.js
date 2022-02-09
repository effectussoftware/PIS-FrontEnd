import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import { Box, IconButton, Grid } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TodayMarker,
} from "react-calendar-timeline";
import { useSnackbar } from "notistack";

import { axiosInstance } from "../../config/axios";
import AsignarProyectoPersona from "../AsignarProyectoPersona";
import InfoAsignacion from "../InfoAsignacion";
import { rolesFormateados } from "../../config/globalVariables";
import Switcher from "../../components/Switcher/";
import FilterForm from "../../components/FilterForm";
import { useStyles } from "../../components/Personas/styles";
import { FetchInfoPersona } from "./FetchInfoPersona";
import not_found from "../../resources/not_found.png";
import Loading from "../../components/Loading";

// Formato esperado de date : yyyy-MM-DD
export const startValue = (date) => {
  let newDate = new Date(date);
  return moment(moment(newDate).add(3, "hours")).valueOf();
};

// Formato esperado de date : yyyy-MM-DD
export const endValue = (date) => {
  if (date) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return moment(moment(newDate).add(3, "hours")).valueOf();
  }
  return moment(Date()).add(5, "years").add(9, "hours").valueOf();
};

const PersonTimeline = ({ onSwitch, isProjectView }) => {
  const classes = useStyles();
  const [openInfo, setOpenInfo] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([true]);
  const [displayToday, setDisplayToday] = useState(false);
  const [fetchingError, setFetchingError] = useState([false]);
  const [assignationError, setAssignationError] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const [assignObject, setAssignObject] = useState({
    open: false,
    groupId: -1,
    personName: "",
    time: 0,
  });
  const [filters, setFilters] = useState({
    project_type: "",
    project_state: "",
  });
  const [infoAssignObject, setInfoAssignObject] = useState({
    open: false,
    asignacionId: -1,
    projectName: "",
    personName: "",
  });
  const [organization, setOrganization] = useState("");

  const [idInfoPersona, setIdInfoPersona] = useState(0);

  const handleInfoOpen = (id) => {
    setIdInfoPersona(id);
    setOpenInfo(true);
  };
  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  var groupsToAdd = [];
  var itemsToAdd = [];

  const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title",
  };

  const customTimeSteps = {
    second: 0,
    minute: 0,
    hour: 0,
    day: 1,
    month: 1,
    year: 1,
  };

  const onFilterChange = (e) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchData = async (filterParams = {}) => {
    setIsLoading(true);
    // to avoid sending empty query params
    for (let key in filterParams) {
      if (filterParams[key] === "" || filterParams[key] === null) {
        delete filterParams[key];
      }
    }

    await axiosInstance
      .get("/person_project", { params: filterParams })
      .then((response) => {
        const rows = response.data.person_project;
        if (rows.length == 0) {
          if (Object.keys(filterParams).length === 0) {
            setFetchingError(true);
          } else {
            setFetchingError(false);
            setFilteredData(false);
          }
        }
        rows.map((ppl) => {
          setFilteredData(true);
          setFetchingError(false);
          const person = ppl.person;
          groupsToAdd.push({
            id: person.id,
            title: person.full_name,
          });
          person.projects.map((proj) => {
            proj.dates.map((dt) => {
              let color = "#B0CFCB";
              let finasignacion = endValue(dt.end_date);
              let hoy = new Date().getTime();
              if (hoy < finasignacion) {
                if (finasignacion - 864000000 < hoy) {
                  //10 dias = 864000000
                  color = "#C14B3A";
                }
              }

              itemsToAdd.push({
                id: dt.id,
                group: person.id,
                start: startValue(dt.start_date),
                end: endValue(dt.end_date),

                canResize: "both",
                canMove: false,
                itemProps: {
                  style: {
                    borderRadius: 5,
                    background: color,
                    border: "none",
                    fontSize: "12px",
                    fontWeight: 400,
                  },
                },
                title: proj.name + " - " + rolesFormateados[dt.role],
              });
            });
          });
        });
        setGroups(groupsToAdd);
        setItems(itemsToAdd);
      })
      .catch((error) => {
        console.error(error.response);
        enqueueSnackbar("No se pudieron cargar los datos de las personas.", {
          variant: "error",
          autoHideDuration: 8000,
        });
        setFetchingError(true);
      });
    setIsLoading(false);
  };

  const defaultTimeStart = moment()
    .startOf("day")
    .subtract(6, "month")
    .toDate();
  const defaultTimeEnd = moment().startOf("day").add(7, "month").toDate();

  const handleItemResize = (itemId, time, edge) => {
    let itemIndex = items.findIndex((itemIter) => itemIter.id == itemId);
    let todayDate = new Date().getTime();

    // Cambio en item en la timeline
    let startDate = edge === "left" ? time : items[itemIndex].start;
    let endDate = edge === "left" ? items[itemIndex].end : time;
    let currentItem = items[itemIndex];
    let newItem = {
      ...items[itemIndex],
      start: startDate,
      end: endDate,
      itemProps: {
        style: {
          borderRadius: 5,
          background:
            endDate - 864000000 < todayDate && endDate >= todayDate
              ? "#C14B3A"
              : "#B0CFCB",
        },
      },
    };
    setItems(items.map((item) => (item.id == itemId ? newItem : item)));

    // Cambio el item en backend
    let requestBody = {
      role: undefined,
      working_hours: undefined,
      working_hours_type: undefined,
      start_date:
        edge === "left"
          ? moment(time).format("yyyy-MM-DD")
          : moment(items[itemIndex].start).format("yyyy-MM-DD"),
      end_date:
        edge === "left"
          ? moment(items[itemIndex].end - 86400000).format("yyyy-MM-DD") // Le resto 24 horas en milisegundos por el "+ 1" en endValue al traer de backend
          : moment(time - 86400000).format("yyyy-MM-DD"),
    };

    axiosInstance
      .put(`/person_project/${itemId}`, { person_project: requestBody })
      .then()
      .catch((error) => {
        setItems(items.map((item) => (item.id == itemId ? currentItem : item)));
        setAssignationError(true);
        if (error.response.status == 400)
          enqueueSnackbar(
            error.response.data.errors.start_date ??
              error.response.data.errors.end_date,
            { variant: "error", autoHideDuration: 8000 }
          );
        else
          enqueueSnackbar(error.response.data.error, {
            variant: "error",
            autoHideDuration: 8000,
          });
      });
  };

  // Asignacion

  const handleCanvasClick = (groupId, time, e) => {
    let personName = groups.find((group) => group.id == groupId).title;
    setAssignObject({
      open: true,
      groupId: groupId,
      personName: personName,
      time: moment(time + 86400000).format("yyyy-MM-DD"), // Le sumo un dia
    });
  };

  const handleAsignacionClose = () =>
    setAssignObject({ ...assignObject, open: false });

  // Formato esperado de startDate y endDate : yyyy-MM-DD
  const addAsignacion = (asignacionId, personId, title, startDate, endDate) => {
    let todayDate = new Date().getTime();
    setItems([
      ...items,
      {
        id: asignacionId,
        group: personId,
        start: startValue(startDate),
        end: endValue(endDate),
        canResize: "both",
        canMove: false,
        itemProps: {
          style: {
            borderRadius: 5,
            background:
              endValue(endDate) - 864000000 < todayDate &&
              endValue(endDate) >= todayDate
                ? "#C14B3A"
                : "#B0CFCB",
          },
        },
        title: title,
      },
    ]);
  };

  // Info Asignacion

  const handleItemClick = (itemId, e, time) => {
    let itemObject = items.find((item) => item.id == itemId);
    let projectName = itemObject.title;
    let personName = groups.find((group) => group.id == itemObject.group).title;
    setInfoAssignObject({
      open: true,
      asignacionId: itemId,
      projectName: projectName,
      personName: personName,
    });
  };

  const handleInfoAsignacionClose = () =>
    setInfoAssignObject({ ...infoAssignObject, open: false });

  const removeAsignacion = (asignacionId) =>
    setItems(items.filter((item) => item.id != asignacionId));

  const handleGroupRenderer = ({ group }) => {
    var uId = group.id;
    return (
      <div className="custom-group">
        <a id={group.id}>{group.title}</a>
        <IconButton variant="outlined" onClick={() => handleInfoOpen(uId)}>
          <VisibilityIcon style={{ color: "rgb(30, 30, 30)" }} />
        </IconButton>
      </div>
    );
  };

  const handleItemRenderer = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

    return (
      <div {...getItemProps(item.itemProps)}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

        <div
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          <strong>{itemContext.title.split("-")[0]}</strong>
          {" - " + itemContext.title.split("-")[1]}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
      </div>
    );
  };

  const updateAsignacion = (asignacionId, title, startDate, endDate) =>
    setItems(
      items.map((item) =>
        item.id == asignacionId
          ? {
              ...item,
              start: startValue(startDate),
              end: endValue(endDate),
              title: title,
            }
          : item
      )
    );

  useEffect(() => {
    filters ? fetchData({ ...filters, organization }) : fetchData();
  }, [filters]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        isProjectView && (
          <Fragment>
            <FilterForm
              onClear={async () => {
                setFilters({});
                setOrganization("");
                await fetchData();
              }}
              onInputChange={onFilterChange}
              project_state={filters.project_state}
              project_type={filters.project_type}
              organization={organization}
              onOrganizationChange={(e) => setOrganization(e.target.value)}
              onSearch={() => fetchData({ ...filters, organization })}
              setToday={() => {
                setDisplayToday(true);
                setTimeout(() => setDisplayToday(false), [100]);
              }}
            />
            {filteredData && (
              <Timeline
                groups={groups}
                items={items}
                keys={keys}
                fullUpdate
                itemsSorted
                itemTouchSendsClick={true}
                minZoom={30.4368498333 * 86400 * 1000} // mes
                maxZoom={365.242198 * 86400 * 1000} // año
                dragSnap={60 * 60 * 24 * 1000} //dia
                stackItems
                timeSteps={customTimeSteps}
                itemHeightRatio={0.75}
                canMove={true}
                canResize={"both"}
                lineHeight={40}
                defaultTimeStart={defaultTimeStart}
                defaultTimeEnd={defaultTimeEnd}
                onItemResize={handleItemResize}
                onCanvasClick={handleCanvasClick}
                onItemClick={handleItemClick}
                onItemSelect={handleItemClick}
                sidebarWidth={250}
                itemRenderer={handleItemRenderer}
                sidebarWidth={250}
                groupRenderer={handleGroupRenderer}
                visibleTimeStart={displayToday && defaultTimeStart}
                visibleTimeEnd={displayToday && defaultTimeEnd}
              >
                <TodayMarker />
                <TimelineHeaders className="sticky">
                  <SidebarHeader style={{ backgroundColor: "white" }}>
                    {({ getRootProps }) => {
                      return (
                        <div {...getRootProps()}>
                          <Switcher
                            onSwitch={onSwitch}
                            isProjectView={isProjectView}
                          />
                        </div>
                      );
                    }}
                  </SidebarHeader>
                  <DateHeader unit="primaryHeader" />
                  <DateHeader />
                </TimelineHeaders>
              </Timeline>
            )}
            {!filteredData && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  style={{ marginTop: "30px" }}
                  className={classes.imgcontainer}
                  src={not_found}
                />
                <Typography variant="h4" style={{ marginTop: "30px" }}>
                  NO EXISTEN PERSONAS PARA MOSTRAR
                </Typography>
              </Box>
            )}
            <AsignarProyectoPersona
              open={assignObject.open}
              personId={parseInt(assignObject.groupId)}
              personName={assignObject.personName}
              onClose={handleAsignacionClose}
              fechaInicio={String(assignObject.time)}
              addAsignacion={addAsignacion}
            />
            <InfoAsignacion
              open={infoAssignObject.open}
              projectName={infoAssignObject.projectName}
              personName={infoAssignObject.personName}
              asignacionId={parseInt(infoAssignObject.asignacionId)}
              onClose={handleInfoAsignacionClose}
              removeAsignacion={removeAsignacion}
              updateAsignacion={updateAsignacion}
            />
            <>
              <Modal
                open={openInfo}
                onClose={handleInfoClose}
                disableEnforceFocus
              >
                <Box className={classes.modalInfo}>
                  <IconButton
                    aria-label="Close"
                    onClick={handleInfoClose}
                    className={classes.closeButton}
                  >
                    <CloseIcon />
                  </IconButton>
                  <FetchInfoPersona id={idInfoPersona} />
                </Box>
              </Modal>
            </>
            {filteredData && (
              <Grid container style={{ marginLeft: 10 }}>
                <Grid
                  item
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: "#C14B3A",
                    border: "1px solid black",
                  }}
                ></Grid>
                <Grid item>
                  &nbsp;&nbsp;= Asignación a finalizar en menos de 10 días.
                </Grid>
              </Grid>
            )}
          </Fragment>
        )
      )}
    </>
  );
};

PersonTimeline.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default PersonTimeline;
