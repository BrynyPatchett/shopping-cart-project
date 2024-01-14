import { useRouteError } from "react-router-dom";



function RouteError() {
    const error = useRouteError();
    return (
        <> <div id="error-page">
            <h1>Oops!</h1>
            { (error &&
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
           ) || <p>Sorry, an unexpected error has occurred.</p> }
        </div>

        </>
    )
}

export default RouteError;