import { useEffect } from 'react'
import React from 'react'
import Paciente from './Paciente'

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {

    // useEffect( () => {
    //     if (pacientes.length > 0) {
    //         console.log('Nuevo Paciente');
    //     }
    // }, [pacientes])

    return (
        <div className="md:w-1/2 lg:w-3/5 ">
            {pacientes.length !== 0 ? 
            <>
            <h2 className="font-black text-3xl text-center">Listado pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Administra tus
                <span className="text-indigo-600 font-bold"> Pacientes y Citas</span>
            </p>
            <div className="md:h-screen overflow-y-scroll">
            
            {pacientes.map( paciente => (
                <Paciente
                    key={paciente.id}                                                         
                    paciente={paciente}
                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}

                />                    
            )) }

            </div>
            
            </>
            : (
                <h2 className="font-black text-3xl text-center">No hay pacientes por mostrar</h2>

            )
            }
        </div>
    )
}

export default ListadoPacientes
