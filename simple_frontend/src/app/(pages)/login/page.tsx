import Form from "@/app/components/Form";

const Login = () => {
    return (
        <div className="flex flex-col mx-auto my-auto w-1/2 h-3/5">
            <h2 className="text-5xl mb-5 text-center">Login</h2>
            <Form route="/api/token/" method="login"/>
        </div>
    )
}

export default Login;