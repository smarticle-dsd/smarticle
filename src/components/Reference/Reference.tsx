import React, { useMemo, FC, useRef, useState } from "react";
import cs from "classnames";
import svg from "./refvec.svg";
import { Button } from "../Button";
import { ReferenceProps } from "./Reference.types";
import { useSpring, animated } from "@react-spring/web";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";

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
      <div className={cs("referenceview-buttons", className)}>
        <div className={cs("reference-content-button", className)}>
          <Button size="large" type="primary">
            Jump to Content
          </Button>
        </div>
        <div className={cs("reference-back-button", className)}>
          <Button size="large" type="primary">
            Jump back
          </Button>
        </div>
      </div>
    </div>
  );
};

const useGesture = createUseGesture([dragAction, pinchAction]);
function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [bounds, setBounds] = useState({ w: 0, h: 0 });
  let canv_bound = ref.current?.getBoundingClientRect();
  let wrap_bound = ref.current?.parentElement?.getBoundingClientRect();
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
      onPinch: ({
        event,
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
      }) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        canv_bound = ref.current?.getBoundingClientRect();
        wrap_bound = ref.current?.parentElement?.getBoundingClientRect();
        if (canv_bound && wrap_bound) {
          setBounds((bounds) => ({
            ...bounds,
            w: (canv_bound?.width as number) - (wrap_bound?.width as number),
            h: (canv_bound?.height as number) - (wrap_bound?.height as number),
          }));
        }
        if (first && ref.current) {
          const { width, height, x, y } = ref.current.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }
        const x = memo[0] - (ms - 1) * memo[2];
        const y = memo[1] - (ms - 1) * memo[3];
        api.start({ scale: s, x: x, y: y });
        return memo;
      },
    },
    {
      target: ref,

      drag: {
        from: () => [style.x.get(), style.y.get()],
        bounds: {
          right: bounds.w / 1.8,
          left: -bounds.w / 1.8,
          top: -bounds.h / 1.8,
          bottom: bounds.h / 1.8,
        },
      },
      pinch: {
        scaleBounds: { min: 1, max: 5 },
        pinchOnWheel: true,
        modifierKey: null,
      },
    },
  );

  return (
    <animated.canvas
      className={"referenceview-canvas"}
      ref={ref}
      style={style}
    ></animated.canvas>
  );
}

export default Reference;
