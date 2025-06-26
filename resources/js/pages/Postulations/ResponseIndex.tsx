import { Inertia } from '@inertiajs/inertia';

const ResponsePostulationsIndex = ({ pending, accepted, rejected }) => {
    const handleAccept = (postulationId) => {
        Inertia.post(`/response-postulations/${postulationId}/accept`);
    };

    const handleReject = (postulationId) => {
        Inertia.post(`/response-postulations/${postulationId}/reject`);
    };

    return (
        <div>
            <h1>Gestión de Postulaciones</h1>

            <div>
                <h2>Postulaciones Pendientes</h2>
                {pending.map((postulation) => (
                    <div key={postulation.id}>
                        <h3>
                            {postulation.user.name} se postuló para el evento {postulation.event.name}
                        </h3>
                        <button onClick={() => handleAccept(postulation.id)}>Aceptar</button>
                        <button onClick={() => handleReject(postulation.id)}>Rechazar</button>
                    </div>
                ))}
            </div>

            <div>
                <h2>Postulaciones Aceptadas</h2>
                {accepted.map((postulation) => (
                    <div key={postulation.id}>
                        <h3>
                            {postulation.user.name} ha sido aceptado para el evento {postulation.event.name}
                        </h3>
                    </div>
                ))}
            </div>

            <div>
                <h2>Postulaciones Rechazadas</h2>
                {rejected.map((postulation) => (
                    <div key={postulation.id}>
                        <h3>
                            {postulation.user.name} ha sido rechazado para el evento {postulation.event.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResponsePostulationsIndex;
