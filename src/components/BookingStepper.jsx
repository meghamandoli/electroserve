const steps = ['Choose', 'Details', 'Technician', 'Confirm']

function BookingStepper({ activeStep }) {
  return (
    <aside className="stepper" aria-label="Booking progress">
      {steps.map((step, index) => (
        <div className={`step-item ${index + 1 === activeStep ? 'is-current' : ''}`} key={step}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </aside>
  )
}

export default BookingStepper
