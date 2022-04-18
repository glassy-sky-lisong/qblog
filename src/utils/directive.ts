export interface TouchPanProp {
  evt: Event;
  touch: boolean;
  mouse: boolean;
  position: {
    top: number;
    left: number;
  };
  direction: 'up'| 'right' | 'down' | 'left';
  isFirst: boolean;
  isFinal: boolean;
  duration: number;
  distance: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
  delta: {
    x: number;
    y: number;
  };
}
