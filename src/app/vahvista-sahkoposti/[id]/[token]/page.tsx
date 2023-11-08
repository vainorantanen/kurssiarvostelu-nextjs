import ConfirmEmailButton from "@/components/ConfirmEmailButton"

export default function ConfirmEmail({params}: any) {

    const { id, token } = params

    return (
        <div className="h-screen text-center">
            <h1 className="my-2 text-xl">Vahvista sähköpostisi alla olevasta napista</h1>
            <ConfirmEmailButton userId={id} token={token} />
        </div>
    )
}