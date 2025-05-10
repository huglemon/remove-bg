"use client";

import { Slider } from "@/components/ui/slider";

function ZoomControl({ zoomLevel, onZoomChange, onResetZoom, onResetPosition, isPositionReset }) {
  return (
    <div className="mb-4 flex w-[420px] flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span>缩放: {Math.round(zoomLevel * 100)}%</span>
        <div className="flex items-center gap-2">
          <button
            className="text-xs text-blue-500"
            onClick={onResetZoom}
          >
            重置缩放
          </button>
          <span className="text-gray-300">|</span>
          <button
            className="text-xs text-blue-500"
            onClick={onResetPosition}
            disabled={isPositionReset}
          >
            重置位置
          </button>
        </div>
      </div>
      <Slider
        defaultValue={[1]}
        value={[zoomLevel]}
        min={0.5}
        max={2}
        step={0.05}
        onValueChange={onZoomChange}
      />
    </div>
  );
}

export default ZoomControl; 