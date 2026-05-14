import svgPaths from '../assets/topographic-paths'

const KEYS = [
  'p102f7200',
  'p27d9ee00',
  'p2d052000',
  'p21598a80',
  'p2f5d1300',
  'p1fc22a80',
  'p1c85a580',
  'p17ca7980',
  'p2b1b4400',
  'p38c34280',
  'p2c842180',
  'p3f494df0',
  'p172bea00',
  'p2708c00',
  'p1afbad00',
  'p17921700',
  'p384c7180',
  'p3601f300',
  'p2ca70b00',
  'p22f9c600',
  'p10cf6e80',
  'p13f33300',
]

export default function Topographic() {
  return (
    <div className="relative size-full" aria-hidden="true">
      <svg
        className="absolute inset-0 block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 4687 5740.95"
      >
        <g clipPath="url(#clip0_2_55)">
          {KEYS.map((k, i) => (
            <path
              key={k}
              d={svgPaths[k]}
              stroke="var(--stroke-0, #4A3AFF)"
              strokeMiterlimit="10"
              strokeWidth="5"
            />
          ))}
        </g>
        <defs>
          <clipPath id="clip0_2_55">
            <rect fill="white" height="5740.95" width="4687" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
