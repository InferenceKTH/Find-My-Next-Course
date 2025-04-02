import { configure, observable } from "mobx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { connectToFirebase } from "../firebase";
import { model } from "./model"
import { HomeRoot } from "./pages/HomeRoot";
import { JsonToDatabase } from "./presenters/Tests/JsonToDatabase"

configure({ enforceActions: "never" });
const reactiveModel = observable(model);
connectToFirebase(reactiveModel);

export function makeRouter(reactiveModel) {
    return createHashRouter([
        {
            path: "/",
            element: <HomeRoot model={reactiveModel} />,
        },
        {
            path: "/button",
            element: <JsonToDatabase model={reactiveModel} />,
        },
    ]);
}

createRoot(document.getElementById("root")).render(
    <RouterProvider router={makeRouter(reactiveModel)} />
);

window.myModel = reactiveModel;