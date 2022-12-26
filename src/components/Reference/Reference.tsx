import React, { useMemo, FC, useRef, useState } from "react";
import cs from "classnames";
import svg from "./refvec.svg";
import { Button } from "../Button";
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
        <div className={cs('reference-view', className)}>
          <img src={svg} alt="Reference" />
          <h3>Click on a reference to preview it</h3>
        </div>
      </div>
      <div className={cs("wrapper-canvas", className)}>
        <Canvas />
      </div>
      <div className={cs("referenceview-button", className)}>
        <Button size="large" type="primary">
          Jump to Content
        </Button>
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
      },
      onPinch: ({ event, offset: [d] }) => {
        event.stopImmediatePropagation();
        event.preventDefault();
        setCrop((crop) => ({ ...crop, scale: d }));
      },
      onWheel: ({ event }) => {
        const newScale = Math.min(
          5,
          Math.max(1, crop.scale - event.deltaY * 0.001),
        );
        setCrop((crop) => ({
          ...crop,
          scale: newScale,
        }));
        canv_bound = canvcon.current?.getBoundingClientRect();
        wrap_bound = canvcon.current?.parentElement?.getBoundingClientRect();

        if (canv_bound && wrap_bound) {
          setBounds((bounds) => ({
            ...bounds,
            w: (canv_bound?.width as number) - (wrap_bound?.width as number),
            h: (canv_bound?.height as number) - (wrap_bound?.height as number),
          }));
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
          right: bounds.w / 2,
          left: -bounds.w / 2,
          top: -bounds.h / 2,
          bottom: bounds.h / 2,
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
