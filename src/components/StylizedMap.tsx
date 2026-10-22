import { motion } from 'framer-motion';

export function StylizedMap() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Grid lines */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="800" height="400" fill="url(#grid)" className="text-earth-500" />

      {/* Simplified continent outlines */}
      {/* North America */}
      <motion.path
        d="M 120 80 L 180 60 L 220 80 L 240 120 L 220 160 L 200 200 L 160 220 L 130 200 L 100 160 L 90 120 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      
      {/* South America */}
      <motion.path
        d="M 180 240 L 200 230 L 220 250 L 230 290 L 220 340 L 200 370 L 180 350 L 170 300 L 160 260 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
      />

      {/* Europe */}
      <motion.path
        d="M 380 70 L 420 60 L 450 70 L 460 90 L 440 110 L 420 120 L 390 110 L 370 90 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* Africa */}
      <motion.path
        d="M 400 140 L 430 130 L 460 150 L 470 200 L 460 260 L 440 300 L 420 280 L 400 240 L 390 180 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.7, ease: 'easeInOut' }}
      />

      {/* Asia */}
      <motion.path
        d="M 480 60 L 550 50 L 620 70 L 660 100 L 640 140 L 600 160 L 540 150 L 500 120 L 480 90 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.9, ease: 'easeInOut' }}
      />

      {/* Australia */}
      <motion.path
        d="M 600 260 L 650 250 L 690 270 L 700 300 L 680 320 L 640 330 L 610 310 L 590 280 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.1, ease: 'easeInOut' }}
      />

      {/* Destination dots */}
      {[
        { cx: 620, cy: 100, label: 'Kyoto' },
        { cx: 420, cy: 160, label: 'Marrakech' },
        { cx: 190, cy: 310, label: 'Patagonia' },
        { cx: 430, cy: 95, label: 'Santorini' },
        { cx: 580, cy: 140, label: 'Bali' },
        { cx: 400, cy: 65, label: 'Iceland' },
        { cx: 660, cy: 290, label: 'Queenstown' },
        { cx: 390, cy: 85, label: 'Lisbon' },
        { cx: 170, cy: 190, label: 'Costa Rica' },
      ].map((point, i) => (
        <motion.g key={point.label}>
          <motion.circle
            cx={point.cx}
            cy={point.cy}
            r="4"
            fill="currentColor"
            className="text-sunset-400"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.1, type: 'spring', stiffness: 300 }}
          />
          <motion.circle
            cx={point.cx}
            cy={point.cy}
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-sunset-400"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: 1.7 + i * 0.1 }}
          />
        </motion.g>
      ))}

      {/* Compass rose */}
      <motion.g
        className="origin-center"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 0.6, rotate: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <g transform="translate(720, 60)">
          <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-earth-400" />
          <line x1="0" y1="-18" x2="0" y2="18" stroke="currentColor" strokeWidth="0.8" className="text-earth-400" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke="currentColor" strokeWidth="0.8" className="text-earth-400" />
          <polygon points="0,-16 3,-4 -3,-4" fill="currentColor" className="text-sunset-400" />
          <text x="0" y="-22" textAnchor="middle" fontSize="6" className="fill-earth-400">N</text>
        </g>
      </motion.g>

      {/* Dotted route lines */}
      <motion.path
        d="M 400 85 Q 420 120 430 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
        className="text-sunset-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      />
      <motion.path
        d="M 620 100 Q 600 120 580 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
        className="text-sunset-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      />
    </svg>
  );
}
