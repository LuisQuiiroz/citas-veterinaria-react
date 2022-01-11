import { useState, useEffect } from 'react'
import Error from './Error';

// [ variable, modificador ] = useState(valor inicial)


const Formulario = ({pacientes,  setPacientes, paciente, setPaciente }) => {
    
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    // useEffect e sun callback
    // se ejecuta cuando un state cambia o cuando el componenete está listo
    // en este caso, se ejecuta cuando paciente cambie
    useEffect( () => {
            if (Object.keys(paciente).length > 0) { // Evalua si el objeto está vacio
                // console.log('Si hay pacientes');
                setNombre(paciente.nombre);
                setPropietario(paciente.propietario);
                setEmail(paciente.email);
                setFecha(paciente.fecha);
                setSintomas(paciente.sintomas);
            } 
    }, [paciente]) // dependencias, valor que va a estar revisando, cuando cambia hace un re render

    // retorna un número random
    const generarId = () => {
        return Math.random().toString(22).substr(2);
    }

    // es llamada por el boton del fomulario 
    const handleSubmit = ( event ) => {
        // detiene el envio de datos
        event.preventDefault();

        // Validacion del Formulario
        if ( [ nombre, propietario, email, fecha, sintomas].includes('') ) {
            // console.log('Hay campos vacios');
            setError(true);
        } else {
            // console.log('Campos llenos');
            setError(false);

            // Objeto de paciente
            // asigna los datos del formulario en un objeto
            const objPaciente = {
                nombre,
                propietario,
                email,
                fecha,
                sintomas
            }
            // console.log(objPaciente);


            if (paciente.id) { // si existe paciente.id
                // Editando paciente
                objPaciente.id = paciente.id; // se establece a objPaciente
                // console.log(objPaciente);
                // console.log(paciente);

                const pacientesActualizados = pacientes.map( pacienteState => 
                    pacienteState.id === paciente.id ? objPaciente : pacienteState
                    // si pacienteState.id es igual paciente.id, retorna objPaciente, de lo contrario, lo deja como estaba
                )
                setPacientes(pacientesActualizados);
                setPaciente({});

            } else {
                // Nuevo paciente
                
                objPaciente.id = generarId();

                // se copia el arreglo y se añade el nuevo paciente, ya que el arreglo base no debe de modificarse, si no que hay que crear una copia modificada(actualizada con más pacientes)
                // se toma una copia
                // Ej: la primera vez que se ejecuta
                // setPacientes([...[], {objPaciente}]);
                // Ej: la segunda vez que se ejecuta
                // setPacientes([...[{objPaciente}], {objPaciente(nuevo)}]);
                // Ej: la tercera vez que se ejecuta
                // setPacientes([...[{objPaciente}, {objPaciente}], {objPaciente(nuevo)}]);
                setPacientes([...pacientes, objPaciente]); // devuelve un arreglo nuevo
                // objPaciente: contiene los datos del paciente(formluario)
                // pacientes tiene un arreglo de todos los nuevos pacientes
                // pacientes y objPaciente se juntan y se asignan a setPacientes
                // por lo que setPacientes toma el contenido de pacientes y el contenido de objPaciente y se lo establece a pacientes mediante setPacientes
            }


            // Reiniciar el form
            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');

        }
        
        // console.log('Enviando formulario...');
        
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-3">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y
                <span className="text-indigo-600 font-bold"> Administralos</span>
            </p>
            <form   onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" 
                    autoComplete="off"
            >
                { 
                    error && 
                    <Error>Todos los campos son obligatorios</Error>
                    
                }
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input 
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={ (event) => setNombre(event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input 
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={ (event) => setPropietario(event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        email
                    </label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={ (event) => setEmail(event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Fecha de alta
                    </label>
                    <input 
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={ (event) => setFecha(event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        sintomas
                    </label>
                    <textarea 
                        id='sintomas'
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder='Describa los síntomas'
                        value={sintomas}
                        onChange={ (event) => setSintomas(event.target.value) }>
                            
                        </textarea>
                </div>

                <input type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
                    value={ paciente.id ? "Editar paciente" : "Agregar paciente"} />
                
            </form>
        </div>
    )
}

export default Formulario
