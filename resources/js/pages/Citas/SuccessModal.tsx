import { FC } from 'react';

interface SuccessModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    // Función que redirige al Dashboard
    const handleClose = () => {
        onClose(); // Llama a onClose para cerrar el modal
        window.location.href = '/dashboard'; // Redirige al dashboard utilizando window.location
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
            <div className="w-full rounded-lg bg-white p-6 text-center shadow-xl sm:w-96">
                <h2 className="text-2xl font-semibold text-green-600">¡Cita Agendada con Éxito!</h2>
                <p className="mt-4 text-lg text-gray-700">Tu cita ha sido agendada correctamente.</p>
                <div className="mt-6">
                    <button
                        onClick={handleClose} // Llama a la nueva función handleClose
                        className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
