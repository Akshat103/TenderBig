import PropTypes from 'prop-types';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./styles/styles.css";

export const MultiStepProgressBar = (props) => {
    return (
        <ProgressBar
            percent={((props.step - 1) * 100) / 2}
            filledBackground="indigo"
        >
            <Step transition="scale">
                {({ accomplished, index }) => (
                    <div
                        className={`step ${accomplished ? "completed" : null}`}
                    >
                        0
                    </div>
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished, index }) => (
                    <div
                        className={`step ${accomplished ? "completed" : null}`}
                    >
                        50
                    </div>
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished, index }) => (
                    <div
                        className={`step ${accomplished ? "completed" : null}`}
                    >
                        100
                    </div>
                )}
            </Step>
        </ProgressBar>
    )
};

MultiStepProgressBar.propTypes = {
    step: PropTypes.number.isRequired
};
