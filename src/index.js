// src/index.js
import './style.css'

import { calculateSquare, getExampleVariable } from './pythonDataToJS'

calculateSquare(354)
console.log(
  `We can change exampleVariable in the function and return it here:`,
  getExampleVariable()
)
