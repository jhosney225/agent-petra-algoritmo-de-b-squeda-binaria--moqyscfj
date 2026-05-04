```javascript
#!/usr/bin/env node

const readline = require('readline');

// ANSI color codes for terminal visualization
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

class BinarySearchVisualizer {
  constructor() {
    this.array = [];
    this.steps = [];
    this.found = false;
    this.foundIndex = -1;
  }

  // Core binary search algorithm with step tracking
  binarySearch(arr, target) {
    this.array = [...arr];
    this.steps = [];
    this.found = false;
    this.foundIndex = -1;

    let left = 0;
    let right = arr.length - 1;
    let stepCount = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      stepCount++;

      this.steps.push({
        step: stepCount,
        left,
        right,
        mid,
        midValue: arr[mid],
        target,
        action: '',
        comparison: ''
      });

      if (arr[mid] === target) {
        this.found = true;
        this.foundIndex = mid;
        this.steps[this.steps.length - 1].action = 'FOUND';
        this.steps[this.steps.length - 1].comparison = `arr[${mid}] === ${target}`;
        return mid;
      } else if (arr[mid] < target) {
        this.steps[this.steps.length - 1].action = 'SEARCH RIGHT HALF';
        this.steps[this.steps.length - 1].comparison = `arr[${mid}](${arr[mid]}) < ${target}`;
        left = mid + 1;
      } else {
        this.steps[this.steps.length - 1].action = 'SEARCH LEFT HALF';
        this.steps[this.steps.length - 1].comparison = `arr[${mid}](${arr[mid]}) > ${target}`;
        right = mid - 1;
      }
    }

    return -1;
  }

  // Visualize the array with highlighting
  visualizeArray(highlightIndices = []) {
    let visualization = '  Array: [';
    
    for (let i = 0; i < this.array.length; i++) {
      let element = this.array[i].toString().padStart(3, ' ');
      
      if (highlightIndices.includes(i)) {
        element = `${colors.bright}${colors.green}${element}${colors.reset}`;
      }
      
      visualization += element;
      if (i < this.array.length - 1) visualization += ', ';
    }
    
    visualization += ']';
    return visualization;
  }

  // Visualize a step with detailed information
  visualizeStep(stepData) {
    console.log(`\n${colors.cyan}${colors.bright}Step ${stepData.step}:${colors.reset}`);
    console.log(`  Range: [${stepData.left}...${stepData.right}] (length: ${stepData.right - stepData.left + 1})`);
    console.log(`  Mid Index: ${stepData.mid} ${colors.magenta}→ Value: ${stepData.midValue}${colors.reset}`);
    console.log(`  Comparison: ${colors.yellow}${stepData.comparison}${colors.reset}`);
    console.log(`  Action: ${colors.blue}${stepData.action}${colors.reset}`);
    
    const highlightIndices = [stepData.left, stepData.mid, stepData.right].filter(
      (val, idx, arr) => arr.indexOf(val) === idx
    );
    console.log(this.visualizeArray(highlightIndices));
  }

  // Display all steps
  visualizeAllSteps() {
    console.log(`\n${colors.bright}${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}║     BINARY SEARCH VISUALIZATION        ║${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}╚════════════════════════════════════════╝${colors.reset}`);
    
    console.log(this.visualizeArray());
    
    for (const step of this.steps) {
      this.visualizeStep(step);
    }

    console.log(`\n${colors.bright}${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    if (this.found) {
      console.log(`${colors.bright}${colors.green}║ ✓ FOUND at index ${this.foundIndex}${' '.repeat(18)}║${colors.reset}`);
    } else {
      console.log(`${colors.bright}${colors.red}║ ✗ NOT FOUND${' '.repeat(26)}║${colors.reset}`);
    }
    console.log(`${colors.bright}${colors.cyan}║ Total Steps: ${this.steps.length}${' '.repeat(23)}║${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}╚════════════════════════════════════════╝${colors.reset}`);
  }

  // Generate random sorted array
  generateArray(size = 20, maxValue = 100) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * maxValue));
    }
    return arr.sort((a, b) => a - b