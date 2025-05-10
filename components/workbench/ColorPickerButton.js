"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Input } from "../ui/input";

const presetColors = [
  "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3",
  "#FF1493", "#FF69B4", "#FFC0CB", "#8B4513", "#A52A2A", "#D2691E", "#CD853F",
  "#F4A460", "#DEB887", "#FF8C00", "#FFD700", "#ADFF2F", "#7FFF00", "#00FF7F",
  "#00FFFF", "#00BFFF", "#1E90FF", "#0000CD", "#800080", "#4B0082", "#000000",
  "#808080", "#C0C0C0", "#FFFFFF"
];

function ColorPickerButton({ currentColor, onColorChange }) {
  const [color, setColor] = useState(currentColor || "#FFFFFF");
  const [isOpen, setIsOpen] = useState(false);

  // 当外部currentColor变化时更新内部状态
  useEffect(() => {
    if (currentColor) {
      setColor(currentColor);
    }
  }, [currentColor]);

  function handleColorChange(e) {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor);
  }

  function handleColorSelect(selectedColor) {
    setColor(selectedColor);
    onColorChange(selectedColor);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div 
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-dashed border-gray-400 hover:border-blue-500"
          style={{ 
            backgroundColor: color || "white"
          }}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded" style={{ backgroundColor: color }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: getContrastColor(color) }}>
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="mb-2">
          <div className="mb-2 text-sm font-medium">自定义颜色</div>
          <div className="flex items-center gap-2">
            <div 
              className="h-8 w-8 rounded border border-gray-200" 
              style={{ backgroundColor: color }}
            />
            <Input
              type="text"
              value={color}
              onChange={handleColorChange}
              className="h-8"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
        
        <div className="mb-1 mt-3 text-sm font-medium">预设颜色</div>
        <div className="grid grid-cols-8 gap-1">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              className="h-5 w-5 rounded-sm border border-gray-200 p-0"
              style={{ backgroundColor: presetColor }}
              onClick={() => handleColorSelect(presetColor)}
              aria-label={`选择颜色 ${presetColor}`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// 计算对比色，以确保图标在深色背景上显示白色，在浅色背景上显示黑色
function getContrastColor(hexColor) {
  // 如果没有颜色值，返回黑色
  if (!hexColor) return "#000000";
  
  // 移除#号
  const color = hexColor.replace("#", "");
  
  // 将十六进制颜色转换为RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // 计算亮度
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // 如果亮度大于0.5，返回黑色，否则返回白色
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default ColorPickerButton; 