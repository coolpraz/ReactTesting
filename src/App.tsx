import { useState } from "react";
import "./App.css";
import kebabCaseToTitleCase from "./helper";

function App() {
    const [disabled, setDisabled] = useState(false);
    const [buttonColor, setButtonColor] = useState("medium-voilet-red");
    const nextColorClass = buttonColor === "medium-voilet-red" ? "midnight-blue" : "medium-voilet-red";
    const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass);
    const className = disabled ? "gray" : buttonColor;

    return (
        <div>
            <button
                className={className}
                onClick={() => setButtonColor(nextColorClass)}
                disabled={disabled}
            >
                Change to {nextColorTitleCase}
            </button>
            <br />
            <input
                type="checkbox"
                id="disable-button-checkbox"
                defaultChecked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
            />
            <label htmlFor="disable-button-checkbox">Disable button</label>
        </div>
    );
}

export default App;
