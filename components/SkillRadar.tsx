
import React from 'react';
import { Skill } from '../types';

interface SkillRadarProps {
  skills: Skill[];
  size?: number;
}

export const SkillRadar: React.FC<SkillRadarProps> = ({ skills, size = 300 }) => {
  const center = size / 2;
  const radius = (size / 2) * 0.7;
  const angleStep = (Math.PI * 2) / skills.length;

  const points = skills.map((skill, i) => {
    const r = (skill.value / 100) * radius;
    const x = center + r * Math.sin(i * angleStep);
    const y = center - r * Math.cos(i * angleStep);
    return `${x},${y}`;
  }).join(' ');

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center group/radar">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Grids */}
        {gridLevels.map((lvl, i) => (
          <polygon
            key={i}
            points={skills.map((_, idx) => {
              const x = center + (radius * lvl) * Math.sin(idx * angleStep);
              const y = center - (radius * lvl) * Math.cos(idx * angleStep);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            className="group-hover/radar:stroke-white/10 transition-colors"
          />
        ))}

        {/* Axis */}
        {skills.map((_, i) => {
          const x = center + radius * Math.sin(i * angleStep);
          const y = center - radius * Math.cos(i * angleStep);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              className="group-hover/radar:stroke-white/10 transition-colors"
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const x = center + (radius + 25) * Math.sin(i * angleStep);
          const y = center - (radius + 25) * Math.cos(i * angleStep);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill="rgba(255,255,255,0.3)"
              fontSize="9"
              fontWeight="600"
              textAnchor="middle"
              alignmentBaseline="middle"
              className="uppercase tracking-widest font-mono transition-all duration-300 group-hover/radar:fill-white"
            >
              {skill.name}
            </text>
          );
        })}

        {/* Skill Area */}
        <polygon
          points={points}
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          className="radar-path group-hover/radar:stroke-white group-hover/radar:fill-white/20 transition-all duration-700"
        />

        {/* Data Points */}
        {skills.map((skill, i) => {
          const r = (skill.value / 100) * radius;
          const x = center + r * Math.sin(i * angleStep);
          const y = center - r * Math.cos(i * angleStep);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="white"
              className="group-hover/radar:r-3 transition-all"
            />
          );
        })}
      </svg>
    </div>
  );
};
