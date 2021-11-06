import React from "react";
import propTypes from "prop-types";
import Listado from "../../components/Listado";
import Acciones from "./acciones";

Proyecto.propTypes = {
  rows: propTypes.array,
  setRows: propTypes.func,
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    hide: true,
  },
  {
    field: "name",
    headerName: "Nombre",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "organization",
    headerName: "Organización",
    sortable: true,
    flex: 0.6,
  },
  {
    field: "project_type",
    headerName: "Tipo",
    flex: 0.7,
  },
  {
    field: "project_state",
    headerName: "Estado",
    sortable: true,
    flex: 0.5,
  },
  {
    field: "start_date",
    headerName: "Fecha Inicio",
    flex: 0.6,
    type: "date",
  },
  {
    field: "end_date",
    headerName: "Fecha Fin",
    flex: 0.6,
    type: "date",
  },
  {
    field: "technologies",
    headerName: "tecnologías",
    hide: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 1.5,
    renderCell: (params) => {
      return (
        <div>
          <Acciones projectRow={params.row} />
        </div>
      );
    },
  },
];

export default function Proyecto({ rows, setRows }) {
  const [setRemoveRow, setEditRow] = React.useContext(UpdateGridContext);
  const [openNew, setOpenNew] = React.useState(false);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [sortModel, setSortModel] = React.useState([
    {
      field: "name",
      sort: "asc",
    },
  ]);

  const handleNewOpen = () => setOpenNew(true);
  const handleNewClose = () => setOpenNew(false);

  const addRow = (newRow) => setRows([...rows, newRow]);

  const removeRow = (projectId) =>
    setRows(rows.filter((row) => row.id != projectId));
  setRemoveRow.current = (projectId) => removeRow(projectId);

  const editRow = (projectData) =>
    setRows(
      rows.map((row) =>
        row.id == projectData.id
          ? {
              ...row,
              name: projectData.name,
              project_type: projectData.project_type,
              project_state: projectData.project_state,
              description: projectData.description,
              budget: projectData.budget,
              start_date: projectData.start_date,
              end_date: projectData.end_date,
              organization: projectData.organization,
              technologies: projectData.technologies,
            }
          : row
      )
    );
  setEditRow.current = (projectData) => editRow(projectData);

  return (
    <Listado
      button={"Agregar Proyecto"}
      buttonClick={handleNewOpen}
      modalOpen={openNew}
      modalOnClose={handleNewClose}
      sortModel={sortModel}
      setSortModel={setSortModel}
      notify={notify}
      setNotify={setNotify}
      columns={columns}
      rows={rows}
    />
  );
}
