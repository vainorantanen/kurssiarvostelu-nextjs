export default function ConfirmEmail() {

    return (
        <div className="h-screen text-center">
            <h1 className="text-2xl font-bold my-3">Kiitos rekisteröitymisestä!</h1>
            <p className="text-2xl my-2">Lähetimme sinulle vahvistussähköpostin. Vahvistathan vielä sähköpostisi.</p>
            <p>Etkö saanut vahvistussähköpostia?</p>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                Lähetä uusi vahvistus
            </button>
        </div>
    )
}