import React, { useState } from "react";
import { connect } from "react-redux";
import { setRepeat } from "../../redux/events/eventActions";
import Paper from "@material-ui/core/Paper";

const Repeat = ({ events, comp_id, set_repeat }) => {
  const [repeatCount, setRepeatCount] = useState(1); // Initial repeat count set to 1

  // Handle changes in repeat count
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10); // Convert input value to an integer
    setRepeatCount(value);

    // Update the repeat count in the Redux state
    const updatedEvents = { ...events.repeat, [comp_id]: value };
    set_repeat(updatedEvents);
  };

  // Render the component multiple times based on repeatCount
  const renderRepeatedComponent = () => {
    return Array.from({ length: repeatCount }).map((_, index) => (
      <div key={index} className="text-center bg-blue-600 text-white px-2 py-1 my-2 text-sm">
        Repeated {index + 1}
      </div>
    ));
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Repeat</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={repeatCount}
            onChange={handleChange}
            min={1} // Ensure repeat count is at least 1
          />
        </div>
        <div id={comp_id} className="my-2">
          {renderRepeatedComponent()}
        </div>
      </div>
    </Paper>
  );
};

// Map Redux state to component props
const mapStateToProps = (state) => ({
  events: state.event,
});

// Map dispatch actions to component props
const mapDispatchToProps = (dispatch) => ({
  set_repeat: (value) => dispatch(setRepeat(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repeat);