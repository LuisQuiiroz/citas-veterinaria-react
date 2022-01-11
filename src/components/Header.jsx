// Un componente es una función 
// Todos los componentes de jsx requieren un return
// El nombre de los componentes deen de empezar con una mayuscula
// Siempre se debe de retornar algo, si no marca un error
function Header(  ) {
    

    return (
        <>
        <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
            Seguimiento pacientes 
            <span className="text-indigo-600"> Veterinaria</span>
        </h1>
        </>
    )
}

export default Header;