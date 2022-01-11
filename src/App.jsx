import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  const [pacientes, setPacientes] = useState([]) // Arreglo de todos los pacientes
  const [paciente, setPaciente] = useState({}) // objeto de un paciente

  useEffect( () => {
    const getLocalStorage = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) || [];

      setPacientes(pacientesLS);
    }
    getLocalStorage();
  }, []); // se ejecuta una sola vez


  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes]);

  const eliminarPaciente = ( id ) => {
    // console.log('Eliminando paciente', id);
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header
      />

      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}

        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
