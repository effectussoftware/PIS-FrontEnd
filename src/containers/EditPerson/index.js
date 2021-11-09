/**
 * Edit person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";

EditPerson.propTypes = {
  personData: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
    technologies: propTypes.array,
    roles: propTypes.array,
  }).isRequired,
  id: propTypes.number,
  setNotify: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
  editRow: propTypes.func.isRequired,
};

export default function EditPerson({
  personData,
  id,
  setNotify,
  onClose,
  editRow,
}) {
  const [person, setPerson] = useState({
    first_name: personData.first_name,
    last_name: personData.last_name,
    email: personData.email,
    working_hours: personData.working_hours,
    technologies: personData.technologies || [],
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/people/${id}`, {
        person: {
          first_name: person.first_name,
          last_name: person.last_name,
          email: person.email,
          working_hours: person.working_hours,
          technologies: person.technologies,
        },
      })
      .then((response) => {
        let personInfo = response.data.person;
        let person = {
          id: personInfo.id,
          fullName: personInfo.full_name,
          firstName: personInfo.first_name,
          lastName: personInfo.last_name,
          email: personInfo.email,
          cargaHoraria: personInfo.working_hours,
          tag: ".",
          technologies: personInfo.technologies,
        };
        editRow(person);
        setNotify({
          isOpen: true,
          message: `La persona ${personInfo.full_name} se modifico con exito.`,
          type: "success",
          reload: false,
        });
        onClose();
      })
      .catch((error) => {
        setErrors(error.response.data?.errors);
      });
  };

  return (
    <PersonForm
      title={"Modificación de Persona"}
      onSubmit={handleSubmit}
      person={person}
      errors={errors}
      setErrors={setErrors}
      setPerson={setPerson}
    />
  );
}
