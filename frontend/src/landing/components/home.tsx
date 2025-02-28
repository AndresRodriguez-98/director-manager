import { useState } from "react";
import Messi from "../../assets/messi.jpg";
import Ronaldo from "../../assets/cristiano.jpg";
import Neymar from "../../assets/neymar.jpg";
import Alvarez from "../../assets/julian.jpg";

const Home = () => {
    // Simulación de datos
    const [saldo, setSaldo] = useState(5000000);
    const [equipos, setEquipos] = useState([
        { nombre: "FC Barcelona", puntos: 10 },
        { nombre: "Real Madrid", puntos: 12 },
        { nombre: "Manchester City", puntos: 8 },
        { nombre: "Juventus", puntos: 9 },
        { nombre: "Bayern Munich", puntos: 11 },
    ]);

    const equipo = [
        {
            nombre: "Lionel Messi",
            precio: 1500000,
            pieHabil: "Izquierdo",
            estrellas: 5,
            imagen: Messi,
            goles: 10,
            asistencias: 7,
            partidos: 15,
        },
        {
            nombre: "Cristiano Ronaldo",
            precio: 1200000,
            pieHabil: "Derecho",
            estrellas: 5,
            imagen: Ronaldo,
            goles: 12,
            asistencias: 5,
            partidos: 14,
        },
        {
            nombre: "Neymar Jr.",
            precio: 900000,
            pieHabil: "Derecho",
            estrellas: 4,
            imagen: Neymar,
            goles: 8,
            asistencias: 10,
            partidos: 12,
        },
        {
            nombre: "Julián Álvarez",
            precio: 600000,
            pieHabil: "Derecho",
            estrellas: 3,
            imagen: Alvarez,
            goles: 5,
            asistencias: 3,
            partidos: 9,
        },
    ];
    const partidos = [
        { rival: "FC Barcelona", fecha: "02/03/2025" },
        { rival: "Real Madrid", fecha: "09/03/2025" },
        { rival: "Manchester City", fecha: "16/03/2025" },
    ];

    // Función para renderizar las estrellas
    const renderizarEstrellas = (cantidad: number) => "⭐".repeat(cantidad);

        // Simulación de un partido y actualización del ranking
        const simularPartido = () => {
            const nuevosEquipos = equipos.map((equipo) => {
                const resultado = Math.random(); // Generar resultado aleatorio
                if (resultado > 0.66) {
                    return { ...equipo, puntos: equipo.puntos + 3 }; // Victoria
                } else if (resultado > 0.33) {
                    return { ...equipo, puntos: equipo.puntos + 1 }; // Empate
                }
                return equipo; // Derrota, no suma puntos
            });
            // Ordenar por puntos
            nuevosEquipos.sort((a, b) => b.puntos - a.puntos);
            setEquipos(nuevosEquipos);
        };

    return (
        <div className="p-6">
            {/* Hero Section */}
            <div className="bg-green-900 text-white text-center p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">Bienvenido a TU EQUIPO</h1>
                <p className="text-lg mt-2">Arma tu equipo, gestiona tu dinero y compite contra otros técnicos</p>
                <button className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400">
                    Comprar Jugadores
                </button>
            </div>

            {/* Sección de Saldo */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">💰 Saldo Disponible</h2>
                <p className="text-2xl font-semibold text-green-600">${saldo.toLocaleString()}</p>
            </div>

            {/* Mi Equipo */}
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold">⚽ Mi Equipo</h2>
                <ul className="mt-2 space-y-4">
                    {equipo.map((jugador, index) => (
                        <li key={index} className="p-4 border rounded-lg flex items-center bg-gray-50">
                            {/* Imagen del jugador */}
                            <img
                                src={jugador.imagen}
                                alt={jugador.nombre}
                                className="w-16 h-16 rounded-full object-cover border border-gray-300 mr-4"
                            />
                            {/* Información del jugador */}
                            <div className="flex-1 text-left">
                                <p className="text-lg font-semibold">{jugador.nombre}</p>
                                <p className="text-gray-600">💲 {jugador.precio.toLocaleString()}</p>
                                <p className="text-gray-600">🦵 Pie Hábil: {jugador.pieHabil}</p>
                                <p className="text-gray-600">⚽ Goles: {jugador.goles} </p>
                                <p className="text-gray-600">🎯 Asistencias: {jugador.asistencias}</p>
                                <p className="text-gray-600">🎮 Partidos: {jugador.partidos} </p>
                            </div>
                            {/* Estrellas */}
                            <div className="text-yellow-500 text-lg">{renderizarEstrellas(jugador.estrellas)}</div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Ranking de Equipos */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">🏆 Ranking de Equipos</h2>
                <ul className="mt-2 space-y-2">
                    {equipos.map((equipo, index) => (
                        <li key={index} className="p-2 border rounded-lg">
                            {index + 1}. <strong>{equipo.nombre}</strong> - {equipo.puntos} pts
                        </li>
                    ))}
                </ul>
                <button
                    onClick={simularPartido}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400"
                >
                    🔄 Simular Partido
                </button>
            </div>

            {/* Próximos Partidos */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">📅 Próximos Partidos</h2>
                <ul className="mt-2 space-y-2">
                    {partidos.map((partido, index) => (
                        <li key={index} className="p-2 border rounded-lg">
                            Contra <strong>{partido.rival}</strong> - <span className="text-gray-500">{partido.fecha}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
