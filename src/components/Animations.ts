import Animated from "react-native-reanimated";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare let _WORKLET: boolean;

const IN_STYLE_UPDATER = false;

type Animation<
  State extends AnimationState = AnimationState,
  PrevState = State
> = {
  animation: (animation: State, now: number) => boolean;
  current: number;
  start: (
    animation: State,
    value: number,
    now: number,
    lastAnimation: PrevState
  ) => void;
} & State;

interface DecayAnimation extends AnimationState {
  lastTimestamp: number;
  velocity: number;
}

interface WithBouncingDecayParams {
  velocity: number;
  deceleration?: number;
  clamp: [number, number];
}

interface PausableAnimation extends AnimationState {
  lastTimestamp: number;
  elapsed: number;
}

interface PhysicAnimationState extends AnimationState {
  velocity: number;
}

type BouncingAnimation = Animation<PhysicAnimationState>;

interface AnimationState {
  current: number;
}

const defineAnimation = <
  S extends AnimationState = AnimationState,
  Prev extends AnimationState = AnimationState,
>(
  factory: () => Omit<Animation<S, Prev>, keyof S>
) => {
  "worklet";

  if (_WORKLET) {
    return (factory() as unknown) as number;
  }

  return factory as unknown as number;
};

interface DecayAnimationState extends PhysicAnimationState {
  lastTime: number;
}

const deceleration = 0.997;
const velocity_eps = 5;
export const withDecay = (initialVelocity: number) => {
  "worklet";

  return defineAnimation<DecayAnimationState>(() => {
    "worklet";
    const animation = (state: DecayAnimationState, now: number) => {
      const { lastTime, current, velocity } = state;
      const deltaTime = now - lastTime;
      const v0 = velocity / 1000;
      const kv = Math.pow(deceleration, deltaTime);
      const v = v0 * kv * 1000;
      const x = current + (v0 * (deceleration * (1 - kv))) / (1 - deceleration);

      state.velocity = v;
      state.current = x;
      state.lastTime = now;

      if (v < velocity_eps) {
        return true;
      }

      return false;
    };

    const start = (state: DecayAnimationState, current: number, now: number) => {
      state.current = current;
      state.lastTime = now;
      state.velocity = initialVelocity;
    };

    return {
      animation,
      start,
    }
  });
};

export const withBounce = (animationParam: AnimationPa) => {};
