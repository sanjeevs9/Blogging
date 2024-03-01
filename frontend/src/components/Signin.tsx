import Quote from "./Quote"
import Auth from "./Auth"

export default function Signin() {
    return (
        <>
            <div className="grid md:grid-cols-2">
                <div>
                    <Auth type="signin" />
                </div>
                <div className="hidden md:block">
                    <Quote />
                </div>

            </div>

        </>
    )

}

