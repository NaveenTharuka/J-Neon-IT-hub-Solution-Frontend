import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function OAuthSuccess() {
    console.log("OAuthSuccess page reached")

    const navigate = useNavigate()

    useEffect(() => {
        console.log("Setting login state")
        localStorage.setItem("user", "loggedIn")
        navigate("/admin/portfolio", { replace: true })
    }, [])

    return <p>Logging you in...</p>
}
