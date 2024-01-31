import "./Loader.css"

export default function Loader() {
  return (
    <>
    <div class="container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
<svg width="0" height="0" class="svg">
  <defs>
    <filter id="uib-jelly-ooze">
      <feGaussianBlur
        in="SourceGraphic"
        stdDeviation="3"
        result="blur"
      />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        result="ooze"
      />
      <feBlend in="SourceGraphic" in2="ooze" />
    </filter>
  </defs>
</svg>
</>

  )
}
