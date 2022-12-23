import React, { useMemo, FC, useRef, useState } from "react";
import cs from "classnames";
import svg from "./refvec.svg";
import { ReferenceProps } from "./Reference.types";
import { useGesture } from "@use-gesture/react";

const Reference: FC<ReferenceProps> = ({
  domID = "reference",
  dataTestId = "test-reference",
  className,
}): JSX.Element => {
  const domIDs = useMemo(
    () => ({
      root: domID,
    }),
    [domID],
  );

  const dataTestIDs = useMemo(
    () => ({
      root: dataTestId,
    }),
    [dataTestId],
  );

  return (
    <div
      id={domIDs.root}
      className={cs("sa-reference", className)}
      data-testid={dataTestIDs.root}
    >
      <h1>Reference Details</h1>

      <div className={cs("reference-view-wrapper", className)}>
        <div className={cs("reference-view", className)}>
          <img src={svg} alt="Reference" />
          <h3>Click on a reference to preview it</h3>
        </div>
      </div>
      <div className={cs("wrapper-canvas", className)}>
        <Canvas />
      </div>
    </div>
  );
};

function Canvas() {
  const canvcon = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
  let canv_bound = canvcon.current?.parentElement?.getBoundingClientRect();
  let wrap_bound = canvcon.current?.parentElement?.getBoundingClientRect();
  const [bounds, setBounds] = useState({ w: 0, h: 0 });
  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        setCrop((crop) => ({ ...crop, x: dx, y: dy }));
        //canv_bound = canvcon.current?.parentElement?.getBoundingClientRect();
        //wrap_bound = canvcon.current?.parentElement?.getBoundingClientRect();
      },
      onPinch: ({ event, offset: [d] }) => {
        event.stopImmediatePropagation();
        event.preventDefault();
        setCrop((crop) => ({ ...crop, scale: d }));
        //canv_bound = canvcon.current?.parentElement?.getBoundingClientRect();
        //  wrap_bound = canvcon.current?.parentElement?.getBoundingClientRect();
      },
      onWheel: ({ event }) => {
        if (crop.scale >= 1 && crop.scale <= 5)
          setCrop((crop) => ({
            ...crop,
            scale: crop.scale + event.deltaY * 0.0001,
          }));
        if (crop.scale > 5) crop.scale = 5;
        if (crop.scale < 1) crop.scale = 1;

        canv_bound = canvcon.current?.getBoundingClientRect();
        wrap_bound = canvcon.current?.parentElement?.getBoundingClientRect();

        if (canv_bound && wrap_bound) {
          setBounds((bounds) => ({
            ...bounds,
            w: (canv_bound?.width as number) - (wrap_bound?.width as number),
            h: (canv_bound?.height as number) - (wrap_bound?.height as number),
          }));
          console.log(bounds);
        }
      },
    },
    {
      target: canvcon,
      eventOptions: { passive: false },
      pinch: {
        scaleBounds: { min: 1, max: 5 },
      },
      drag: {
        bounds: {
          right: (bounds.w * 2) / crop.scale,
          left: (-bounds.w * 2) / crop.scale,
          top: (-bounds.h * 2) / crop.scale,
          bottom: (bounds.h * 2) / crop.scale,
        },
      },
    },
  );

  return (
    <canvas
      ref={canvcon}
      className="referenceview-canvas"
      style={{
        left: crop.x,
        top: crop.y,
        transform: `scale(${crop.scale})`,
      }}
    ></canvas>
  );
}

export default Reference;
