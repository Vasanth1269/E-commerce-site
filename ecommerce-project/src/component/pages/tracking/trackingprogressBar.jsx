import dayjs from "dayjs";
import { Fragment } from "react";

export function Trackingprogress({ orderDate, deliverydate }) {
  const now = new Date().getTime();

  const progressPercentage = (() => {
    const total = deliverydate - orderDate;
    const elapsed = now - orderDate;
    const percent = (elapsed / total) * 100;
    return Math.min(Math.max(Math.floor(percent), 0), 100); // Clamp 0–100 and round it
  })();

  return (
    <Fragment>
      <div
        className="progress-labels-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div className="progress-label">Preparing</div>
        <div
          className="progress-label current-status"
          style={{ color: progressPercentage >= 50 ? "green" : "black" }}
        >
          Shipped
        </div>
        <div
          className="progress-label"
          style={{ color: progressPercentage >= 100 ? "green" : "black" }}
        >
          Delivered
        </div>
      </div>

      <div
        className="progress-bar-container"
        style={{

          backgroundColor: "rgba(244, 244, 244, 1)",
          borderRadius: "50px",
          height: "20px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          className="progress-bar"
          style={{
            height: "100%",
            backgroundColor: "rgb(25, 135, 84)",
            borderRadius: "50px",
            width: `${progressPercentage}%`,
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>
    </Fragment>
  );
}
