let exampleVariable

// Function to calculate the square of a number using the backend API
function calculateSquare(number) {
  // Send data to the Python server and get the response
  fetch('/api/main', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: number })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      console.log(`The square of ${number} is:`, data.square)
      console.log(`The value associated with data.key is: `, data.key)
      exampleVariable = data
    })
    .catch((error) => console.error('Error:', error))
}

function getExampleVariable() {
  return exampleVariable
}

export { calculateSquare, getExampleVariable }
